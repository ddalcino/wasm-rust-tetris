#[macro_use]
mod utils;
mod tetris;

use wasm_bindgen::prelude::*;
use wasm_bindgen::{JsCast, JsValue};
use std::f64;
use std::cmp::{min, max};


// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

pub struct Color {
    string_repr: String,
}

impl Color {
    pub fn from_rgb(r: u8, g: u8, b: u8) -> Color {
        Color {
            string_repr: format!("#{:02x}{:02x}{:02x}", r, g, b)
        }
    }

    // html
    pub fn to_jsvalue(&self) -> JsValue {
        JsValue::from_str(self.string_repr.as_ref())
    }
}

struct ColorFamily {
    normal: Color,
    bright: Color,
    dark: Color,
    highlight: Color,
    shadow: Color,
}

enum ColorType {
    Normal,
    Bright,
    Dark,
    Highlight,
    Shadow,
}

impl ColorFamily {
    pub fn from_rgb(r: u8, g: u8, b: u8) -> ColorFamily {
        let constrain_u8 = |val: i32| -> u8 {
            min(max(val, 0i32) as u32, 255u32) as u8
        };

        #[allow(unused_macros)]
        macro_rules! adder {
            ($to_add:expr) => {
                |val: u8| -> u8 { constrain_u8(val as i32 + $to_add) }
            }
        }
        #[allow(unused_macros)]
        macro_rules! multiplier {
            ($to_mul:expr) => {
                |val: u8| -> u8 { constrain_u8(val as i32 * $to_mul) }
            }
        }
        let bright = adder!(25);
        let highlight = adder!(50);
        let dark = adder!(-25);
        let shadow = adder!(-50);
        ColorFamily {
            normal: Color::from_rgb(r, g, b),
            bright: Color::from_rgb(bright(r), bright(g), bright(b)),
            dark: Color::from_rgb(dark(r), dark(g), dark(b)),
            highlight: Color::from_rgb(highlight(r), highlight(g), highlight(b)),
            shadow: Color::from_rgb(shadow(r), shadow(g), shadow(b)),
        }
    }
    pub fn get(&self, color_type: ColorType) -> &Color {
        match color_type {
            ColorType::Normal => &self.normal,
            ColorType::Bright => &self.bright,
            ColorType::Dark => &self.dark,
            ColorType::Highlight => &self.highlight,
            ColorType::Shadow => &self.shadow,
        }
    }
}


pub struct View {
    canvas: web_sys::HtmlCanvasElement,
    ctx: web_sys::CanvasRenderingContext2d,
    tile_size: u32,
    score_field: web_sys::Element,
    colors: Vec<ColorFamily>,
}

impl View {
    pub fn new() -> View {
        let document = document();
        let canvas = document.get_element_by_id("game_board").unwrap();
        let canvas: web_sys::HtmlCanvasElement = canvas
            .dyn_into::<web_sys::HtmlCanvasElement>()
            .map_err(|_| ())
            .unwrap();

        let ctx = canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<web_sys::CanvasRenderingContext2d>()
            .unwrap();

        let score_field = document.get_element_by_id("score").unwrap();

        View {
            canvas,
            ctx,
            tile_size: 20,
            score_field,
            colors: vec!(
                ColorFamily::from_rgb(64, 64, 64), // bkg
                ColorFamily::from_rgb(192, 40, 20),
                ColorFamily::from_rgb(192, 128, 20),
                ColorFamily::from_rgb(64, 192, 64),
                ColorFamily::from_rgb(64, 92, 192),
                ColorFamily::from_rgb(198, 192, 40),
                ColorFamily::from_rgb(0, 192, 192),
                ColorFamily::from_rgb(192, 0, 192),
                ColorFamily::from_rgb(0, 0, 0),   // black border
            ),
        }
    }

    fn background(&self) -> &Color { &self.colors[0].get(ColorType::Normal) }
    fn border(&self) -> &Color { &self.colors[8].get(ColorType::Normal) }

