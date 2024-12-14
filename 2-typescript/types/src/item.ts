export class Item<T> {
  constructor(
    public id: T,
    public name: string,
  ) {}

  describe(): string {
    return `${this.id}: ${this.name}`;
  }
}
