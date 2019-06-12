extern crate rand;

use self::rand::seq::SliceRandom;
use std::clone::Clone;


#[derive(Copy, Clone, Debug)]
pub enum Rotation {
    Zero,
    Ninety,
    OneEighty,
    TwoSeventy,
}

pub enum RotateType {
    Rot90,
    Toggle,
    None,
}

const TETRA_DIM_3: usize = 3;

pub struct Tetromino3Repr {
    rows: [bool; TETRA_DIM_3 * TETRA_DIM_3],
    rotate_type: RotateType,
}

impl Tetromino3Repr {
    fn at_row_col(&self, row: usize, col: usize, rot: Rotation) -> bool {
        if row > TETRA_DIM_3 || col > TETRA_DIM_3 {
            return false;
        }
        match rot {
            Rotation::Zero => self.rows[row * TETRA_DIM_3 + col],
            /* 0  1  2
            3  4  5
            6  7  8  */
            Rotation::Ninety => self.rows[6 - (col * TETRA_DIM_3) + row],
            /* 6 3 0
               7 4 1
            */
            Rotation::OneEighty => self.rows[8 - col - (row * TETRA_DIM_3)],
            /* 8 7 6
               5 4 3
            */
            Rotation::TwoSeventy => self.rows[2 - row + (TETRA_DIM_3 * col)],
            /* 2 5 8
               1 4 7
            */
        }
    }
    fn dim() -> usize {
        TETRA_DIM_3
    }
}

pub struct Tetromino4Repr {
    // the only tetromino this can represent is a straight line
}

impl Tetromino4Repr {
    fn at_row_col(&self, row: usize, col: usize, rot: Rotation) -> bool {
        if row > 4 || col > 4 {
            return false;
        }
        match rot {
            Rotation::Zero => row == 1,
            Rotation::Ninety => col == 1,
            Rotation::OneEighty => row == 1,
            Rotation::TwoSeventy => col == 1,
        }
    }
    fn dim() -> usize {
        4
    }
}

#[derive(Debug, Copy, Clone)]
pub enum Tetromino {
    I,
    L,
    J,
    S,
    Z,
    O,
    T,
}

pub enum TetrominoRepr {
    Repr3x3(Tetromino3Repr),
    Repr4x4(Tetromino4Repr),
}

fn color_id(t: Tetromino) -> u8 {
    match t {
        Tetromino::I => 1,
        Tetromino::L => 2,
        Tetromino::J => 3,
        Tetromino::S => 4,
        Tetromino::Z => 5,
        Tetromino::O => 6,
        Tetromino::T => 7,
    }
}

fn repr(t: Tetromino) -> TetrominoRepr {
    match t {
        Tetromino::I => TetrominoRepr::Repr4x4(Tetromino4Repr {}),
        Tetromino::L => TetrominoRepr::Repr3x3(Tetromino3Repr {
            rows: [
                false, false, false, //
                true, true, true, //
                true, false, false, //
            ],
            rotate_type: RotateType::Rot90,
        }),
        Tetromino::J => TetrominoRepr::Repr3x3(Tetromino3Repr {
            rows: [
                false, false, false, //
                true, true, true, //
                false, false, true, //
            ],
            rotate_type: RotateType::Rot90,
        }),
        Tetromino::S => TetrominoRepr::Repr3x3(Tetromino3Repr {
            rows: [
                false, false, false, //
                false, true, true, //
                true, true, false, //
            ],
            rotate_type: RotateType::Toggle,
        }),
        Tetromino::Z => TetrominoRepr::Repr3x3(Tetromino3Repr {
            rows: [
                false, false, false, //
                true, true, false, //
                false, true, true, //
            ],
            rotate_type: RotateType::Toggle,
        }),
        Tetromino::O => TetrominoRepr::Repr3x3(Tetromino3Repr {
            rows: [
                false, false, false, //
                true, true, false, //
                true, true, false, //
            ],
            rotate_type: RotateType::None,
        }),
        Tetromino::T => TetrominoRepr::Repr3x3(Tetromino3Repr {
            rows: [
                false, false, false, //
                true, true, true, //
                false, true, false, //
            ],
            rotate_type: RotateType::Rot90,
        }),
    }
}

