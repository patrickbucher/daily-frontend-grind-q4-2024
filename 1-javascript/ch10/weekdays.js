const names = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function getName(date) {
  return names[date.getDay()];
}

export function getDay(name) {
  return names.indexOf(date.getDay());
}
