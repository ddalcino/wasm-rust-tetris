from shutil import copy2
from glob import glob
from os.path import join

"""
Copy everything from www to deploy_artifact
Copy everything from pkg to deploy_artifact
"""

if __name__ == '__main__':
    dst_dir = "deploy_artifact"
    for src_dir in ("pkg", "www"):
        for filename in glob(join(src_dir, '*.*')):
            copy2(filename, dst_dir)
