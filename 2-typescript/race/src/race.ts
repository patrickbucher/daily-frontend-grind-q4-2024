import { Driver } from "./driver.js";

type DriverCounts = {
  total: number;
  active: number;
};

export class Race {
  private nextId: number = 0;
  private driverMap = new Map<number, Driver>();

  constructor(
    public track: string,
    public laps: number,
    public drivers: Driver[] = [],
  ) {
    drivers.forEach((d) => this.driverMap.set(d.id, d));
  }

  addDriver(name: string, retired: boolean = false): number {
    const maxId = Math.max(...this.drivers.map((d) => d.id));
    const newId = maxId + 1;
    this.driverMap.set(newId, new Driver(newId, name, retired));
    this.nextId = newId + 1;
    return newId;
  }

  getDriverById(id: number): Driver {
    return this.driverMap.get(id);
  }

  markRetired(id: number, retired: boolean) {
    const driver = this.getDriverById(id);
    if (driver) {
      driver.retired = retired;
    }
  }

  getDrivers(includeRetired: boolean): Driver[] {
    return [...this.driverMap.values()].filter(
      (d) => !d.retired || includeRetired,
    );
  }

  removeRetired() {
    this.driverMap.forEach((d) => {
      if (d.retired) {
        this.driverMap.delete(d.id);
      }
    });
  }

  getDriverCounts(): DriverCounts {
    return {
      total: this.driverMap.size,
      active: this.getDrivers(false).length,
    };
  }
}
