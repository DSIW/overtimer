import { Download, MoreVertical } from "lucide-react";
import { exportImportApplicationService } from "../../../application/ExportImportApplicationService";
import ImportButton from "../ImportButton";
import { ChangeEvent } from "react";
import { useSnackbar } from "notistack";
import * as Sentry from "@sentry/browser";
import { useDropdown } from "../../ui/useDropdown";
import { DropdownMenu, DropdownMenuItem } from "../../ui/DropdownMenu";

export default function ExportImportActionButton() {
  const { open, setOpen, triggerRef, menuRef } =
    useDropdown<HTMLButtonElement>();

  const { enqueueSnackbar } = useSnackbar();

  async function handleExport() {
    try {
      await exportImportApplicationService.exportAllTimeLogs();
      setOpen(false);
    } catch (error) {
      Sentry.captureException(error);
      enqueueSnackbar("Export failed!", { variant: "error" });
    }
  }

  async function handleImport(event: ChangeEvent<HTMLInputElement>) {
    try {
      const file = event.target.files?.[0];
      if (!file) return;
      await exportImportApplicationService.importFile(file);
      enqueueSnackbar("Import was successful!", { variant: "success" });
      setOpen(false);
    } catch (error) {
      Sentry.captureException(error);
      enqueueSnackbar("Import failed!", { variant: "error" });
    }
  }

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Backup actions"
        onClick={() => setOpen((current) => !current)}
        className="rounded-full p-2 text-content-secondary hover:bg-surface-secondary"
      >
        <MoreVertical size={20} />
      </button>
      <DropdownMenu open={open} menuRef={menuRef}>
        <DropdownMenuItem onClick={handleExport} icon={<Download size={16} />}>
          Export
        </DropdownMenuItem>
        <ImportButton onClick={handleImport} />
      </DropdownMenu>
    </div>
  );
}
