// import('../pkg/wasm_rust_tris')
//     .catch(console.error);

console.log('line1');
import * as wasm from "wasm-rust-tris";

console.log('line2');

const tetrisGame = wasm.Controller.make();
console.log('made controller');

// import {View} from "wasm-rust-tris";
//
// wasm.greet();
//
// // Resize canvas to fit all cells and a 1 px border around each.
// const canvas = document.getElementById("game_board");
// const ctx = canvas.getContext('2d');
//
// // const tetrisGame = tetrisGame.new();
// const view = View.new();  // pass in ctx
//
const pauseBtn = document.getElementById("pause_play");
pauseBtn.onclick = () => {
    if (isPaused()) {
        play();
    } else {
        pause();
    }
};
//
let animationId = null;
let isGameOver = false;
const isPaused = () => {
    return animationId === null;
};
const renderLoop = () => {
    console.log('renderLoop');
    let ms_time_delta = 20;
    isGameOver = tetrisGame.update(ms_time_delta);
    tetrisGame.render();

    if (!isGameOver) {
        // debugger;
        animationId = requestAnimationFrame(renderLoop);
    } else {
        console.log("Game Over!!!");
        pause();
    }
};

const play = () => {
    console.log('play');
    if (isGameOver) {
        tetrisGame.reset();
        isGameOver = false;
    }
    tetrisGame.render();
    if (isPaused()) {
        // debugger;
        pauseBtn.textContent = '\u23f8';
        animationId = requestAnimationFrame(renderLoop);
    }
};

const pause = () => {
    pauseBtn.textContent = "\u25b6";
    cancelAnimationFrame(animationId);
    animationId = null;
};

console.log('before event listeners');


document.addEventListener('keypress', (event) => {
    if (isPaused()) {
        if (event.code === "Escape") {
            play();
        }
    } else if (!isGameOver) {
        const shouldPause = tetrisGame.press_key(event.code);
        if (shouldPause) {
            pause();
        }
    }
});

//
//
// document.getElementById("rotate_left").addEventListener("click", event => {
//
// });
// document.getElementById("rotate_right").addEventListener("click", event => {
//
// });
// document.getElementById("move_left").addEventListener("click", event => {
//
// });
// document.getElementById("move_right").addEventListener("click", event => {
//
// });
// document.getElementById("move down").addEventListener("click", event => {
//
// });
document.getElementById("reset").addEventListener("click", () => {
    tetrisGame.reset();
    isGameOver = false;
    play();
});


play();