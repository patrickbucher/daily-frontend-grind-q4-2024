"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const driver_1 = require("./driver");
const race_1 = require("./race");
const drivers = [
    new driver_1.Driver(1, "Freddie Fuel"),
    new driver_1.Driver(2, "Eddie Engine"),
    new driver_1.Driver(3, "Walter Wheel"),
];
const race = new race_1.Race("Detroit City Speedwary", 48, drivers);
const lateEntrantId = race.addDriver("Tommy Tardy");
const lateEntrant = race.getDriverById(lateEntrantId);
const crashed = race.getDriverById(2);
race.markRetired(crashed.id, true);
for (const driver of race.drivers) {
    console.log(driver.describe());
}
