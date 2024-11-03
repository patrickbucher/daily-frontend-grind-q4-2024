import { Driver } from "./driver.js";
import { Race } from "./race.js";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

type schemaType = {
  drivers: {
    id: number;
    name: string;
    retired: boolean;
  }[];
};

export class PersistentRace extends Race {
  private database: LowSync<schemaType>;

  constructor(
    public track: string,
    public laps: number,
    drivers: Driver[] = [],
  ) {
    super(track, laps, []);
    this.database = new LowSync(new JSONFileSync("race.json"));
    this.database.read();
    if (this.database.data == null) {
      this.database.data = { drivers: drivers };
      this.database.write();
      drivers.forEach((driver) => this.driverMap.set(driver.id, driver));
    } else {
      this.database.data.drivers.forEach((driver) =>
        this.driverMap.set(
          driver.id,
          new Driver(driver.id, driver.name, driver.retired),
        ),
      );
    }
  }

  addDriver(name: string, retired: boolean = false): number {
    let result = super.addDriver(name, retired);
    this.storeDrivers();
    return result;
  }

  markRetired(id: number, retired: boolean): void {
    super.markRetired(id, retired);
    this.storeDrivers();
  }

  removeRetired(): void {
    super.removeRetired();
    this.storeDrivers();
  }

  private storeDrivers() {
    this.database.data.drivers = [...this.driverMap.values()];
    this.database.write();
  }
}
