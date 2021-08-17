import React, { useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

interface Props {
  options: string[];
  open: boolean;
  onClick: (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: string
  ) => void;
}

export default function StartButtonMenu(props: Props) {
  const { onClick, options } = props;

  // TODO: from props
  const [open, setOpen] = useState(props.open);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    option: string
  ) => {
    onClick(event, option);
    setOpen(false);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    // setOpen(false);
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
    >
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
                    key={option}
                    onClick={(event) => handleClick(event, option)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
