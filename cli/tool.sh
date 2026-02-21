#!/usr/bin/env bash
set -euo pipefail

# ---------- Pretty UI helpers (animations only; does not change command sequence) ----------
# ANSI (works in most terminals)
BOLD=$'\033[1m'
DIM=$'\033[2m'
RESET=$'\033[0m'
RED=$'\033[31m'
GREEN=$'\033[32m'
YELLOW=$'\033[33m'
BLUE=$'\033[34m'
MAG=$'\033[35m'
CYAN=$'\033[36m'
GRAY=$'\033[90m'

quit() {
  # restore cursor etc. (your cleanup_ui trap will also run on EXIT)
  echo
  printf "${YELLOW}👋 Quit.${RESET}\n" >&2
  exit 130   # standard exit code for SIGINT
}



# Hide cursor on exit safety
cleanup_ui() { tput cnorm 2>/dev/null || true; }
trap cleanup_ui EXIT TERM
trap quit INT

hr() { printf "${GRAY}%s${RESET}\n" "────────────────────────────────────────────────────────────"; }

banner() {
  clear 2>/dev/null || true
  printf "${BOLD}${CYAN}╔════════════════════════════════════════════════════════════╗${RESET}\n"
  printf "${BOLD}${CYAN}║${RESET} ${BOLD}0G Scaffold Wizard${RESET} ${DIM}— quick setup for your repo${RESET}                 ${BOLD}${CYAN}║${RESET}\n"
  printf "${BOLD}${CYAN}╚════════════════════════════════════════════════════════════╝${RESET}\n"
}

section() {
  echo
  hr
  printf "${BOLD}${MAG}▶ %s${RESET}\n" "$1"
  hr
}

# Animated dots (used for tiny “loading” moments, not running commands)
dots() {
  local msg="$1"
  local n=${2:-3}
  printf "${DIM}%s${RESET}" "$msg"
  for _ in $(seq 1 "$n"); do
    printf "."
    sleep 0.12
  done
  printf "\n"
}

# ---------- Your original functions (kept; only styled output) ----------
die() {
  printf "${RED}${BOLD}Error:${RESET} %s\n" "$1" >&2
  exit 1
}
require() { command -v "$1" >/dev/null 2>&1 || die "$1 not found"; }

spinner() {
  local pid="$1"
  local delay=0.08
  local spin='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
  local i=0

  tput civis 2>/dev/null || true

  while kill -0 "$pid" 2>/dev/null; do
    # cycle through braille spinner
    i=$(( (i + 1) % ${#spin} ))
    printf "\r${CYAN}%s${RESET} %s" "${spin:$i:1}" "${DIM}Working...${RESET}"
    sleep "$delay"
  done

  tput cnorm 2>/dev/null || true
  printf "\r\033[K"
}

run_with_spinner() {
  local msg="$1"; shift
  printf "${BOLD}%s${RESET} " "$msg"

  local tmp
  tmp="$(mktemp)"
  ( "$@" ) >"$tmp" 2>&1 &
  local pid=$!

  spinner "$pid"
  wait "$pid"
  local rc=$?

  if [ $rc -eq 0 ]; then
    printf "${GREEN}✓${RESET}\n"
    rm -f "$tmp"
    return 0
  else
    printf "${RED}✗${RESET}\n"
    printf "${RED}${BOLD}---- output ----${RESET}\n" >&2
    cat "$tmp" >&2
    rm -f "$tmp"
    return $rc
  fi
}

ask_yn() {
  local prompt="$1"
  local ans
  while true; do
    # slightly nicer prompt
    printf "${BOLD}${YELLOW}?${RESET} %s ${DIM}[y/n]${RESET}: " "$prompt"
    read -r ans
    ans="${ans,,}"
    case "$ans" in
      y|yes) return 0 ;;
      n|no)  return 1 ;;
      *) printf "${RED}Please answer y or n.${RESET}\n" ;;
    esac
  done
}

# ---------- Script starts (same command sequence) ----------
banner
section "Prerequisites"
dots "Checking required tools" 4

require git
require node
require npm
require npx

printf "${GREEN}✓${RESET} %s\n" "All tools are available."
printf "${DIM}Running in:${RESET} %s\n" "$(pwd)"

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

section "Feature Selection"
ask_yn "Include agentic materials for developing on 0g?" && INCLUDE_AGENTIC=true
ask_yn "Import developer modules?" && IMPORT_DEV_MODULES=true
if $IMPORT_DEV_MODULES; then
  ask_yn "Do you want to include zkPoH scaffolding?" && INCLUDE_ZKPOH=true
  ask_yn "Do you want to include iNFT stuff?" && INCLUDE_INFT=true
  ask_yn "Do you want to include basic 0g compute scaffolding?" && INCLUDE_0G_COMPUTE=true
fi

section "Scaffolding"
if $INCLUDE_AGENTIC; then
  run_with_spinner "Cloning agentic materials..." git clone --depth 1 "$ZeroGSKILLSLINK"
fi

ask_yn "Do you want nextjs or react scaffolding (y/n)?" && INSTALL_NEXTJS=true
if $INSTALL_NEXTJS; then
  printf "${BOLD}${YELLOW}?${RESET} Project name: "
    read -r PROJECT_NAME

  ask_yn "Use TypeScript (default)?" && USE_TS=true || USE_TS=false
  ask_yn "Include Tailwind (default)?" && USE_TAILWIND=true || USE_TAILWIND=false
  ask_yn "Include ESLint?" && USE_ES_LINT=true || USE_ES_LINT=false
  ask_yn "Use src/ directory?" && USE_SRC_DIR=true || USE_SRC_DIR=false

  opts=()
  if ! $USE_TS; then
    opts+=(--js)
  else
    opts+=(--ts)
  fi

  if ! $USE_TAILWIND; then
    opts+=(--no-tailwind)
  else
    opts+=(--tailwind)
  fi

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

  section "Creating Next.js app"
  dots "Bootstrapping ${APP_NAME}" 3
  npx create-next-app@latest "$APP_NAME" "${opts[@]}"
fi

printf "${DIM}after create-next-app (rc=$?)${RESET}\n"

section "Optional Modules"
if $IMPORT_DEV_MODULES; then
  if $INCLUDE_ZKPOH; then
    printf "${CYAN}↳${RESET} Setting up zkPoH scaffolding...\n"
    # Placeholder for actual setup commands
  fi

  if $INCLUDE_INFT; then
    printf "${CYAN}↳${RESET} Setting up iNFT scaffolding...\n"
    # Placeholder for actual setup commands
  fi

  if $INCLUDE_0G_COMPUTE; then
    printf "${CYAN}↳${RESET} Setting up 0g compute scaffolding...\n"
    # Placeholder for actual setup commands
  fi
fi

section "Summary"
printf "${GREEN}✓${RESET} Agentic materials:      %s\n" "$INCLUDE_AGENTIC"
printf "${GREEN}✓${RESET} Import dev modules:     %s\n" "$IMPORT_DEV_MODULES"
printf "${GREEN}✓${RESET} zkPoH scaffolding:      %s\n" "$INCLUDE_ZKPOH"
printf "${GREEN}✓${RESET} iNFT scaffolding:       %s\n" "$INCLUDE_INFT"
printf "${GREEN}✓${RESET} 0g compute scaffolding: %s\n" "$INCLUDE_0G_COMPUTE"
if $INSTALL_NEXTJS; then
  printf "${GREEN}✓${RESET} Next.js app:            %s\n" "$APP_NAME"
fi
echo
printf "${BOLD}${GREEN}Done.${RESET}\n"