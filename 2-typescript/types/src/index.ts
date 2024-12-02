const enum State { Running, Sleeping, Waiting, Starting, Stopping }

let state: State = State.Waiting;
let label: string = State[state];
