import { Pencil, Trash2, MoreVertical } from "lucide-react";
import TimeLog from "../../domain/TimeLog";
import FormDialog from "../form/FormDialog";
import { timeLogApplicationService } from "../../application/TimeLogApplicationService";
import { useState } from "react";
import { useDropdown } from "../ui/useDropdown";
import { DropdownMenu, DropdownMenuItem } from "../ui/DropdownMenu";

interface Props {
  timeLog: TimeLog;
}

export default function TableRowActionButton({ timeLog }: Props) {
  const { open, setOpen, triggerRef, menuRef } =
    useDropdown<HTMLButtonElement>();
  const [editOpen, setEditOpen] = useState(false);

  async function handleDelete() {
    await timeLogApplicationService.delete(timeLog);
    setOpen(false);
  }

  function handleEdit() {
    setEditOpen(true);
    setOpen(false);
  }

  function handleClose() {
    setEditOpen(false);
  }

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Row actions"
        onClick={() => setOpen((current) => !current)}
        className="rounded-full p-2 text-content-secondary hover:bg-surface-secondary"
      >
        <MoreVertical size={20} />
      </button>
      <DropdownMenu open={open} menuRef={menuRef}>
        <DropdownMenuItem onClick={handleEdit} icon={<Pencil size={16} />}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          disabled={!timeLog.isDeletable()}
          icon={<Trash2 size={16} />}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenu>
      <FormDialog open={editOpen} timeLog={timeLog} onClose={handleClose} />
    </div>
  );
}
