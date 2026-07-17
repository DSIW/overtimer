import { ReactNode, Ref } from "react";

interface MenuProps {
  open: boolean;
  menuRef: Ref<HTMLDivElement>;
  align?: "left" | "right";
  children: ReactNode;
}

export function DropdownMenu({
  open,
  menuRef,
  align = "right",
  children,
}: MenuProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      role="menu"
      className={`absolute top-full z-10 mt-1 min-w-40 overflow-hidden rounded-md border border-border-primary bg-surface-primary py-1 shadow-elevated ${
        align === "right" ? "right-0" : "left-0"
      }`}
    >
      {children}
    </div>
  );
}

interface ItemProps {
  onClick: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export function DropdownMenuItem({
  onClick,
  disabled,
  icon,
  children,
}: ItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={onClick}
      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-content-primary hover:bg-surface-secondary disabled:cursor-not-allowed disabled:text-content-tertiary disabled:hover:bg-transparent"
    >
      {icon}
      {children}
    </button>
  );
}
