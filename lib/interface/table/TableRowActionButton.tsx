import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { DeleteOutlined, EditOutlined, MoreVert } from "@mui/icons-material";
import TimeLog from "../../domain/TimeLog";
import FormDialog from "../form/FormDialog";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { timeLogApplicationService } from "../../application/TimeLogApplicationService";
import { useState } from "react";

interface Props {
  timeLog: TimeLog;
}

export default function TableRowActionButton({ timeLog }: Props) {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "TableRowActionButton",
  });
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    await timeLogApplicationService.delete(timeLog);
    popupState.close();
  }

  function handleEdit() {
    setOpen(true);
    popupState.close();
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <IconButton {...bindTrigger(popupState)} size="large">
        <MoreVert />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditOutlined fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} disabled={!timeLog.isDeletable()}>
          <ListItemIcon>
            <DeleteOutlined fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <FormDialog open={open} timeLog={timeLog} onClose={handleClose} />
    </>
  );
}
