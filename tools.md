# Deno

Install `deno` (on Arch Linux):

    sudo pacman -S deno

Load a file (`script.js`) to be used in the REPL:

    deno repl --eval-file=script.js

# Formatting

## Prettier

Install `prettier` (on Arch Linux):

    sudo pacman -S prettier

Format a file (`script.js`) in-place:

    prettier -w script.js

## Deno

Install `deno` (on Arch Linux):

    sudo pacman -S deno

Format a file (`script.js`) in-place:

    deno fmt script.js

Format the files in the current directory in-place:

    deno fmt
