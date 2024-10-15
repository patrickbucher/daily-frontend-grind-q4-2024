const balloonEmoji = "🎈";
const explosionEmoji = "💥";
const container = document.querySelector("#balloon");

const maxSize = 800;
let fontSizePx = 50;
let balloonNode = document.createTextNode(balloonEmoji);

container.appendChild(balloonNode);
container.style.fontSize = `${fontSizePx}px`;

function handle(event) {
  if (event.key == "ArrowUp") {
    fontSizePx = Math.floor(1.1 * fontSizePx);
    if (fontSizePx > maxSize) {
      container.removeChild(balloonNode);
      document.removeEventListener("keydown", handle);
      container.appendChild(document.createTextNode(explosionEmoji));
    }
  } else if (event.key == "ArrowDown") {
    fontSizePx = Math.floor(0.9 * fontSizePx);
  }
  container.style.fontSize = `${fontSizePx}px`;
}

document.addEventListener("keydown", handle);
