#!/usr/bin/env bash
set -euo pipefail

die() {
  echo "Error: $1" >&2
  exit 1
}
require() { command -v "$1" >/dev/null 2>&1 || die "$1 not found"; }

spinner() {
  local pid="$1"
  local delay=0.1
  local spin='|/-\'
  local i=0

  # Hide cursor
  tput civis 2>/dev/null || true

  while kill -0 "$pid" 2>/dev/null; do
    i=$(( (i + 1) % 4 ))
    printf "\r[%c] Working..." "${spin:$i:1}"
    sleep "$delay"
  done

  # Restore cursor and clear line
  tput cnorm 2>/dev/null || true
  printf "\r\033[K"
}

run_with_spinner() {
  local msg="$1"; shift
  printf "%s " "$msg"

  # Run command in background, capture output to temp file
  local tmp
  tmp="$(mktemp)"
  ( "$@" ) >"$tmp" 2>&1 &
  local pid=$!

  spinner "$pid"
  wait "$pid"
  local rc=$?

  if [ $rc -eq 0 ]; then
    echo "✅"
    rm -f "$tmp"
    return 0
  else
    echo "❌"
    echo "---- output ----" >&2
    cat "$tmp" >&2
    rm -f "$tmp"
    return $rc
  fi
}

ask_yn() {
  local prompt="$1"
  local ans

  while true; do
    read -r -p "$prompt [y/n]: " ans
    ans="${ans,,}"  # lowercase
    case "$ans" in
      y|yes) return 0 ;;
      n|no)  return 1 ;;
      *) echo "Please answer y or n." ;;
    esac
  done
}

require git
require node
require npm
require npx

echo "Running in: $(pwd)"


echo "All tools are available."

ZeroGSKILLSLINK=https://github.com/wolfiesell/0g-agent-pack.git
INCLUDE_AGENTIC=false
IMPORT_DEV_MODULES=false
INCLUDE_ZKPOH=false
INCLUDE_INFT=false
INCLUDE_0G_COMPUTE=false
INSTALL_NEXTJS=false
USE_TAILWIND=false
USE_ES_LINT=false
USE_TS=false
USE_SRC_DIR=false



ask_yn "Include agentic materials for developing on 0g?" && INCLUDE_AGENTIC=true
ask_yn "Import developer modules?" && IMPORT_DEV_MODULES=true
if $IMPORT_DEV_MODULES; then
    ask_yn "Do you want to include zkPoH scaffolding?" && INCLUDE_ZKPOH=true
    ask_yn "Do you want to include iNFT stuff?" && INCLUDE_INFT=true
    ask_yn "Do you want to include basic 0g compute scaffolding?" && INCLUDE_0G_COMPUTE=true
fi


if $INCLUDE_AGENTIC; then
  run_with_spinner "Cloning agentic materials..." git clone --depth 1 "$ZeroGSKILLSLINK"
fi
ask_yn "Do you want nextjs or react scaffolding (y/n)?" && INSTALL_NEXTJS=true
if $INSTALL_NEXTJS; then
    read -r -p "Project name: " PROJECT_NAME

    ask_yn "Use TypeScript (default)?" && USE_TS=true || USE_TS=false
    ask_yn "Include Tailwind (default)?" && USE_TAILWIND=true || USE_TAILWIND=false
    ask_yn "Include ESLint?" && USE_ES_LINT=true || USE_ES_LINT=false
    ask_yn "Use src/ directory?" && USE_SRC_DIR=true || USE_SRC_DIR=false
    opts=()
    # TypeScript is default; if user says NO, force JS
    if ! $USE_TS; then
    opts+=(--js)             # or: opts+=(--no-ts --js)
    else
    opts+=(--ts)             # optional; can omit since it's default
    fi

    # Tailwind is default; if user says NO, disable it
    if ! $USE_TAILWIND; then
    opts+=(--no-tailwind)
    else
    opts+=(--tailwind)       # optional; can omit since it's default
    fi

    # Linter: enable or disable
    if $USE_ES_LINT; then
    opts+=(--eslint)
    else
    opts+=(--no-linter)
    fi

    if $USE_SRC_DIR; then
    opts+=(--src-dir)
    fi
    opts+=(--yes)

    APP_NAME="0g-${PROJECT_NAME}"
    npx create-next-app@latest "$APP_NAME" "${opts[@]}"
fi

echo "after create-next-app (rc=$?)"
if $IMPORT_DEV_MODULES; then
  if $INCLUDE_ZKPOH; then
    echo "Setting up zkPoH scaffolding..."
    # Placeholder for actual setup commands
  fi

  if $INCLUDE_INFT; then
    echo "Setting up iNFT scaffolding..."
    # Placeholder for actual setup commands
  fi

  if $INCLUDE_0G_COMPUTE; then
    echo "Setting up 0g compute scaffolding..."
    # Placeholder for actual setup commands
  fi
fi





