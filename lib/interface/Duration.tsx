import DomainDuration from "../domain/analysis/Duration";

interface Props {
  milliseconds: number;
  zero?: string;
}

export default function Duration({ milliseconds, zero = "0 s" }: Props) {
  if (milliseconds < 1000) {
    return <span>{zero}</span>;
  }

  const formatted = new DomainDuration(milliseconds).getFormatted();

  return <span>{formatted}</span>;
}