fn rotate(tetromino: Tetromino, current_rotation: Rotation, is_cw: bool) -> Rotation {
    let rotate_type = match repr(tetromino) {
        TetrominoRepr::Repr4x4(_) => RotateType::Toggle,
        TetrominoRepr::Repr3x3(t_repr) => t_repr.rotate_type,
    };

    match rotate_type {
        RotateType::Rot90 => match is_cw {
            true => match current_rotation {
                Rotation::Zero => Rotation::Ninety,
                Rotation::Ninety => Rotation::OneEighty,
                Rotation::OneEighty => Rotation::TwoSeventy,
                Rotation::TwoSeventy => Rotation::Zero,
            },
            false => match current_rotation {
                Rotation::Zero => Rotation::TwoSeventy,
                Rotation::Ninety => Rotation::Zero,
                Rotation::OneEighty => Rotation::Ninety,
                Rotation::TwoSeventy => Rotation::OneEighty,
            },
        },
        RotateType::Toggle => match current_rotation {
            Rotation::Zero => Rotation::Ninety,
            Rotation::Ninety => Rotation::Zero,
            Rotation::OneEighty => Rotation::TwoSeventy,
            Rotation::TwoSeventy => Rotation::OneEighty,
        },
        RotateType::None => current_rotation,
    }
}

pub struct Board {
    width: usize,
    height: usize,
    cells: Vec<Vec<u8>>,
}

impl Board {
    fn num_negative_rows() -> usize { 4 }
    fn row_coord(row: i32) -> usize {
        assert_eq!(row < -(Board::num_negative_rows() as i32), false);
        (row + Board::num_negative_rows() as i32) as usize
    }
    fn col_coord(col: i32) -> usize {
        assert_eq!(col < 0, false);
        col as usize
    }
    pub fn new(w: usize, h: usize) -> Board {
        Board {
            width: w,
            height: h + Board::num_negative_rows(),
            cells: vec![vec![0; w]; h + Board::num_negative_rows()],
        }
    }
    fn is_empty_at(&self, row: usize, col: usize) -> bool {
        self.cells[row][col] == 0
    }
    pub fn cells(&self) -> &[Vec<u8>] { &self.cells[Board::num_negative_rows()..] }
    pub fn set_cell(&mut self, row: i32, col: i32, color_id: u8) -> bool {
        let row = Board::row_coord(row);
        let col = Board::col_coord(col);
        if !self.is_empty_at(row, col) && color_id > 0 {
            false
        } else {
            self.cells[row][col] = color_id;
            true
        }
    }
    pub fn to_str(&self, piece: &PlayerPiece) -> String {
        let mut repr = String::new();
        for row in Board::num_negative_rows()..self.height {
            repr.push_str("#");

            for col in 0..self.width {
                repr.push_str(match self.is_empty_at(row, col) {
                    true => "X",
                    false => match piece.at_row_col(row, col) {
                        true => "O",
                        false => " ",
                    },
                });
            }
            repr.push_str("#\n");
        }
        repr.push_str(
            &std::iter::repeat("#")
                .take((self.width + 2) as usize)
                .collect::<String>(),
        );
        repr.push_str("\n");
        repr
    }
    pub fn fits(&self, piece: &PlayerPiece) -> bool {
        match repr(piece.tetromino) {
            TetrominoRepr::Repr3x3(t) => piece.fits_3(t, self),
            TetrominoRepr::Repr4x4(t) => piece.fits_4(t, self),
        }
    }
    pub fn has_space_at(&self, row: i32, col: i32) -> bool {
        if col < 0 || (col as usize) >= self.width { return false; }
        assert_eq!(row < -(Board::num_negative_rows() as i32), false);
        let row = Board::row_coord(row);
        let col = Board::col_coord(col);
        row < self.height && self.is_empty_at(row, col)
    }
    pub fn add_piece(&mut self, piece: &PlayerPiece) -> bool {
        let color_id = color_id(piece.tetromino);
        match repr(piece.tetromino) {
            TetrominoRepr::Repr3x3(t) => {
                for row in 0..Tetromino3Repr::dim() {
                    for col in 0..Tetromino3Repr::dim() {
                        if t.at_row_col(row, col, piece.rotation) {
                            if !self.set_cell(row as i32 + piece.row, col as i32 + piece.col, color_id) {
                                return false;
                            }
                            // if can't add, then return false
                        }
                    }
                }
            }
            TetrominoRepr::Repr4x4(t) => {
                for row in 0..Tetromino4Repr::dim() {
                    for col in 0..Tetromino4Repr::dim() {
                        if t.at_row_col(row, col, piece.rotation) {
                            if !self.set_cell(row as i32 + piece.row, col as i32 + piece.col, color_id) {
                                return false;
                            }
                        }
                    }
                }
            }
        } // match
        true
    }
    pub fn width(&self) -> usize { self.width }
    pub fn height(&self) -> usize { (self.height - Board::num_negative_rows()) }
    fn is_row_complete(&self, row: usize) -> bool {
        if row >= self.height as usize {
            false
        } else {
            for i in 0..self.width as usize {
                // cell in &self.cells[row] {
                if self.is_empty_at(row, i) {
                    return false;
                }
            }
            true
        }
    }
    pub fn clear_complete_rows(&mut self) -> Option<u32> {
        let mut num_rows_cleared: u32 = 0;
        for i in (0..self.height as usize).rev() {
            while self.is_row_complete(i) {
                num_rows_cleared += 1;
                self.clear_row(i);
            }
        }
        if num_rows_cleared > 0 {
            Some((num_rows_cleared * num_rows_cleared) * 10)
        } else {
            None
        }
    }
    fn clear_row(&mut self, row: usize) {
        println!("clear row {}", row);
        if row >= self.height as usize {
            return;
        }
        for i in (0..row).rev() {
            self.cells[i + 1] = self.cells[i].clone();
        }
        self.cells[0] = vec![0; self.width];
    }
    pub fn clear(&mut self) {
        for i in 0..self.height {
            for j in 0..self.width {
                self.cells[i][j] = 0;
            }
        }
    }
}

