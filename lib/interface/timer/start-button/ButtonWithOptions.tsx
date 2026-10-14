import React, { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import Button, { ButtonColor } from "../../ui/Button";
import { useDropdown } from "../../ui/useDropdown";
import { DropdownMenu, DropdownMenuItem } from "../../ui/DropdownMenu";

interface Props {
  color: ButtonColor;
  onClick: () => void;
  startIcon?: ReactNode;
  children: string;
  options: Option[];
}

export interface Option {
  key: string;
  name: string;
  onClick: () => Promise<void>;
}

export default function ButtonWithOptions({
  color,
  startIcon,
  onClick,
  options,
  children,
}: Props) {
  const { open, setOpen, triggerRef, menuRef } =
    useDropdown<HTMLButtonElement>();

  async function handleMenuItemClick(option: Option) {
    setOpen(false);
    await option.onClick();
  }

  return (
    <div className="relative inline-block">
      <div className="inline-flex" role="group" aria-label="split button">
        <Button
          color={color}
          startIcon={startIcon}
          onClick={onClick}
          className="rounded-r-none"
        >
          {children}
        </Button>
        <Button
          ref={triggerRef}
          color={color}
          onClick={() => setOpen((current) => !current)}
          className="rounded-l-none border-l-0 px-2"
          aria-label="More start options"
        >
          <ChevronDown size={18} />
        </Button>
      </div>
      <DropdownMenu open={open} menuRef={menuRef} align="left">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.key}
            onClick={() => handleMenuItemClick(option)}
          >
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenu>
    </div>
  );
}
