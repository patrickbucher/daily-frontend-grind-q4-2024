export class Driver {
  // no additional field declaration required

  public constructor(
    public id: number,
    public name: string,
    public retired: boolean = false,
  ) {
    // no manual initialization required
  }

  public describe(): string {
    return `${this.id}\t${this.name}\t${this.retired ? "[r]" : "[ ]"}`;
  }
}
