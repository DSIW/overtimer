import parseMs from "../../interface/parse-ms";
import { round } from "lodash";

export default class Duration {
  constructor(private milliseconds: number) {}

  getFormatted(withSeconds = false): string {
    const { days, hours, minutes, seconds } = parseMs(this.milliseconds);

    const parts = [];

    if (days !== 0) {
      parts.push(`${days} d`);
    }

    if (hours !== 0) {
      parts.push(`${hours} h`);
    }

    if (minutes !== 0) {
      parts.push(`${minutes} m`);
    }

    if ((hours === 0 && minutes === 0) || withSeconds) {
      parts.push(`${seconds} s`);
    }

    return parts.join(" ") || "0 s";
  }

  getFormattedHours(): string {
    const hours = this.milliseconds / 1000 / 60 / 60;
    return `${round(hours, 1)} h`;
  }
}
