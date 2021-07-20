import { SEC, MIN, HOUR } from "../domain/time-constants";

export default function parseMs(milliseconds: number) {
  return {
    days: Math.trunc(milliseconds / (24*HOUR)),
    hours: Math.trunc(milliseconds / HOUR) % 24,
    minutes: Math.trunc(milliseconds / MIN) % 60,
    seconds: Math.trunc(milliseconds / SEC) % 60,
    milliseconds: Math.trunc(milliseconds) % 1000,
  }
}