import { Item } from "./item.js";

class Coordinates {
  constructor(
    public latitude: number,
    public longitude: number,
  ) {}

  toString(): string {
    return `${this.latitude};${this.longitude}`;
  }
}

const dilbert: Item<number> = new Item<number>(317, "Dilbert");
const stapler: Item<string> = new Item<string>("a3-v5-x7", "Stapler");
const chorweiler: Item<Coordinates> = new Item<Coordinates>(
  new Coordinates(51.028679, 6.89476),
  "Chorweiler",
);

console.log(dilbert.describe());
console.log(stapler.describe());
console.log(chorweiler.describe());
