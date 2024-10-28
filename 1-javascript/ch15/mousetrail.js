const cat = document.getElementById("cat");
const mouse = document.getElementById("mouse");
let dist = 0;
document.addEventListener("mousemove", (event) => {
  dist++;
  cat.style.left = `${event.clientX - 0.5 * cat.width - dist}px`;
  cat.style.top = `${event.clientY - 0.5 * cat.height - dist}px`;
  mouse.style.left = `${event.clientX + dist}px`;
  mouse.style.top = `${event.clientY + dist}px`;
});
