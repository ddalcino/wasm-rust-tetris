import os
import sys
import webbrowser
import subprocess
from typing import List, Optional

"""
The purpose of this script:

If npm and wasm-pack are installed, then this script will build the project,
launch an npm server, and open a web browser at the page the server is serving.
If you were to do this in bash script, it would look like:

$ wasm-pack build
$ cd www && npm install && npm run start
$ xdg-open "http://localhost:8080"

This script is meant as a multi-platform replacement for such a bash script.

Options:
Use '--skip-rebuild' to skip the 'wasm-pack build' and 'npm install' steps, if
the project hasn't changed since the last build. 
"""


def run_cmd(cmd: List[str], working_dir: Optional[str] = None, is_block=True) -> \
        Optional[subprocess.Popen]:
    print("RunCmd: %r" % cmd)
    process = subprocess.Popen(cmd, cwd=working_dir, shell=True)
    # (output, err) = process.communicate()
    if not is_block:
        return process
    process.wait()  # Block until process is done
    if process.returncode:
        raise RuntimeError("Command %r failed with return code %r" %
                           (cmd, process.returncode))


if __name__ == "__main__":
    current_working_dir = os.path.dirname(os.path.realpath(__file__))
    www_dir = os.path.join(current_working_dir, "www")
    print(www_dir)
    skip_rebuild, release_flag = False, []
    if "--skip-rebuild" in sys.argv:
        skip_rebuild = True
    if "--release" in sys.argv:
        print("add release flag")
        release_flag = ["--release"]

    if not skip_rebuild:
        run_cmd(["wasm-pack", "build"] + release_flag)
        run_cmd(["npm", "install"], working_dir=www_dir)
    server_ps = run_cmd(["npm", "run", "start"], working_dir=www_dir, is_block=False)
    webbrowser.open("http://localhost:8080")
    server_ps.wait()
