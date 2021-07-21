import { IconButton, Menu, MenuItem, ListItemIcon } from '@material-ui/core'
import { GetApp, MoreVert } from '@material-ui/icons'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import { exportImportApplicationService } from '../../application/ExportImportApplicationService'
import { format } from 'date-fns'
import TimeLogsFile from '../../infrastructure/TimeLogsFile'
import ImportButton from './ImportButton'
import { ChangeEvent } from 'react'
import { useSnackbar } from 'notistack';
import * as Sentry from '@sentry/browser';

export type Action = "export" | "import"

interface Writable {
  write: (content: string) => void;
  close: () => void;
}

interface FileHandle {
  createWritable: () => Promise<Writable>;
}

export default function ExportImportActionButton() {

  const popupState = usePopupState({ variant: 'popover', popupId: 'ActionMenu' })

  const { enqueueSnackbar } = useSnackbar();

  async function handleExport() {
    const timeLogs = await exportImportApplicationService.getAllTimeLogs()

    const fileName = `${format(new Date(), 'yyyy-MM-dd_HH-mm')}_overtimer.json`;

    try {
      await new TimeLogsFile().write(fileName, timeLogs)
      popupState.close()
    } catch(error) {
      console.error(error)
      Sentry.captureException(error);
      enqueueSnackbar('Export failed!', { variant: 'error' });
    }
  }

  async function handleImport(event: ChangeEvent) {
    try {
      // @ts-ignore
      const file = event.target.files[0]
      const timeLogs = await new TimeLogsFile().read(file)
      if (timeLogs.length > 0) {
        await exportImportApplicationService.import(timeLogs)
      }
      enqueueSnackbar('Export was successful!', { variant: 'success' });
      popupState.close()
    } catch(error) {
      console.error(error)
      Sentry.captureException(error);
      enqueueSnackbar('Import failed!', { variant: 'error' });
    }
  }

  return (
    <>
      <IconButton {...bindTrigger(popupState)}>
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
    </>
  )
}
