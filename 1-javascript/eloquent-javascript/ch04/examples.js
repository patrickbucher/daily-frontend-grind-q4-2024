let person = {
  firstName: "Patrick",
  lastName: "Bucher",
  yearOfBirth: 1987,
  heightInCm: 188,
  weightInKg: 76.0,
};

delete person.heightInCm;
delete person.weightInKg;

Object.assign(person, { profession: "Programmer", country: "Switzerland" });

for (const key of Object.keys(person)) {
  const value = person[key];
  console.log(`${key}:\t${value}`);
}

function sum(...numbers) {
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return sum;
}

const numbers = [4, 5, 6];
const moreNumbers = [1, 2, 3, ...numbers, 7, 8, 9];
console.log(moreNumbers);

const physique = {
  weightKg: 76.0,
  heightCm: 188,
};

const name = {
  firstName: "Patrick",
  lastName: "Bucher",
};

const combined = {
  age: 36,
  ...name,
  ...physique,
  country: "Switzerland",
};

console.log(combined);

const house = {
  kitchen: {
    cupboard: {
      cutlery: { knives: 3, forks: 4, spoons: 5 },
    },
  },
};

const hell = {
  kitchen: {
    pot: {
      cooking: ["Todd", "Tucker", "Dylan"],
    },
  },
};

console.log(house.kitchen.cupboard.cutlery);
console.log(house?.kitchen?.cupboard?.cutlery);

console.log(hell.kitchen.cupboard?.cutlery);
console.log(hell?.kitchen?.cupboard?.cutlery);

const serialized = JSON.stringify(combined);
console.log(serialized);
const deserialized = JSON.parse(serialized);
console.log(deserialized);
