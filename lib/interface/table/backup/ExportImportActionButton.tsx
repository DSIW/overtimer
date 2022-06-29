import { IconButton, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { GetApp, MoreVert } from "@mui/icons-material";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import { exportImportApplicationService } from "../../../application/ExportImportApplicationService";
import ImportButton from "../ImportButton";
import { ChangeEvent } from "react";
import { useSnackbar } from "notistack";
import * as Sentry from "@sentry/browser";

export default function ExportImportActionButton() {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "ExportImportActionButton",
  });

  const { enqueueSnackbar } = useSnackbar();

  async function handleExport() {
    try {
      await exportImportApplicationService.exportAllTimeLogs();
      popupState.close();
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
      enqueueSnackbar("Export failed!", { variant: "error" });
    }
  }

  async function handleImport(event: ChangeEvent) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const file = event.target.files[0];
      await exportImportApplicationService.importFile(file);
      enqueueSnackbar("Import was successful!", { variant: "success" });
      popupState.close();
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
      enqueueSnackbar("Import failed!", { variant: "error" });
    }
  }

  return <>
    <IconButton {...bindTrigger(popupState)} size="large">
      <MoreVert />
    </IconButton>
    <Menu {...bindMenu(popupState)}>
      <MenuItem onClick={handleExport}>
        <ListItemIcon>
          <GetApp fontSize="small" />
        </ListItemIcon>
        Export
      </MenuItem>
      <ImportButton onClick={handleImport} />
    </Menu>
  </>;
}
