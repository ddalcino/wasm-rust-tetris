'use strict';

import init, { Controller } from "./pkg/wasm_rust_tris.js";



// Global State
let tetrisGame = null;  //Controller.make();
let lastTime = null;  //Date.now();
let animationId = null;
let isGameOver = false;
const PAUSE_CODE = "PAUSE";


const isPaused = () => {
    return animationId === null;
};

const renderLoop = () => {
    const newTime = Date.now();
    const ms_time_delta = newTime - lastTime;
    lastTime = newTime;

    if (pollGamepads(ms_time_delta) === PAUSE_CODE) {
        togglePause();
        return;
    }
    isGameOver = tetrisGame.update(ms_time_delta);
    tetrisGame.render();

    if (!isGameOver) {
        animationId = requestAnimationFrame(renderLoop);
    } else {
        console.log("Game Over!!!");
        pauseBtn.textContent = "\u25b6";
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
};

const retTrue = () => { return true; };

window.onresize = () => {
    tetrisGame.resize();
};

const pauseBtn = document.getElementById("pause_play");

const newGame = () => {
    tetrisGame.reset();
    isGameOver = false;
    lastTime = Date.now();
    // force paused condition, if not already present
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    // start the game running again
    togglePause();
};

const togglePause = () => {
    console.log('togglePause');
    if (isGameOver) {
        newGame();
        return;
    }
    if (isPaused()) {
        console.log('play');
        pauseBtn.textContent = '\u23f8';
        animationId = requestAnimationFrame(renderLoop);
    } else {
        console.log('pause');
        pauseBtn.textContent = "\u25b6";
        cancelAnimationFrame(animationId);
        animationId = null;
    }
};

pauseBtn.onclick = () => { togglePause(); };

document.addEventListener('keypress', (event) => {
    if (isPaused()) {
        if (event.code === "Escape") {
            togglePause();
        }
    } else if (!isGameOver && !isPaused()) {
        const shouldPause = tetrisGame.press_key(event.code);
        if (shouldPause) {
            togglePause();
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

const gamepadButtonToKeyCode = new Map([
    [2, "KeyQ"],
    [0, "KeyE"],
    [14, "KeyA"],
    [15, "KeyD"],
    [13, "KeyS"],
    [8, PAUSE_CODE],
    [9, PAUSE_CODE],
]);


buttonToKeyCode.forEach((keyCode, buttonId) => {
    // console.log(buttonId, keyCode);
    document.getElementById(buttonId).addEventListener("click", () => {
        tetrisGame.press_key(keyCode);
    });
});

document.getElementById("reset").addEventListener("click", () => {
    newGame();
});


// Gamepad handling:
const buttonPressed = (b) => {
    if (typeof (b) == "object") {
        return b.pressed;
    }
    return b === 1.0;
};

// Global gamepad handling state
let buttonTimeouts = Array.apply(null, Array(17)).map(() => {
    return 0;
});

const TIMES_PER_SECOND_CAN_MOVE = 30.0;
const TIMES_PER_SECOND_CAN_ROTATE = 10.0;
const MOVEMENT_BUTTON_TIMEOUT_MS = 1000.0 / TIMES_PER_SECOND_CAN_MOVE;
const ROTATE_BUTTON_TIMEOUT_MS = 1000.0 / TIMES_PER_SECOND_CAN_ROTATE;
const PAUSE_BUTTON_TIMEOUT_MS = 1000.0;

const pollGamepads = (timeDeltaMs) => {
    const gamepads = navigator.getGamepads ? navigator.getGamepads()
        : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads) {
        return null;
    }

    const gp = gamepads[0];
    if (!gp) {
        return null;
    }

    for (let [index, keyCode] of gamepadButtonToKeyCode.entries()) {
        if (buttonTimeouts[index] > 0) {
            buttonTimeouts[index] -= timeDeltaMs;
        } else if (buttonPressed(gp.buttons[index])) {
            if (keyCode === PAUSE_CODE) {
                return PAUSE_CODE;
            } else {
                tetrisGame.press_key(keyCode);
                if (keyCode === "KeyQ" || keyCode === "KeyE") {
                    buttonTimeouts[index] = ROTATE_BUTTON_TIMEOUT_MS;
                } else {
                    buttonTimeouts[index] = MOVEMENT_BUTTON_TIMEOUT_MS;
                }
            }
        }
    }
    return null;
};


async function run() {
    console.log("Before init!");
    await init('./wasm_rust_tris_bg.wasm');
    console.log("Init is done!");

    tetrisGame = Controller.make();
    lastTime = Date.now();

    // Start game running
    togglePause();
}

run();
console.log("After run!");
