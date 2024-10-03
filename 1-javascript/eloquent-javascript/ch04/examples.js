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