    fn set_score(&mut self, score: u32) {
        self.score_field.set_text_content(Some(&format!("{}", score)));
    }

    fn draw_shaded_tile(&self, x: u32, y: u32, highlight: &Color, shadow: &Color, fill: &Color) {
        let top = (y * self.tile_size) as f64;
        let bottom = top + self.tile_size as f64;
        let left = (x * self.tile_size) as f64;
        let right = left + self.tile_size as f64;
        let offset = self.tile_size as f64 / 6.0;
        let fill_size = self.tile_size as f64 * 4.0 / 6.0;

        self.ctx.begin_path();
        self.ctx.set_fill_style(&highlight.to_jsvalue());
        self.ctx.fill_rect(
            (x * self.tile_size) as f64,
            (y * self.tile_size) as f64,
            self.tile_size as f64,
            self.tile_size as f64,
        );

        self.ctx.begin_path();
        self.ctx.set_fill_style(&shadow.to_jsvalue());
        self.ctx.move_to(left, top);
        self.ctx.line_to(left, bottom);
        self.ctx.line_to(right, bottom);
        self.ctx.fill();

        self.ctx.begin_path();
        self.ctx.set_fill_style(&fill.to_jsvalue());
        self.ctx.fill_rect(
            (x * self.tile_size) as f64 + offset,
            (y * self.tile_size) as f64 + offset,
            fill_size,
            fill_size,
        );
    }

    fn draw_bright_tile(&self, x: u32, y: u32, color: &ColorFamily) {
        let highlight = color.get(ColorType::Highlight);
        let shadow = color.get(ColorType::Normal);
        let fill = color.get(ColorType::Bright);
        self.draw_shaded_tile(x, y, highlight, shadow, fill);
    }
    fn draw_dark_tile(&self, x: u32, y: u32, color: &ColorFamily) {
        let highlight = color.get(ColorType::Normal);
        let shadow = color.get(ColorType::Shadow);
        let fill = color.get(ColorType::Dark);
        self.draw_shaded_tile(x, y, highlight, shadow, fill);
    }

    fn clear(&self) {
        self.ctx.set_fill_style(&self.background().to_jsvalue());
        self.ctx.fill_rect(
            0 as f64,
            0 as f64,
            self.canvas.width() as f64,
            self.canvas.height() as f64,
        );
    }

    pub fn resize(&mut self, rows: u32, cols: u32) {
        let v_button_margin = 110u32;
        let h_button_margin = 80u32;
        let width = window().inner_width().unwrap().as_f64().unwrap();
        let width = width as u32 - h_button_margin;
        let height = window().inner_height().unwrap().as_f64().unwrap();
        let height = height as u32 - v_button_margin;

        let h_scale = width / (cols + 2);
        let v_scale = height / (rows + 1);
        self.tile_size = min(h_scale, v_scale);
        self.canvas.set_height((rows + 1) * self.tile_size);
        self.canvas.set_width((cols + 2) * self.tile_size);
    }

    pub fn draw(&self, board: &[Vec<u8>], piece: &tetris::PlayerPiece) {
        let rows = board.len() as u32;
        let cols = board[0].len() as u32;


        self.ctx.begin_path();
        self.clear();
        self.draw_border(rows, cols);

        for row in 0..rows {
            for col in 0..cols {
                let color_id = board[row as usize][col as usize];
                match color_id {
                    0 => {}
                    _ => {
                        let color = self.choose_color(color_id);
                        self.draw_dark_tile(col + 1, row, color);
                    }
                };
            }
        }

        let color = self.choose_color(piece.color_id());
        for row in 0..piece.dim() {
            for col in 0..piece.dim() {
                if piece.at_relative_row_col(row, col) {
                    let row = row as u32 + piece.row as u32;
                    let col = col as u32 + piece.col as u32;
                    self.draw_bright_tile((col + 1) as u32, row as u32, color);
                }
            }
        }

        self.ctx.stroke();
    }

