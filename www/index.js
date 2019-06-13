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

let lastTime = Date.now();
const threshold = Math.floor(1000.0 / 60.0);

const calcMsTimeDelta = () => {
    const newTime = Date.now();
    return newTime - lastTime;
};

const renderLoop = () => {
    const ms_time_delta = calcMsTimeDelta();
    if (ms_time_delta > threshold) {
        lastTime += ms_time_delta;
        console.log("time_delta is " + ms_time_delta);
        pollGamepads();
        isGameOver = tetrisGame.update(ms_time_delta);
        tetrisGame.render();
    }

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
]);

// 8 & 9 for pause


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

// var gamepads = [];
//
// function gamepadHandler(event, connecting) {
//     var gamepad = event.gamepad;
//     console.log(gamepad);
//     // Note:
//     // gamepad === navigator.getGamepads()[gamepad.index]
//
//     if (connecting) {
//         console.log("gamepad connected");
//         gamepads[gamepad.index] = gamepad;
//     } else {
//         console.log("gamepad disconnected");
//         delete gamepads[gamepad.index];
//     }
// }
//
// window.addEventListener("gamepadconnected", function (e) {
//     gamepadHandler(e, true);
// }, false);
// window.addEventListener("gamepaddisconnected", function (e) {
//     gamepadHandler(e, false);
// }, false);

//
// let interval = null;
//
// if (!('ongamepadconnected' in window)) {
//     // No gamepad events available, poll instead.
//     interval = setInterval(pollGamepads, 500);
// }
//

function buttonPressed(b) {
    if (typeof (b) == "object") {
        return b.pressed;
    }
    return b === 1.0;
}

let gamepadRemembory = Array.apply(null, Array(17)).map(() => {
    return false
});

function pollGamepads() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    if (!gamepads) {
        return;
    }

    const gp = gamepads[0];
    if (!gp) {
        return;
    }
    if (buttonPressed(gp.buttons[8]) || buttonPressed(gp.buttons[9])) {
        pause();
        // if (isPaused()) { play(); } else { pause(); }
    }
    gamepadButtonToKeyCode.forEach((keyCode, index) => {
        if (gamepadRemembory[index]) {
            gamepadRemembory[index] = false;
        } else if (buttonPressed(gp.buttons[index])) {
            tetrisGame.press_key(keyCode);
            gamepadRemembory[index] = true;
        }
    });
    console.log("Button 0 is " + buttonPressed(gp.buttons[0]));
}


// gamepads.forEach((gamepad, index) => {
// if (gamepad) {
//     // console.log(index);
//     // console.log(gamepad);
//     gamepad.buttons.forEach((button, index) => {
//         if (button.pressed) console.log("Press button " + index);
//     });
//     // gamepad.axes.forEach((value, index) => {
//     //     if (value) console.log("Axis " + index + " has value " + value);
//     // });
// }
// });

// for (let i = 0; i < gamepads.length; i++) {
//     const gp = gamepads[i];
//     if (gp) {
//         gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id +
//             ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
//         gameLoop();
//         clearInterval(interval);
//     }
// }


play();