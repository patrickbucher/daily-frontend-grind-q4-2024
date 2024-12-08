abstract class Animal {
  constructor(public name: string) {}

  describe(): string {
    return `I'm ${this.name} the ${this.species()} and I make «${this.noise()}».`;
  }

  abstract species(): string;
  abstract noise(): string;
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }

  species(): string {
    return "Horse";
  }

  noise(): string {
    return "Neigh";
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }

  species(): string {
    return "Cat";
  }

  noise(): string {
    return "Meow";
  }
}

let animals: Animal[] = [new Horse("Betty"), new Cat("Dimka")];
animals.forEach((a) => console.log(a.describe()));
