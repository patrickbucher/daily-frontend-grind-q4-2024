const canvas = document.getElementsByTagName("canvas").item(0);
const cx = canvas.getContext("2d");

let spritesImg = document.createElement("img");
spritesImg.src = "./doomguy-sprites.png";

const COLS = 6;
const ROWS = 5;
const WIDTH = 642;
const HEIGHT = 688;
const PART_WIDTH = Math.floor(Math.round(WIDTH / COLS));
const PART_HEIGHT = Math.floor(Math.round(HEIGHT / ROWS));
const INTERVAL = 500;
const DRAW_WIDTH = PART_WIDTH * 4;
const DRAW_HEIGHT = PART_HEIGHT * 4;

spritesImg.addEventListener("load", () => {
  let index = 0;
  setInterval(() => {
    let col = Math.floor(index / COLS);
    let row = index - col * COLS;
    cx.clearRect(0, 0, DRAW_WIDTH, DRAW_HEIGHT);
    let xOffset = row * PART_WIDTH;
    let yOffset = col * PART_HEIGHT;
    cx.drawImage(
      spritesImg,
      xOffset,
      yOffset,
      PART_WIDTH,
      PART_HEIGHT,
      0,
      0,
      DRAW_WIDTH,
      DRAW_HEIGHT,
    );
    index = (index + 1) % (ROWS * COLS);
  }, INTERVAL);
});
