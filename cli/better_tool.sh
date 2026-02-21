#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════════════════════════
#  better_tool.sh  —  0G Scaffold Wizard  (Premium TUI edition)
#
#  Pure-bash TUI: no external deps beyond git/node/npm/npx.
#  Uses ANSI 256-color, box-drawing, inline overwrite spinners,
#  arrow-key multi-select menus, and a receipt-style summary card.
# ═══════════════════════════════════════════════════════════════════════════════

# ── ANSI palette ──────────────────────────────────────────────────────────────
BOLD=$'\033[1m'
DIM=$'\033[2m'
ITALIC=$'\033[3m'
UNDERLINE=$'\033[4m'
RESET=$'\033[0m'
RED=$'\033[38;5;196m'
GREEN=$'\033[38;5;48m'
YELLOW=$'\033[38;5;220m'
BLUE=$'\033[38;5;75m'
CYAN=$'\033[38;5;87m'
MAG=$'\033[38;5;177m'
ORANGE=$'\033[38;5;208m'
GRAY=$'\033[38;5;240m'
WHITE=$'\033[38;5;255m'
BG_CARD=$'\033[48;5;235m'
BG_RESET=$'\033[49m'

# gradient 8 steps (cyan ➜ blue ➜ magenta)
G=( $'\033[38;5;87m' $'\033[38;5;81m' $'\033[38;5;75m' $'\033[38;5;69m'
    $'\033[38;5;105m' $'\033[38;5;141m' $'\033[38;5;177m' $'\033[38;5;213m' )

# ── Cursor / cleanup ─────────────────────────────────────────────────────────
hide_cursor() { printf '\033[?25l'; }
show_cursor() { printf '\033[?25h'; }
cleanup_ui()  { show_cursor; stty echo 2>/dev/null || true; }
trap cleanup_ui EXIT TERM

quit() {
  echo
  printf "${YELLOW}  👋 Interrupted — exiting.${RESET}\n"
  exit 130
}
trap quit INT

# ── Geometry ──────────────────────────────────────────────────────────────────
term_width() { tput cols 2>/dev/null || echo 80; }

