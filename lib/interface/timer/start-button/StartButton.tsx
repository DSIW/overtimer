import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { PlayArrow } from "@material-ui/icons";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { bindPopper } from "material-ui-popup-state";
import { anchorRef } from "material-ui-popup-state/core";

interface Props {
  color: "primary" | "secondary";
  onStart: () => void;
  onExtendedStart: () => void;
}

export default function StartButton({
  color,
  onStart,
  onExtendedStart,
}: Props) {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "ActionMenu",
  });

  function handleMenuItemClick() {
    onExtendedStart();
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
        <Button startIcon={<PlayArrow fontSize="large" />} onClick={onStart}>
          Start
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
                <MenuItem onClick={handleMenuItemClick}>
                  Start with time
                </MenuItem>
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
