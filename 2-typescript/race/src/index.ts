import { Driver } from "./driver.js";
import { Race } from "./race.js";
import inquirer from "inquirer";

const drivers: Driver[] = [
  new Driver(1, "Freddie Fuel"),
  new Driver(2, "Eddie Engine"),
  new Driver(3, "Walter Wheel"),
];
const race: Race = new Race("Detroit City Speedwary", 48, drivers);

race.addDriver("Tommy Tardy");
race.addDriver("Joey Baloney");
race.addDriver("Boney Jaloney");

enum Commands {
  Add = "Add New Driver",
  Retire = "Retire a Driver",
  Toggle = "Show/Hide Retired Drivers",
  Purge = "Remove Retired Drivers",
  Quit = "Quit",
}

let showRetired = true;
promptUser();

function displayDrivers(): void {
  console.log(
    `Race at ${race.track} over ${race.laps} laps. ` +
      `${race.getDriverCounts().active} drivers active.`,
  );
  race
    .getDrivers(showRetired)
    .forEach((driver) => console.log(driver.describe()));
}

function promptUser(): void {
  console.clear();
  displayDrivers();
  inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose Option",
      choices: Object.values(Commands),
    })
    .then((answers) => {
      switch (answers["command"]) {
        case Commands.Toggle:
          showRetired = !showRetired;
          promptUser();
          break;
        case Commands.Add:
          promptAdd();
          break;
        case Commands.Retire:
          if (race.getDriverCounts().active > 0) {
            promptRetire();
          } else {
            promptUser();
          }
          break;
        case Commands.Purge:
          race.removeRetired();
          promptUser();
          break;
      }
    });
}

function promptAdd(): void {
  console.clear();
  inquirer
    .prompt({
      type: "input",
      name: "add",
      message: "Enter Driver: ",
    })
    .then((answers) => {
      if (answers["add"] !== "") {
        race.addDriver(answers["add"]);
      }
      promptUser();
    });
}

function promptRetire(): void {
  console.clear();
  inquirer
    .prompt({
      type: "checkbox",
      name: "retired",
      message: "Retire Driver: ",
      choices: race.getDrivers(showRetired).map((driver) => ({
        name: driver.name,
        value: driver.id,
        checked: driver.retired,
      })),
    })
    .then((answers) => {
      let retiredDrivers = answers["retired"] as number[];
      race
        .getDrivers(true)
        .forEach((driver) =>
          race.markRetired(
            driver.id,
            retiredDrivers.find((id) => id === driver.id) != undefined,
          ),
        );
      promptUser();
    });
}
