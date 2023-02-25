import React, { ReactNode } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { usePopupState } from "material-ui-popup-state/hooks";
import { bindPopper, anchorRef, bindTrigger } from "material-ui-popup-state";
import { ClickAwayListener } from "@mui/material";

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
    popupId: "ButtonWithOptions",
  });

  async function handleMenuItemClick(option: Option) {
    handleClose();
    await option.onClick();
  }

  function handleClose() {
    popupState.close();
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
              <ClickAwayListener onClickAway={handleClose}>
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
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
