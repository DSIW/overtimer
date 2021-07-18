import { IconButton, Menu, MenuItem, ListItemIcon } from '@material-ui/core'
import { DeleteOutlined, EditOutlined, MoreVert } from '@material-ui/icons'
import TimeLog from '../../domain/TimeLog'
import FormDialog from '../form/FormDialog'
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

export default function TableRowActionButton({ timeLog, onAction }: Props) {

  const popupState = usePopupState({ variant: 'popover', popupId: 'ActionMenu' })
  const dialogState = usePopupState({ variant: 'popover', popupId: 'Dialog' })

  function handleAction(action: Action) {
    return () => {
      if (action === 'edit') {
        dialogState.open()
      }
      onAction(action, timeLog)
      popupState.close()
    }
  }

  function handleCancel() {
    onAction('edit', timeLog)
    dialogState.close()
  }

  function handleSubmit(timeLog: TimeLog) {
    onAction('edit', timeLog)
    dialogState.close()
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
        <MenuItem onClick={handleAction('delete')} disabled={!timeLog.isDeletable()}>
          <ListItemIcon>
            <DeleteOutlined fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <FormDialog open={dialogState.isOpen} timeLog={timeLog} onCancel={handleCancel} onSubmit={handleSubmit} />
    </>
  )
}
