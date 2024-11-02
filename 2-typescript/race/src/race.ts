import { Driver } from "./driver.js";

type DriverCounts = {
  total: number;
  active: number;
};

export class Race {
  private driverMap = new Map<number, Driver>();

  constructor(
    public track: string,
    public laps: number,
    drivers: Driver[] = [],
  ) {
    drivers.forEach((d) => this.driverMap.set(d.id, d));
  }

  addDriver(name: string, retired: boolean = false): number {
    const maxId = Math.max(...this.driverMap.keys());
    const newId = maxId + 1;
    this.driverMap.set(newId, new Driver(newId, name, retired));
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
