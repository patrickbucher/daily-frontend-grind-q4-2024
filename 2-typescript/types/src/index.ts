type Employee = {
  id: number;
  name: string;
  salary: number;
};

type Product = {
  id: number;
  name: string;
  price: number;
};

let dilbert: Employee = { id: 745, name: "Dilbert", salary: 100000 };
let alice: Employee = { id: 931, name: "Alice", salary: 90000 };
let stapler: Product = { id: 4529, name: "stapler", price: 8.35 };
let chair: Product = { id: 7826, name: "chair", price: 249.99 };

let assets: (Product | Employee)[] = [dilbert, stapler, alice, chair];

function isEmployee(expr: any): expr is Employee {
  return "salary" in expr;
}

function isProduct(expr: any): expr is Product {
  return "price" in expr;
}

for (let asset of assets) {
  if (isEmployee(asset)) {
    console.log(`${asset.id}: ${asset.name} earns ${asset.salary}`);
  } else if (isProduct(asset)) {
    console.log(`${asset.id}: ${asset.name} costs ${asset.price}`);
  }
}
