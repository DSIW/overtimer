import parseMs from "../../interface/parse-ms";

export default class Duration {
  constructor(private milliseconds: number) {
  }

  getFormatted(): string {
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

    if (seconds !== 0 && hours === 0 && minutes === 0) {
      parts.push(`${seconds} s`);
    }

    return parts.join(" ") || "0 s";
  }
}