center_text() {
  local text="$1" w
  w=$(term_width)
  local stripped
  stripped=$(printf '%s' "$text" | sed 's/\x1b\[[0-9;]*m//g')
  local pad=$(( (w - ${#stripped}) / 2 ))
  (( pad < 0 )) && pad=0
  printf '%*s%s\n' "$pad" '' "$text"
}

hr_line() {
  local w
  w=$(term_width)
  local ch="${1:-─}"
  local color="${2:-$GRAY}"
  printf '%s' "$color"
  printf '%0.s'"$ch" $(seq 1 "$w")
  printf '%s\n' "$RESET"
}

# ── Gradient banner ───────────────────────────────────────────────────────────
draw_banner() {
  clear 2>/dev/null || true
  echo

  local lines=(
    "  ██████╗   ██████╗     ███████╗ ██████╗ █████╗ ███████╗███████╗ ██████╗ ██╗     ██████╗ "
    "  ██╔══██╗ ██╔════╝     ██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝██╔═══██╗██║     ██╔══██╗"
    "  ██║  ██║ ██║  ███╗    ███████╗██║     ███████║█████╗  █████╗  ██║   ██║██║     ██║  ██║"
    "  ██║  ██║ ██║   ██║    ╚════██║██║     ██╔══██║██╔══╝  ██╔══╝  ██║   ██║██║     ██║  ██║"
    "  ██████╔╝ ╚██████╔╝    ███████║╚██████╗██║  ██║██║     ██║     ╚██████╔╝███████╗██████╔╝"
    "  ╚═════╝   ╚═════╝     ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝      ╚═════╝ ╚══════╝╚═════╝ "
  )

  local i=0
  for line in "${lines[@]}"; do
    local gi=$(( i % ${#G[@]} ))
    center_text "${G[$gi]}${BOLD}${line}${RESET}"
    i=$((i + 1))
  done

  echo
  center_text "${DIM}${WHITE}──── Quick setup for your 0G repo ────${RESET}"
  echo
}

# ── Section header ────────────────────────────────────────────────────────────
section() {
  echo
  hr_line "─" "$GRAY"
  center_text "${BOLD}${MAG}◆  $1${RESET}"
  hr_line "─" "$GRAY"
  echo
}

# ── Error / require ───────────────────────────────────────────────────────────
die() {
  printf "\n  ${RED}${BOLD}  ERROR ${RESET} ${RED}%s${RESET}\n\n" "$1" >&2
  exit 1
}
require() { command -v "$1" >/dev/null 2>&1 || die "'$1' not found in PATH."; }

# ── Modern spinner (inline, single-line overwrite) ────────────────────────────
spinner_frames=( "⣾" "⣽" "⣻" "⢿" "⡿" "⣟" "⣯" "⣷" )

spinner_run() {
  # Usage: spinner_run "Label text" command [args...]
  local label="$1"; shift

  local tmp
  tmp=$(mktemp)
  ( "$@" ) >"$tmp" 2>&1 &
  local pid=$!

  hide_cursor
  local i=0
  while kill -0 "$pid" 2>/dev/null; do
    local f="${spinner_frames[$(( i % ${#spinner_frames[@]} ))]}"
    printf "\r  ${CYAN}%s${RESET}  ${WHITE}%s${RESET}${DIM}…${RESET}  " "$f" "$label"
    i=$((i + 1))
    sleep 0.07
  done

  wait "$pid"
  local rc=$?
  show_cursor

  if [ "$rc" -eq 0 ]; then
    printf "\r  ${GREEN}${BOLD}✔${RESET}  ${WHITE}%s${RESET}                    \n" "$label"
    rm -f "$tmp"
    return 0
  else
    printf "\r  ${RED}${BOLD}✘${RESET}  ${RED}%s${RESET}                    \n" "$label"
    echo
    printf "  ${RED}${BOLD}─── command output ───${RESET}\n" >&2
    sed 's/^/    /' "$tmp" >&2
    printf "  ${RED}${BOLD}──────────────────────${RESET}\n" >&2
    rm -f "$tmp"
    return "$rc"
  fi
}

# ── Animated dots ─────────────────────────────────────────────────────────────
dots() {
  local msg="$1" n="${2:-3}"
  printf "  ${DIM}%s${RESET}" "$msg"
  for _ in $(seq 1 "$n"); do printf "."; sleep 0.10; done
  printf "\n"
}

# ── Stylish yes/no prompt ────────────────────────────────────────────────────
ask_yn() {
  local prompt="$1"
  local ans
  while true; do
    printf "  ${ORANGE}?${RESET} ${WHITE}%s${RESET} ${DIM}(y/n)${RESET} ${BOLD}›${RESET} " "$prompt"
    read -r ans
    ans="${ans,,}"
    case "$ans" in
      y|yes) return 0 ;;
      n|no)  return 1 ;;
      *) printf "    ${RED}↳ Please answer y or n.${RESET}\n" ;;
    esac
  done
}

# ═══════════════════════════════════════════════════════════════════════════════
#  Arrow-key multi-select checklist
#
#  Usage:  multi_select result_array_name  "Title"  label1 label2 label3 ...
#  Returns: result_array_name contains 0/1 per item (selected or not)
# ═══════════════════════════════════════════════════════════════════════════════
multi_select() {
  local -n _result=$1; shift
  local title="$1"; shift
  local options=("$@")
  local count=${#options[@]}

  # initialise selection state & cursor pos
  local -a sel
  for (( i=0; i<count; i++ )); do sel+=( 0 ); done
  local cur=0

  # helpers
  _draw_menu() {
    # move cursor up to top of menu to redraw
    if (( _drawn )); then printf '\033[%dA' "$((count + 2))"; fi

    printf "  ${BOLD}${CYAN}%s${RESET}  ${DIM}(↑↓ move · space toggle · enter confirm)${RESET}\n" "$title"
    printf "  ${GRAY}%s${RESET}\n" "$(printf '%.0s─' {1..52})"

    for (( i=0; i<count; i++ )); do
      local pointer="  "
      local check="${DIM}○${RESET}"
      local label_color="$WHITE"
      if (( i == cur )); then
        pointer="${CYAN}❯${RESET}"
        label_color="$BOLD$WHITE"
      fi
      if (( sel[i] )); then
        check="${GREEN}${BOLD}◉${RESET}"
      fi
      printf "  %b %b  %b%s%b\n" "$pointer" "$check" "$label_color" "${options[$i]}" "$RESET"
    done

    _drawn=1
  }

  local _drawn=0
  hide_cursor
  stty -echo 2>/dev/null || true
  _draw_menu

  while true; do
    # read a single keypress
    IFS= read -rsn1 key
    case "$key" in
      $'\x1b')
        read -rsn2 rest
        case "$rest" in
          '[A') (( cur > 0 )) && cur=$((cur - 1)) ;;            # up
          '[B') (( cur < count - 1 )) && cur=$((cur + 1)) ;;    # down
        esac
        ;;
      ' ')
        sel[$cur]=$(( 1 - sel[$cur] ))
        ;;
      ''|$'\n')
        break
        ;;
    esac
    _draw_menu
  done

  show_cursor
  stty echo 2>/dev/null || true

  _result=("${sel[@]}")
}

