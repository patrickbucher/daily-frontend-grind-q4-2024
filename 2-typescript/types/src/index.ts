class Product {
  dimensions: Dimensions;

  constructor(
    public name: string,
    public inStock: boolean,
  ) {}

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
