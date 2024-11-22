export function roundTo(value: number, granularity: number): number {
  const factor = 1.0 / granularity;
  const scaledUp = value * factor;
  const rounded = Math.round(scaledUp);
  const scaledDown = rounded / factor;
  return scaledDown;
}
