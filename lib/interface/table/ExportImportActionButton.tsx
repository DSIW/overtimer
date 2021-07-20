import { IconButton, Menu, MenuItem, ListItemIcon } from '@material-ui/core'
import { GetApp, Publish, MoreVert } from '@material-ui/icons'
import TimeLog from '../../domain/TimeLog'
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
    try {
      const options = {
        suggestedName: `${format(new Date(), 'yyyy-MM-dd-HH:mm')}_overtimer.json`,
        types: [
          {
            description: 'JSON Files',
            accept: {
              'application/json': ['.json'],
            },
          },
        ],
      };
      // @ts-ignore
      const fileHandle = await window.showSaveFilePicker(options)
      await new TimeLogsFile().write(fileHandle, timeLogs)
      popupState.close()
    } catch(error) {
      console.error(error)
    }
  }

  async function handleImport() {
    // @ts-ignore
    const [fileHandle] = await window.showOpenFilePicker()
    const timeLogs = await new TimeLogsFile().read(fileHandle)
    console.log(timeLogs)
    await exportImportApplicationService.import(timeLogs)
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
