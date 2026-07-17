import { Square } from "lucide-react";
import Button from "../ui/Button";

interface Props {
  color: "primary" | "secondary";
  onClick: () => void;
}

export default function StopButton({ color, onClick }: Props) {
  return (
    <Button
      color={color}
      onClick={onClick}
      startIcon={<Square size={22} />}
      fullWidth
    >
      Stop
    </Button>
  );
}
