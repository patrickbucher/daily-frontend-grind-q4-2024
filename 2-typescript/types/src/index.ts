class Collection<T> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  filter<V extends T>(): V[] {
    return this.items.filter((i) => i instanceof V) as V[];
  }
}
