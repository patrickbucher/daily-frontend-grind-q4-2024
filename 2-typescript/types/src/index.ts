type state = "missing" | "available" | "raw" | "parsed";
type inputState<T extends state> = T extends "available"
  ? T extends "raw"
    ? string
    : number
  : Object;

let missing: inputState<"missing"> = {};
let unparsed: inputState<"raw"> = "123";
let parsed: inputState<"parsed"> = 123;
