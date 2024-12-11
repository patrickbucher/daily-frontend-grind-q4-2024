class Product {
  dimensions: Dimensions;

  constructor(
    public name: string,
    public inStock: boolean,
  ) {
    this.dimensions = new Dimensions();
  }

  addDimension(name: string, value: number) {
    this.dimensions[name] = value;
  }
}

class Dimensions {
  [propertyName: string]: number;
}

let monitor: Product = new Product("Monitor", true);
monitor.addDimension("height", 30.5);
monitor.addDimension("width", 55.3);
monitor.addDimension("weight", 5.4);
monitor.addDimension("price", 399.99);

for (let property of Object.keys(monitor.dimensions)) {
  console.log(`${property}:\t${monitor.dimensions[property]}`);
}

console.log(monitor.dimensions.height);
