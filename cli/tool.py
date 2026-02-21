#!/usr/bin/env python3
import subprocess
from pathlib import Path

WORKDIR = Path.cwd()

def runOrDie(listOfCommands: list[str], workDir: Path = WORKDIR):
    try:
        return subprocess.run(
            listOfCommands,
            cwd=workDir,
            check=True,
            capture_output=True,
            text=True,
        )

    # Command exists but returned non-zero (e.g. git returns 1)
    except subprocess.CalledProcessError as e:
        print(f"Command failed: {' '.join(listOfCommands)}")

        return e.returncode

    # Command binary not found (your case)
    except FileNotFoundError:
        print(f"{listOfCommands[0]} - File not found")
        raise 127  # common "command not found" exit code
    

def runEcho(output:str):
    return runOrDie(["echo",output])

runEcho("echotesting")
checkGit = runOrDie(["git", "--version"])