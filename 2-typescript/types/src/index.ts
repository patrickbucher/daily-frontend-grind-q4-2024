import { Body, Rectangle, Square, Circle } from "./shapes.js";

let rectangle: Rectangle = new Rectangle(4, 3);
let square: Square = new Square(3);
let circle: Circle = new Circle(5);

console.log(rectangle.circumference(), rectangle.area());
console.log(square.circumference(), square.area());
console.log(circle.circumference().toFixed(2), circle.area().toFixed(2));

let cuboid: Body<Rectangle> = new Body(rectangle, 5);
let cube: Body<Square> = new Body(square, 4);
let cylinder: Body<Circle> = new Body(circle, 3);

console.log(cuboid.volume());
console.log(cube.volume());
console.log(cylinder.volume().toFixed(2));
