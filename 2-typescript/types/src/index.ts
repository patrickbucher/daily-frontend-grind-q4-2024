class Employee {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  describe(): string {
    return `${this.id}: ${this.name}`;
  }
}

let employees: Employee[] = [
  new Employee(1, "Dilbert"),
  new Employee(2, "Alice"),
  new Employee(3, "Wally"),
];
