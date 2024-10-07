import { getName as getWeekDayName } from "./weekdays.js";

const now = new Date();
const day = getWeekDayName(now);
console.log(`Today is ${day}.`);
