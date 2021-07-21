import { MenuItem, ListItemIcon } from '@material-ui/core'
import { Publish } from '@material-ui/icons'
import ChangeEvent from '../form/ChangeEvent'

interface Props {
  onClick: (event: ChangeEvent) => void;
}

export default function ImportButton({ onClick }: Props) {

  async function handleClick() {
    const file = document.getElementById("file")
    file && file.click()
  }

  return (
    <>
        <MenuItem onClick={handleClick}>
          <ListItemIcon>
            <Publish fontSize="small" />
          </ListItemIcon>
          Import
        </MenuItem>
        <input type="file" id="file" accept="application/json" style={{ display: 'none' }} onChange={onClick} />
    </>
  )
}
