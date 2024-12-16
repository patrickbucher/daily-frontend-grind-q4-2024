type WithArea = { area(): number };
type WithHeight = { height: number };

class ShapeConverter<T extends WithArea> {
  constructor(private withArea: T) {}

  volume<U extends WithHeight>(withHeight: U): number {
    return this.withArea.area() * withHeight.height;
  }
}

const rect = {
  a: 3,
  b: 4,
  area: function (): number {
    return this.a * this.b;
  },
};
const height = {
  height: 5,
};
const conv = new ShapeConverter(rect);
console.log(conv.volume(height));
