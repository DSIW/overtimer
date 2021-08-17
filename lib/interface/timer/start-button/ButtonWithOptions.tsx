import React, { ReactNode } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { bindPopper } from "material-ui-popup-state";
import { anchorRef } from "material-ui-popup-state/core";

interface Props {
  color: "primary" | "secondary";
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
  const popupState = usePopupState({
    variant: "popover",
    popupId: "ActionMenu",
  });

  async function handleMenuItemClick(option: Option) {
    popupState.close();
    await option.onClick();
  }

  return (
    <>
      <ButtonGroup
        variant="outlined"
        color={color}
        ref={anchorRef(popupState)}
        aria-label="split button"
      >
        <Button startIcon={startIcon} onClick={onClick}>
          {children}
        </Button>
        <Button size="small" {...bindTrigger(popupState)}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper transition disablePortal {...bindPopper(popupState)}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <MenuList id="split-button-menu">
                {options.map((option) => (
                  <MenuItem
                    key={option.key}
                    onClick={() => handleMenuItemClick(option)}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
