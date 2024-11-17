export default function roundTo(value, granularity) {
  const factor = 1.0 / granularity;
  const scaledUp = value * factor;
  const rounded = Math.round(scaledUp);
  const scaledDown = rounded / factor;
  return scaledDown;
}

export function roundToNickels(value) {
  return roundTo(value, 0.05);
}

export function roundToDimes(value) {
  return roundTo(value, 0.1);
}
