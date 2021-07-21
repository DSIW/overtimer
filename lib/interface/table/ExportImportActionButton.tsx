import { IconButton, Menu, MenuItem, ListItemIcon } from '@material-ui/core'
import { GetApp, Publish, MoreVert } from '@material-ui/icons'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import { exportImportApplicationService } from '../../application/ExportImportApplicationService'
import { format } from 'date-fns'
import TimeLogsFile from '../../infrastructure/TimeLogsFile'

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

  async function handleExport() {
    const timeLogs = await exportImportApplicationService.getAllTimeLogs()

    const fileName = `${format(new Date(), 'yyyy-MM-dd_HH-mm')}_overtimer.json`;

    try {
      await new TimeLogsFile().write(fileName, timeLogs)
      popupState.close()
    } catch(error) {
      console.error(error)
    }
  }

  async function handleImport() {
    const timeLogs = await new TimeLogsFile().read()
    if (timeLogs.length > 0) {
      await exportImportApplicationService.import(timeLogs)
    }
    popupState.close()
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
        <MenuItem onClick={handleImport}>
          <ListItemIcon>
            <Publish fontSize="small" />
          </ListItemIcon>
          Import
        </MenuItem>
      </Menu>
    </>
  )
}