#[derive(Debug, Copy, Clone)]
pub struct PlayerPiece {
    pub row: i32,
    pub col: i32,
    rotation: Rotation,
    tetromino: Tetromino,
}

//#[wasm_bindgen]
#[derive(Debug, Copy, Clone, PartialEq)]
pub enum Action {
    Left,
    Right,
    Down,
    RotCW,
    RotCCW,
    Pause,
    None,
}

impl PlayerPiece {
    pub fn get_random_tetromino() -> Tetromino {
        const TETROMINOS: [Tetromino; 7] = [
            Tetromino::I,
            Tetromino::L,
            Tetromino::J,
            Tetromino::S,
            Tetromino::Z,
            Tetromino::O,
            Tetromino::T,
        ];
        //rand_int(TETROMINOS.len() as u32);
//        TETROMINOS[index]
//        TETROMINOS.choose(&mut rand::rngs::OsRng::new().unwrap()).unwrap().clone()
        TETROMINOS.choose(&mut rand::thread_rng()).unwrap().clone()
    }

    pub fn color_id(&self) -> u8 { color_id(self.tetromino) }

    pub fn new(board_width: usize) -> PlayerPiece {
        PlayerPiece {
            row: -1,
            col: board_width as i32 / 2 - 1,
            rotation: Rotation::Zero,
            tetromino: PlayerPiece::get_random_tetromino(),
        }
    }

    pub fn can_act(&self, action: Action, board: &Board) -> bool {
        let mut copy = self.clone();
        copy.act(action);
        board.fits(&copy)
    }

    pub fn act(&mut self, action: Action) {
        match action {
            Action::Left => {
                self.col -= 1;
            }
            Action::Right => {
                self.col += 1;
            }
            Action::Down => {
                self.row += 1;
            }
            Action::RotCW => self.rotate(true),
            Action::RotCCW => self.rotate(false),
            _ => (),
        }
    }
    pub fn rotate(&mut self, is_cw: bool) {
        // -> Rotation {
        self.rotation = rotate(self.tetromino, self.rotation, is_cw);
    }

    pub fn fits_3(&self, piece: Tetromino3Repr, board: &Board) -> bool {
        for row in 0..Tetromino3Repr::dim() {
            for col in 0..Tetromino3Repr::dim() {
                if piece.at_row_col(row, col, self.rotation)
                    && !board.has_space_at(row as i32 + self.row, col as i32 + self.col)
                {
                    return false;
                }
            }
        }
        true
    }
    pub fn fits_4(&self, piece: Tetromino4Repr, board: &Board) -> bool {
        for row in 0..Tetromino4Repr::dim() {
            for col in 0..Tetromino4Repr::dim() {
                if piece.at_row_col(row, col, self.rotation)
                    && !board.has_space_at(row as i32 + self.row, col as i32 + self.col)
                {
                    return false;
                }
            }
        }
        true
    }

