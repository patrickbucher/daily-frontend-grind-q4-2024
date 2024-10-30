import { Driver } from "./driver";

export class Race {
  private nextId: number = 0;

  constructor(
    public track: string,
    public laps: number,
    public drivers: Driver[] = [],
  ) {}

  addDriver(name: string, retired: boolean = false): number {
    const maxId = Math.max(...this.drivers.map((d) => d.id));
    const newId = maxId + 1;
    this.drivers.push(new Driver(newId, name, retired));
    this.nextId = newId + 1;
    return newId;
  }

  getDriverById(id: number): Driver {
    return this.drivers.find((d) => d.id === id);
  }

  markRetired(id: number, retired: boolean) {
    const driver = this.getDriverById(id);
    if (driver) {
      driver.retired = retired;
    }
  }
}
