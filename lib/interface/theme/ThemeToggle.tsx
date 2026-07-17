import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "./useDarkMode";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setIsDark((current) => !current)}
      className="fixed top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-border-primary bg-surface-primary text-content-secondary shadow-card transition-colors hover:text-accent"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
