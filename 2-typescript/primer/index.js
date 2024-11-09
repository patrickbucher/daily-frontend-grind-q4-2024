let object = {
  label: "y",
  getOutput() {
    return (value) => console.log(`${this.label}=${value}`);
  },
};

label = "x";

let outputReference = object.getOutput(); // invoked on object
outputReference(11);

let getOutput = object.getOutput;
let outputStandAlone = getOutput(); // invoked on global
outputStandAlone(11);
