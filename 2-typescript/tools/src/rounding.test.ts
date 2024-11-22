import { roundTo } from "./rounding";

test("check round to cents", () => {
  expect(roundTo(10.0 / 3.0, 0.01)).toBe(3.33);
});

test("check round to nickels", () => {
  expect(roundTo(10.0 / 3.0, 0.05)).toBe(3.35);
});

test("check round to dimes", () => {
  expect(roundTo(10.0 / 3.0, 0.1)).toBe(3.3);
});
