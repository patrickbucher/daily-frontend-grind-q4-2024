import { Driver } from "./driver";
import { Race } from "./race";

const drivers: Driver[] = [
  new Driver(1, "Freddie Fuel"),
  new Driver(2, "Eddie Engine"),
  new Driver(3, "Walter Wheel"),
];
const race: Race = new Race("Detroit City Speedwary", 48, drivers);

const lateEntrantId: number = race.addDriver("Tommy Tardy");
const lateEntrant: Driver = race.getDriverById(lateEntrantId);

const crashed: Driver = race.getDriverById(2);
race.markRetired(crashed.id, true);

race.getDrivers(false).forEach((d) => console.log(d.describe()));
console.log(race.getDriverCounts(), "before removing retired");
race.removeRetired();
console.log(race.getDriverCounts(), "after removing retired");
