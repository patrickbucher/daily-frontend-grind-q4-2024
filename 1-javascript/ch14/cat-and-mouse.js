let cat = document.getElementById("cat");
let mouse = document.getElementById("mouse");
let angle = Math.PI / 2;

function animate(time, lastTime) {
  if (lastTime != null) {
    angle += (time - lastTime) * 0.001;
  }
  mouse.style.top = 128 + -Math.sin(angle) * 256 + "px";
  mouse.style.left = -Math.cos(angle) * 512 + "px";
  cat.style.top = 128 + Math.sin(angle) * 256 + "px";
  cat.style.left = Math.cos(angle) * 512 + "px";
  requestAnimationFrame((newTime) => animate(newTime, time));
}
requestAnimationFrame(animate);