# ═══════════════════════════════════════════════════════════════════════════════
#  Styled text input prompt
# ═══════════════════════════════════════════════════════════════════════════════
prompt_input() {
  local label="$1"
  local varname="$2"
  printf "  ${ORANGE}✎${RESET} ${WHITE}%s${RESET} ${BOLD}›${RESET} " "$label"
  read -r "$varname"
}

# ═══════════════════════════════════════════════════════════════════════════════
#  Receipt card renderer
# ═══════════════════════════════════════════════════════════════════════════════
receipt_line() {
  local label="$1" value="$2" vcolor="${3:-$WHITE}"
  printf "  ${GRAY}│${RESET}  %-28s %b%-24s%b ${GRAY}│${RESET}\n" "$label" "$vcolor" "$value" "$RESET"
}

receipt_sep() {
  printf "  ${GRAY}├%s┤${RESET}\n" "$(printf '%.0s─' {1..54})"
}

receipt_header() {
  printf "  ${GRAY}┌%s┐${RESET}\n" "$(printf '%.0s─' {1..54})"
  printf "  ${GRAY}│${RESET}${BOLD}${WHITE}  %-52s${RESET}${GRAY}│${RESET}\n" "$1"
  printf "  ${GRAY}├%s┤${RESET}\n" "$(printf '%.0s─' {1..54})"
}

receipt_footer() {
  printf "  ${GRAY}└%s┘${RESET}\n" "$(printf '%.0s─' {1..54})"
}

bool_badge() {
  if [[ "$1" == "true" ]]; then
    printf "${GREEN}${BOLD} ✔ ON ${RESET}"
  else
    printf "${RED}${DIM} ✘ off${RESET}"
  fi
}

# ═══════════════════════════════════════════════════════════════════════════════
#  Success screen
# ═══════════════════════════════════════════════════════════════════════════════
success_screen() {
  echo
  hr_line "═" "$GREEN"
  echo
  center_text "${GREEN}${BOLD}  ✦  ALL DONE  ✦  ${RESET}"
  echo
  center_text "${WHITE}Your 0G project is scaffolded and ready to build.${RESET}"
  center_text "${DIM}cd into your project directory and run ${RESET}${CYAN}npm run dev${RESET}"
  echo
  hr_line "═" "$GREEN"
  echo
}

# ═══════════════════════════════════════════════════════════════════════════════
#                           M A I N   F L O W
# ═══════════════════════════════════════════════════════════════════════════════

draw_banner

# ── Prerequisites ─────────────────────────────────────────────────────────────
section "Prerequisites"
dots "Checking required tools" 4

require git
require node
require npm
require npx

printf "  ${GREEN}${BOLD}✔${RESET} ${WHITE}All tools available${RESET}\n"
printf "  ${DIM}Working directory: ${RESET}${CYAN}%s${RESET}\n" "$(pwd)"

# ── Variables (same as original) ──────────────────────────────────────────────
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
USE_SRC_DIR=true
USE_REACT_COMPILER=false

# ── Feature Selection (interactive multi-select) ─────────────────────────────
section "Feature Selection"

feature_sel=()
multi_select feature_sel "Select features to include" \
  "Include agentic materials for developing on 0G" \
  "Import developer modules"

[[ "${feature_sel[0]}" == "1" ]] && INCLUDE_AGENTIC=true
[[ "${feature_sel[1]}" == "1" ]] && IMPORT_DEV_MODULES=true

# ── Developer sub-modules ────────────────────────────────────────────────────
if $IMPORT_DEV_MODULES; then
  echo
  devmod_sel=()
  multi_select devmod_sel "Developer modules to scaffold" \
    "zkPoH scaffolding" \
    "iNFT stuff" \
    "Basic 0G compute scaffolding"

  [[ "${devmod_sel[0]}" == "1" ]] && INCLUDE_ZKPOH=true
  [[ "${devmod_sel[1]}" == "1" ]] && INCLUDE_INFT=true
  [[ "${devmod_sel[2]}" == "1" ]] && INCLUDE_0G_COMPUTE=true
fi

# ── Clone agentic materials ──────────────────────────────────────────────────
section "Scaffolding"

if $INCLUDE_AGENTIC; then
  spinner_run "Cloning agentic materials" git clone --depth 1 "$ZeroGSKILLSLINK"
