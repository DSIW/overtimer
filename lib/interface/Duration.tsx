import { Box } from "@mui/material";
import DomainDuration from "../domain/analysis/Duration";

interface Props {
  milliseconds: number;
  zero?: string;
}

export default function Duration({ milliseconds, zero = "0 s" }: Props) {
  if (Math.abs(milliseconds) < 1000) {
    return <span>{zero}</span>;
  }

  const formatted = new DomainDuration(milliseconds).getFormatted();

  if (milliseconds < 0) {
    return (
      <Box component="span" sx={{ color: "error.main" }}>
        {formatted}
      </Box>
    );
  }

  return <span>{formatted}</span>;
}
