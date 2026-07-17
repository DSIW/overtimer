import { Upload } from "lucide-react";
import ChangeEvent from "../form/ChangeEvent";
import { DropdownMenuItem } from "../ui/DropdownMenu";

interface Props {
  onClick: (event: ChangeEvent) => void;
}

export default function ImportButton({ onClick }: Props) {
  async function handleClick() {
    const file = document.getElementById("file");
    if (file) {
      file.click();
    }
  }

  return (
    <>
      <DropdownMenuItem onClick={handleClick} icon={<Upload size={16} />}>
        Import
      </DropdownMenuItem>
      <input
        type="file"
        id="file"
        accept="application/json"
        className="hidden"
        onChange={onClick}
      />
    </>
  );
}
