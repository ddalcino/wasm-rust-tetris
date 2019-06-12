#[macro_use]
mod utils;
mod tetris;

use wasm_bindgen::prelude::*;
use wasm_bindgen::{JsCast, JsValue};
use std::f64;
use std::cmp::min;


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


pub struct View {
    canvas: web_sys::HtmlCanvasElement,
    ctx: web_sys::CanvasRenderingContext2d,
    tile_size: u32,
    score_field: web_sys::Element,
    colors: Vec<Color>,
}

impl View {
    pub fn new(document: &web_sys::Document) -> View {
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
                Color::from_rgb(64, 64, 64), // bkg
                Color::from_rgb(220, 40, 20),
                Color::from_rgb(220, 128, 20),
                Color::from_rgb(64, 220, 64),
                Color::from_rgb(64, 92, 220),
                Color::from_rgb(128, 220, 40),
                Color::from_rgb(0, 220, 220),
                Color::from_rgb(220, 0, 220),
                Color::from_rgb(0, 0, 0),   // black border
            ),
        }
    }

    fn background(&self) -> &Color { &self.colors[0] }
    fn border(&self) -> &Color { &self.colors[8] }

    fn set_score(&mut self, score: u32) {
        self.score_field.set_text_content(Some(&format!("{}", score)));
    }

    fn draw_tile(&self, x: u32, y: u32, color: &Color) {
        self.ctx.set_fill_style(&color.to_jsvalue());
        self.ctx.fill_rect(
            (x * self.tile_size) as f64,
            (y * self.tile_size) as f64,
            self.tile_size as f64,
            self.tile_size as f64,
        );
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
        let v_button_margin = 100u32;
        let h_button_margin = 0u32;
        let width = window().inner_width().unwrap().as_f64().unwrap();
        let width = width as u32 - h_button_margin;
        let height = window().inner_height().unwrap().as_f64().unwrap();
        let height = height as u32 - v_button_margin;

//        let height = self.canvas.height();
//        let width = self.canvas.width();
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
                let color = self.choose_color(board[row as usize][col as usize]);
                self.draw_tile(col + 1, row, color);
            }
        }

        let color = self.choose_color(piece.color_id());
        for row in 0..piece.dim() {
            for col in 0..piece.dim() {
                if piece.at_relative_row_col(row, col) {
                    let row = row as u32 + piece.row as u32;
                    let col = col as u32 + piece.col as u32;
                    self.draw_tile((col + 1) as u32, row as u32, color);
                }
            }
        }

        self.ctx.stroke();
    }

    pub fn draw_border(&self, rows: u32, cols: u32) {
        self.ctx.set_fill_style(&self.border().to_jsvalue());
        self.ctx.fill_rect(0.0, 0.0, self.tile_size as f64,
                           (rows * self.tile_size) as f64);
        self.ctx.fill_rect(((cols + 1) * self.tile_size) as f64, 0.0,
                           self.tile_size as f64,
                           (rows * self.tile_size) as f64);
        self.ctx.fill_rect(0.0,
                           (rows * self.tile_size) as f64,
                           ((cols + 2) * self.tile_size) as f64,
                           self.tile_size as f64);
    }

    fn choose_color(&self, color_id: u8) -> &Color { &self.colors[color_id as usize] }
}

#[wasm_bindgen(start)]
pub struct Controller {
    view: View,
    game: tetris::Game,
//    animation_id: Option<i32>,
}

#[wasm_bindgen(start)]
impl Controller {
    fn new(document: &web_sys::Document, mut view: View, game: tetris::Game) -> Controller {
        let pause_btn = document.get_element_by_id("pause_play").unwrap();

        view.resize(game.get_board_height(), game.get_board_width());

        Controller {
            view,
            game,
//            animation_id: None,
        }
    }
    pub fn make() -> Controller {
        let document = document();
        let view = View::new(&document);
        let logger: Box<Fn(&str)> = Box::new(|line| { log!("{}", line); });
        let game = tetris::Game::new(10, 20, logger);
        log!("make controller");
        Controller::new(&document, view, game)
    }

    pub fn render(&self) {
        self.view.draw(self.game.get_cells(), &self.game.get_piece());
    }
    // return true if game over
    pub fn update(&mut self, ms_delta_time: u32) -> bool {
        log!("Controller::update");
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
        let new_score = self.game.input(action);
        log!("Pressed key {}, new score is {:?}", code, new_score);

//        match self.game.input(action) {
        match new_score {
            Some(new_score) => self.view.set_score(new_score),
            None => ()
        };
        action == Action::Pause
    }
}
//
//pub fn run_render_loop(mut controller: &Controller) -> Result<(), JsValue> {
//    let f = Rc::new(RefCell::new(None));
//    let g = f.clone();
//
//    let mut time = js_sys::Date::now();
////    let time = time.get_milliseconds();
//
//    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
//        let new_time = js_sys::Date::now();
//        log!("{}", new_time);
////        let new_time = new_time.get_milliseconds();
//        let time_delta = (new_time - time) as u32;
//        time = new_time;
//        controller.update(time_delta);
//        controller.render();
//
//        // Schedule ourself for another requestAnimationFrame callback.
//        request_animation_frame(f.borrow().as_ref().unwrap());
//    }) as Box<FnMut()>));
//
//    request_animation_frame(g.borrow().as_ref().unwrap());
//    Ok(())
//}

fn window() -> web_sys::Window {
    web_sys::window().expect("no global `window` exists")
}

fn request_animation_frame(f: &Closure<dyn FnMut()>) {
    window()
        .request_animation_frame(f.as_ref().unchecked_ref())
        .expect("should register `requestAnimationFrame` OK");
}

fn document() -> web_sys::Document {
    window()
        .document()
        .expect("should have a document on window")
}

//
//fn body() -> web_sys::HtmlElement {
//    document().body().expect("document should have a body")
//}
#[wasm_bindgen(inline_js = "export function rand_int(max) { Math.floor(Math.random() * max); }")]
extern "C" {
    fn rand_int(max: u32) -> u32;
}


//#[wasm_bindgen(start)]
//pub fn start() {
//    log!("hello");
//    // make a view, make a controller, make a tetris game, connect them all
//    let document = web_sys::window().unwrap().document().unwrap();
//    let view = View::new(&document);
//    log!("make game");
//    let game = tetris::Game::new(10, 20);
//    log!("make controller");
//    let mut controller = Controller::new(&document, view, game);
//}