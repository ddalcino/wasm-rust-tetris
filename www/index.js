// import('../pkg/wasm_rust_tris')
//     .catch(console.error);

import * as wasm from "wasm-rust-tris";


const tetrisGame = wasm.Controller.make();

window.onresize = () => {
    tetrisGame.resize();
};

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

let lastTime = Date.now();

const renderLoop = () => {
    const newTime = Date.now();
    const ms_time_delta = newTime - lastTime;
    lastTime = newTime;

    pollGamepads(ms_time_delta);
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

const gamepadButtonToKeyCode = new Map([
    [2, "KeyQ"],
    [0, "KeyE"],
    [14, "KeyA"],
    [15, "KeyD"],
    [13, "KeyS"],
    [8, "PAUSE"],
    [9, "PAUSE"],
]);


buttonToKeyCode.forEach((keyCode, buttonId) => {
    // console.log(buttonId, keyCode);
    document.getElementById(buttonId).addEventListener("click", () => {
        tetrisGame.press_key(keyCode);
    });
});

document.getElementById("reset").addEventListener("click", () => {
    tetrisGame.reset();
    isGameOver = false;
    play();
});


function buttonPressed(b) {
    if (typeof (b) == "object") {
        return b.pressed;
    }
    return b === 1.0;
}

let buttonTimeouts = Array.apply(null, Array(17)).map(() => {
    return 0;
});

const TIMES_PER_SECOND_CAN_FIRE_BUTTON = 25.0;
const BUTTON_TIMEOUT_MS = 1000.0 / TIMES_PER_SECOND_CAN_FIRE_BUTTON;

function pollGamepads(timeDeltaMs) {
    const gamepads = navigator.getGamepads ? navigator.getGamepads()
        : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads) {
        return;
    }

    const gp = gamepads[0];
    if (!gp) {
        return;
    }
    gamepadButtonToKeyCode.forEach((keyCode, index) => {
        if (buttonTimeouts[index] > 0) {
            buttonTimeouts[index] -= timeDeltaMs;
        } else if (buttonPressed(gp.buttons[index])) {
            if (keyCode === "PAUSE") {
                togglePause();
            } else {
                tetrisGame.press_key(keyCode);
            }
            buttonTimeouts[index] = BUTTON_TIMEOUT_MS;
        }
    });
}


play();