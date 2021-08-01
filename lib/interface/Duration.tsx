import parseMs from "./parse-ms";

interface Props {
  milliseconds: number;
  zero?: string;
}

export default function Duration({ milliseconds, zero = "0 s" }: Props) {
  const { hours, minutes, seconds } = parseMs(milliseconds);

  let parts = [];

  if (hours !== 0) {
    parts.push(`${hours} h`);
  }

  if (minutes !== 0) {
    parts.push(`${minutes} m`);
  }

  if (seconds !== 0 && hours === 0 && minutes === 0) {
    parts.push(`${seconds} s`);
  }

  return <span>{parts.join(" ") || zero}</span>;
}
