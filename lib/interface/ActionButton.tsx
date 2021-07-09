import { IconButton, Menu, MenuItem, ListItemIcon } from '@material-ui/core'
import { DeleteOutlined, EditOutlined, MoreVert } from '@material-ui/icons'
import TimeLog from '../domain/TimeLog'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'

export type Action = "delete" | "edit"

interface Props {
  timeLog: TimeLog;
  onAction: (action: Action, timeLog: TimeLog) => void;
}

export default function ActionButton({ timeLog, onAction }: Props) {

  const popupState = usePopupState({ variant: 'popover', popupId: 'ActionMenu' })

  function handleAction(action: Action) {
    return () => {
      onAction(action, timeLog)
      popupState.close()
    }
  }

  return (
    <>
      <IconButton {...bindTrigger(popupState)}>
        <MoreVert />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={handleAction('edit')}>
          <ListItemIcon>
            <EditOutlined fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleAction('delete')} disabled={timeLog.isRunning()}>
          <ListItemIcon>
            <DeleteOutlined fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}
