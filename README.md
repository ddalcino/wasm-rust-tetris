# wasm-rust-tetris

An implementation of Tetris, written primarily in Rust, targeting WebAssembly.

You may play a running instance of this project at 
[Github](https://ddalcino.github.io/wasm-rust-tetris/).


### Building and running

To build this project, you will need to have installed 
[Rust](https://www.rust-lang.org/tools/install), 
[wasm-pack](https://rustwasm.github.io/wasm-pack/installer/), and 
[npm](https://www.npmjs.com/get-npm). 
Additionally, I have provided multiplatform Python scripts to automate the 
build process; if you would like to use these, you will need to have [Python 
3.5](https://www.python.org/downloads/) or above installed. 

To build and run the program, all you have to do is run:

    $ python3 run_server.py

This script will build the project, run a server that hosts the project at
localhost:8080, and open a web browser window at that address. Please note that
this script will keep running indefinitely if you don't turn it off yourself. 
Killing the script will also kill the server.

To run the server without building first, you can run:

    $ python3 run_server.py --skip-rebuild

If you are using Mac or Linux, you could use this bash statement instead of the
Python script:

    $ wasm-pack build && cd www && npm install && npm run start

This statement would build the project and run the server. I did not provide a 
bash script to do this, because it could not open a browser window. Opening
the browser does not work easily in bash on all platforms.


#### Controls

Once you have the game running, the keyboard controls are: 

1. WASD:
    * A/D to move left/right,
    * S to move down,
    * Q/E to rotate counter-clockwise/clockwise
2. Arrow keys (not working yet):
    * Left/Right arrows to move left and right,
    * Down arrow to move down,
    * Space bar/Up arrow to rotate counter-clockwise/clockwise
3. vi cursor movement keys:
    * H/L to move left/right,
    * J to move down,
    * Space bar/K to rotate counter-clockwise/clockwise

Gamepad support and mouse-pointer support are coming soon.
