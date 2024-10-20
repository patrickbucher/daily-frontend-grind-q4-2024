const canvas = document.getElementsByTagName("canvas").item(0);
const cx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let catImg = document.createElement("img");
catImg.src = "./cat.png";

let mouseImg = document.createElement("img");
mouseImg.src = "./mouse.png";

let dogImg = document.createElement("img");
dogImg.src = "./dog.png";

catImg.addEventListener("load", () => {
  let factor = 0.1;
  let start = 10;
  let max = 800;
  for (let x = start; x < max; x += 40) {
    factor = x / max;
    cx.drawImage(catImg, x, 10, catImg.width * factor, catImg.height * factor);
    cx.drawImage(
      mouseImg,
      x,
      300,
      mouseImg.width * factor,
      mouseImg.height * factor,
    );
    cx.drawImage(dogImg, x, 500, dogImg.width * factor, dogImg.height * factor);
  }
});
