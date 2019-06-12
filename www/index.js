// import('../pkg/wasm_rust_tris')
//     .catch(console.error);

import * as wasm from "wasm-rust-tris";


const tetrisGame = wasm.Controller.make();

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
    console.log('pause');
    pauseBtn.textContent = "\u25b6";
    cancelAnimationFrame(animationId);
    animationId = null;
};


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

const buttonToKeyCode = new Map([
    ["rotate_left", "KeyQ"],
    ["rotate_right", "KeyE"],
    ["move_left", "KeyA"],
    ["move_right", "KeyD"],
    ["move_down", "KeyS"],
]);

buttonToKeyCode.forEach((keyCode, buttonId) => {
    console.log(buttonId, keyCode);
    document.getElementById(buttonId).addEventListener("click", () => {
        tetrisGame.press_key(keyCode);
    });
});

document.getElementById("reset").addEventListener("click", () => {
    tetrisGame.reset();
    isGameOver = false;
    play();
});


play();