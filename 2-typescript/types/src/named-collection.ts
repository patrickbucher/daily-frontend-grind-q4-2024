class NamedCollection<T extends { name: string }> {
  private items: T[];

  constructor() {
    this.items = new Array();
  }

  add(item: T) {
    this.items.push(item);
  }

  getNames(): string[] {
    return this.items.map((i) => i.name);
  }
}

type Named = { name: string };

class Dog {
  constructor(
    public name: string,
    public race: string,
  ) {}
}

class Company {
  constructor(
    public name: string,
    public revenue: number,
  ) {}
}

const myStuff: NamedCollection<Named> = new NamedCollection<Named>();
myStuff.add(new Dog("Doge", "Pitbull"));
myStuff.add(new Company("ACME Inc.", 1_359_725.39));
console.log(myStuff.getNames());
