import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

export type ButtonColor = "primary" | "secondary";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  startIcon?: ReactNode;
  fullWidth?: boolean;
}

const COLOR_CLASSES: Record<ButtonColor, string> = {
  primary: "border-accent text-accent hover:bg-accent/10",
  secondary: "border-danger text-danger hover:bg-danger/10",
};

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { color = "primary", startIcon, fullWidth, className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
        COLOR_CLASSES[color]
      } ${fullWidth ? "w-full" : ""} ${className ?? ""}`}
      {...props}
    >
      {startIcon}
      {children}
    </button>
  );
});

export default Button;