    pub fn draw_border(&self, rows: u32, cols: u32) {
        self.ctx.set_fill_style(&self.border().to_jsvalue());
        // left border
        self.ctx.fill_rect(0.0, 0.0, self.tile_size as f64,
                           (rows * self.tile_size) as f64);
        // bottom border
        self.ctx.fill_rect(((cols + 1) * self.tile_size) as f64, 0.0,
                           self.tile_size as f64,
                           (rows * self.tile_size) as f64);
        // right border
        self.ctx.fill_rect(0.0,
                           (rows * self.tile_size) as f64,
                           ((cols + 2) * self.tile_size) as f64,
                           self.tile_size as f64);
    }

    fn choose_color(&self, color_id: u8) -> &ColorFamily { &self.colors[color_id as usize] }
}

#[wasm_bindgen(start)]
pub struct Controller {
    view: View,
    game: tetris::Game,
}

#[wasm_bindgen(start)]
impl Controller {
    fn new(mut view: View, game: tetris::Game) -> Controller {
        view.resize(game.get_board_height(), game.get_board_width());

        Controller {
            view,
            game,
        }
    }
    pub fn make() -> Controller {
        let view = View::new();
        let logger: Box<Fn(&str)> = Box::new(|line| { log!("{}", line); });
        let game = tetris::Game::new(10, 20, logger);
        log!("make controller");
        Controller::new(view, game)
    }

    pub fn render(&self) {
        self.view.draw(self.game.get_cells(), &self.game.get_piece());
    }
    // return true if game over
    pub fn update(&mut self, ms_delta_time: u32) -> bool {
        use tetris::UpdateResult;
        match self.game.update(ms_delta_time) {
            UpdateResult::NewScore(score) => {
                self.view.set_score(score);
                false
            }
            UpdateResult::GameOver => true,
            _ => false
        }
    }

    pub fn reset(&mut self) {
        self.game.clear();
        self.render();
    }

    pub fn resize(&mut self) {
        self.view.resize(self.game.get_board_height(),
                         self.game.get_board_width());
    }

    // Returns true if we need to pause
    pub fn press_key(&mut self, code: &str) -> bool {
        use tetris::Action;
        let action: Action = match code {
//            37 => Action::Left,     // arrow left
//            39 => Action::Right,    // arrow right
//            40 => Action::Down,     // arrow down
//            38 => Action::RotCW,    // arrow up
//            32 => Action::RotCCW,   // space bar
//
//            81 => Action::RotCCW,   // Q
//            87 => Action::RotCW,    // W
//            69 => Action::RotCW,    // E
//            65 => Action::Left,     // A
//            83 => Action::Down,     // S
//            68 => Action::Right,    // D
//
//            72 => Action::Left,     // H = vi left
//            74 => Action::Down,     // J = vi down
//            75 => Action::RotCW,    // K = vi up
//            76 => Action::Right,    // L = vi right
//
//            27 => Action::Quit,     // escape
            "ArrowLeft" => Action::Left,    // arrow left
            "ArrowRight" => Action::Right,  // arrow right
            "ArrowDown" => Action::Down,    // arrow down
            "ArrowUp" => Action::RotCW,     // arrow up
            "Space" => Action::RotCCW,      // space bar

            "KeyQ" => Action::RotCCW,
            "KeyW" => Action::RotCW,
            "KeyE" => Action::RotCW,
            "KeyA" => Action::Left,
            "KeyS" => Action::Down,
            "KeyD" => Action::Right,

            "KeyH" => Action::Left,         // vi left
            "KeyJ" => Action::Down,         // vi down
            "KeyK" => Action::RotCW,        // vi up
            "KeyL" => Action::Right,        // vi right

            "Escape" => Action::Pause,

            _ => Action::None
        };
        match self.game.input(action) {
            Some(new_score) => self.view.set_score(new_score),
            None => ()
        };
        action == Action::Pause
    }
}

fn window() -> web_sys::Window {
    web_sys::window().expect("no global `window` exists")
}

fn document() -> web_sys::Document {
    window()
        .document()
        .expect("should have a document on window")
}
