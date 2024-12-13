import { Body, Circle, Rectangle, Square } from "./shapes.js";

let rectangle: Rectangle = new Rectangle(4, 3);
let square: Square = new Square(3);
let circle: Circle = new Circle(5);

console.log(
  `rectangle circumference: ${rectangle.circumference()};`,
  `rectangle area: ${rectangle.area()}`,
);
console.log(
  `square circumference: ${square.circumference()};`,
  `square area: ${square.area()}`,
);
console.log(
  `circle circumference: ${circle.circumference().toFixed(2)};`,
  `circle area: ${circle.area().toFixed(2)}`,
);

let cuboid: Body<Rectangle> = new Body(rectangle, 5);
let cube: Body<Square> = new Body(square, 4);
let cylinder: Body<Circle> = new Body(circle, 3);

console.log(`cuboid volume: ${cuboid.volume()}`);
console.log(`cube volume: ${cube.volume()}`);
console.log(`cylinder volume: ${cylinder.volume().toFixed(2)}`);
