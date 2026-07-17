import { ReactNode } from "react";

type Severity = "info" | "warning" | "success" | "danger";

interface Props {
  severity: Severity;
  title?: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

const SEVERITY_CLASSES: Record<Severity, string> = {
  info: "border-info/30 bg-info/10 text-info",
  warning: "border-warning/30 bg-warning/10 text-warning",
  success: "border-success/30 bg-success/10 text-success",
  danger: "border-danger/30 bg-danger/10 text-danger",
};

export default function Alert({
  severity,
  title,
  action,
  className,
  children,
}: Props) {
  return (
    <div
      role="alert"
      className={`flex items-start justify-between gap-3 border px-4 py-3 text-sm ${SEVERITY_CLASSES[severity]} ${className ?? ""}`}
    >
      <div>
        {title && <div className="mb-1 font-semibold">{title}</div>}
        <div>{children}</div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