else
  printf "  ${DIM}Skipping agentic clone (not selected).${RESET}\n"
fi

# ── Next.js / React scaffolding ──────────────────────────────────────────────
echo
ask_yn "Create a Next.js / React project?" && INSTALL_NEXTJS=true

if $INSTALL_NEXTJS; then
  echo
  PROJECT_NAME=""
  prompt_input "Project name" PROJECT_NAME
  [[ -z "$PROJECT_NAME" ]] && die "Project name cannot be empty."

  echo
  nextjs_sel=()
  multi_select nextjs_sel "Next.js options" \
    "TypeScript (recommended)" \
    "Tailwind CSS" \
    "ESLint" \
    "Use React Compiler (experimental)"

  [[ "${nextjs_sel[0]}" == "1" ]] && USE_TS=true
  [[ "${nextjs_sel[1]}" == "1" ]] && USE_TAILWIND=true
  [[ "${nextjs_sel[2]}" == "1" ]] && USE_ES_LINT=true
  [[ "${nextjs_sel[3]}" == "1" ]] && USE_REACT_COMPILER=true

  opts=()
  $USE_TS       && opts+=(--ts)        || opts+=(--js)
  $USE_TAILWIND && opts+=(--tailwind)  || opts+=(--no-tailwind)
  $USE_ES_LINT  && opts+=(--eslint)    || opts+=(--no-linter)

  opts+=(--yes)

  APP_NAME="0g-${PROJECT_NAME}"

  section "Creating Next.js App"
  spinner_run "Bootstrapping ${APP_NAME}" npx create-next-app@latest "$APP_NAME" "${opts[@]}"
fi

# ── Optional module setup ────────────────────────────────────────────────────
if $IMPORT_DEV_MODULES; then
  section "Module Setup"
spinner_run "Downloading modules" git clone --depth 1 https://github.com/Vegito2367/0g-modules.git

  if ! $INCLUDE_ZKPOH; then
    rm -rf 0g-modules/zkPOH
  fi
  if ! $INCLUDE_INFT; then
    rm -rf 0g-modules/iNFT
  fi
  if ! $INCLUDE_0G_COMPUTE; then
    rm -rf 0g-modules/0G-compute
  fi

  if $INCLUDE_0G_COMPUTE; then
    printf "${CYAN}↳${RESET} Setting up 0G compute scaffolding...\n"

    mkdir -p "$APP_NAME/app/api/0gcompute" && mv 0g-modules/0Gcompute/api/* $APP_NAME/app/api/
    mkdir -p "$APP_NAME/components" && mv 0g-modules/0Gcompute/components/* "$APP_NAME/components/"
    mv 0g-modules/0Gcompute/frontend/* "$APP_NAME/app/"

    echo "0G compute module files moved to project."
    echo "You can now import compute components from '@/components' and API routes are set up under /api/0gcompute."
    echo "There is a demo page at route /0gcompute."
  fi
  cd "$APP_NAME"
  echo "Changed directory to $APP_NAME"
  npm add @0glabs/0g-serving-broker ethers
fi

# ═══════════════════════════════════════════════════════════════════════════════
#  Receipt-style summary
# ═══════════════════════════════════════════════════════════════════════════════
section "Summary"

receipt_header "BUILD RECEIPT"
receipt_line "Agentic materials"      "$(bool_badge $INCLUDE_AGENTIC)"
receipt_line "Developer modules"      "$(bool_badge $IMPORT_DEV_MODULES)"
receipt_sep
receipt_line "  ├ zkPoH scaffolding"  "$(bool_badge $INCLUDE_ZKPOH)"
receipt_line "  ├ iNFT scaffolding"   "$(bool_badge $INCLUDE_INFT)"
receipt_line "  └ 0G compute"         "$(bool_badge $INCLUDE_0G_COMPUTE)"
receipt_sep
if $INSTALL_NEXTJS; then
  receipt_line "Next.js project"      "${CYAN}${APP_NAME}${RESET}"
  receipt_line "  TypeScript"         "$(bool_badge $USE_TS)"
  receipt_line "  Tailwind CSS"       "$(bool_badge $USE_TAILWIND)"
  receipt_line "  ESLint"             "$(bool_badge $USE_ES_LINT)"
  receipt_line "  src/ directory"     "$(bool_badge $USE_SRC_DIR)"
else
  receipt_line "Next.js project"      "${DIM}not created${RESET}"
fi
receipt_footer

# ── Final success screen ─────────────────────────────────────────────────────
success_screen
