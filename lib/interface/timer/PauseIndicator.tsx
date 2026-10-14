import { Coffee } from "lucide-react";
import DomainDuration from "../../domain/analysis/Duration";

interface Props {
  milliseconds: number;
}

export default function PauseIndicator({ milliseconds }: Props) {
  const formatted = new DomainDuration(milliseconds).getFormatted(true);

  return (
    <span
      aria-label={`pause ${formatted}`}
      className="mt-6 inline-flex animate-[pause-fade-in_0.4s_ease-out] items-center gap-1.5 rounded-full bg-surface-secondary px-3 py-1 text-sm text-accent motion-reduce:animate-none"
    >
      <Coffee aria-hidden="true" size={16} />
      <span className="tabular-nums">{formatted}</span>
    </span>
  );
}
