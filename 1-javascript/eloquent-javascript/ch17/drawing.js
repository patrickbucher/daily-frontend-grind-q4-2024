const canvas = document.getElementsByTagName("canvas").item(0);
const cx = canvas.getContext("2d");
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Shapes
cx.fillStyle = "red";
cx.fillRect(10, 10, 100, 50);
cx.lineWidth = 5;
cx.strokeRect(115, 65, 100, 50);

// Paths
const coords = [];
for (let i = 0; i < 25; i++) {
  let x = Math.floor((Math.random() * WIDTH) / 2);
  let y = Math.floor((Math.random() * HEIGHT) / 2);
  coords.push({ x: x, y: y });
}
cx.lineWidth = 2;
cx.beginPath();
cx.moveTo(WIDTH / 2, HEIGHT / 4);
for (const p of coords) {
  cx.lineTo(p.x + WIDTH / 2, p.y);
}
cx.lineTo(WIDTH / 2, HEIGHT / 4);
cx.stroke();
cx.fillStyle = "yellow";
cx.fill();

// Quadratic Curve
cx.beginPath();
cx.moveTo(5, HEIGHT / 2);
cx.quadraticCurveTo(100, HEIGHT / 2, 200, HEIGHT / 2 + 100);
cx.lineTo(100, HEIGHT / 2);
cx.closePath();
cx.stroke();

// Bezier
cx.beginPath();
cx.moveTo(100, HEIGHT / 2 + 100);
cx.bezierCurveTo(
  150,
  HEIGHT / 2 + 50,
  200,
  HEIGHT / 2 + 100,
  300,
  HEIGHT / 2 + 200,
);
cx.lineTo(200, HEIGHT / 2 + 200);
cx.lineTo(300, HEIGHT / 2 + 300);
cx.closePath();
cx.stroke();

// Arc
cx.strokeStyle = "blue";
cx.beginPath();
cx.arc(WIDTH / 2, HEIGHT / 2, 128, 0, 2 * Math.PI);
cx.stroke();

// Pie Chart
const results = [
  { name: "Satisfied", count: 1043, color: "lightblue" },
  { name: "Neutral", count: 563, color: "lightgreen" },
  { name: "Unsatisfied", count: 510, color: "pink" },
  { name: "No comment", count: 175, color: "silver" },
];
const total = results.reduce((sum, {count}) => sum + count, 0);
let currentAngle = -0.5 * Math.PI;
const x = WIDTH / 2 + WIDTH / 4;
const y = HEIGHT / 2 + HEIGHT / 4;
const radius = HEIGHT / 5;
for (const result of results) {
  let sliceAngle = (result.count / total) * 2 * Math.PI;
  cx.beginPath();
  cx.arc(x, y, radius, currentAngle, currentAngle + sliceAngle);
  currentAngle += sliceAngle;
  cx.lineTo(x, y);
  cx.fillStyle = result.color; 
  cx.fill();
}

// Text
let tx = 16;
let ty = HEIGHT - HEIGHT / 12;
let h = HEIGHT / 12;
cx.font = `bold ${h}px Fantasque Sans Mono`;
cx.fillStyle = "fuchsia";
cx.fillText("Hello, World!", tx, ty);