    pub fn at_row_col(&self, row: usize, col: usize) -> bool {
        //        if ((row as i32) < self.row) || row as i32 >= self.row + self.dim() as i32 {
        //            return false;
        //        }
        //        if ((col as i32) < self.col) || col as i32 >= self.col + self.dim() as i32 {
        //            return false;
        //        }
        let row = ((row as i32) - self.row) as usize;
        let col = ((col as i32) - self.col) as usize;
        self.at_relative_row_col(row, col)

        //        match repr(self.tetromino) {
        //            TetrominoRepr::Repr4x4(t) => t.at_row_col(row, col, self.rotation),
        //            TetrominoRepr::Repr3x3(t) => t.at_row_col(row, col, self.rotation),
        //        }
    }
    pub fn at_relative_row_col(&self, row: usize, col: usize) -> bool {
        if row > self.dim() || col > self.dim() {
            false
        } else {
            match repr(self.tetromino) {
                TetrominoRepr::Repr4x4(t) => t.at_row_col(row, col, self.rotation),
                TetrominoRepr::Repr3x3(t) => t.at_row_col(row, col, self.rotation),
            }
        }
    }

    pub fn dim(&self) -> usize {
        match repr(self.tetromino) {
            TetrominoRepr::Repr4x4(_) => Tetromino4Repr::dim(),
            TetrominoRepr::Repr3x3(_) => Tetromino3Repr::dim(),
        }
    }
}

pub enum UpdateResult {
    NewScore(u32),
    GameOver,
    None,
}

//#[wasm_bindgen]
pub struct Game {
    board: Board,
    piece: PlayerPiece,
    //    //    block_size: f64,
    time_controller: TimeController,
    is_over: bool,
    score: u32,
    logger: Box<dyn Fn(&str)>,
}

//#[wasm_bindgen]
impl Game {
    pub fn new(width: usize, height: usize, logger: Box<dyn Fn(&str)>) -> Game {
        Game {
            board: Board::new(width, height),
            piece: PlayerPiece::new(width),
//            block_size: (min(WIN_SIZE[0], WIN_SIZE[1]) /
//                (max(width, height) as u32 + 2)) as f64,
            time_controller: TimeController::new(1000),
            is_over: false,
            score: 0,
            logger,
        }
    }
    pub fn input(&mut self, action: Action) -> Option<u32> {
        if self.piece.can_act(action.clone(), &self.board) {
            self.piece.act(action);
            return None;
        } else {
            match action {
                Action::Down => {
                    if !self.board.add_piece(&self.piece) {
                        self.is_over = true;
                        return None;
                    }
                    let retval = match self.board.clear_complete_rows() {
                        Some(score) => {
                            self.score += score;
                            Some(self.score)
                        }
                        None => None
                    };
                    self.piece = PlayerPiece::new(self.board.width());
                    retval
                }
                _ => None
            }
        }
    }
    // TODO: refactor this to the controller!
    pub fn update(&mut self, ms_delta_time: u32) -> UpdateResult {
        if self.time_controller.update(ms_delta_time) {
            (self.logger)("Game::update inputs down");
            return match self.input(Action::Down) {
                Some(score) => UpdateResult::NewScore(score),
                None => UpdateResult::None
            };
        }
        match self.over() {
            true => UpdateResult::GameOver,
            false => UpdateResult::None
        }
    }
    pub fn clear(&mut self) {
        self.board.clear();
        self.piece = PlayerPiece::new(self.board.width());
        self.time_controller.reset();
        self.is_over = false;
        self.score = 0;
    }
    #[allow(dead_code)]
    pub fn reset_time(&mut self) { self.time_controller.reset_timer(); }
    pub fn get_board_height(&self) -> u32 { self.board.height() as u32 }
    pub fn get_board_width(&self) -> u32 { self.board.width() as u32 }
    pub fn get_piece(&self) -> PlayerPiece { self.piece }
    pub fn get_cells(&self) -> &[Vec<u8>] { self.board.cells() }
    pub fn over(&self) -> bool { self.is_over }
    #[allow(dead_code)]
    pub fn to_str(&self) -> String { self.board.to_str(&self.piece) }
}

struct TimeController {
    ms_since_last_tick: u32,
    ms_interval: u32,
    ms_base_interval: u32,
}

impl TimeController {
    fn new(interval: u32) -> TimeController {
        TimeController {
            ms_since_last_tick: 0,
            ms_interval: interval,
            ms_base_interval: interval,
        }
    }
    fn update(&mut self, ms_delta_time: u32) -> bool {
        self.ms_since_last_tick += ms_delta_time;
        if self.ms_since_last_tick >= self.ms_interval {
            self.ms_since_last_tick %= self.ms_interval;
            true
        } else { false }
    }
    #[allow(dead_code)]
    fn reset_timer(&mut self) { self.ms_since_last_tick = 0; }
    fn reset(&mut self) {
        self.ms_interval = self.ms_base_interval;
        self.reset_timer();
    }
    #[allow(dead_code)]
    fn level_up(&mut self) {
        self.ms_interval = (self.ms_interval as f32 * 0.9) as u32;
    }
}

