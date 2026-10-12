import { Box, Chip } from "@mui/material";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import DomainDuration from "../../domain/analysis/Duration";

interface Props {
  milliseconds: number;
}

export default function PauseIndicator({ milliseconds }: Props) {
  const formatted = new DomainDuration(milliseconds).getFormatted(true);

  return (
    <Chip
      size="small"
      icon={<FreeBreakfastIcon />}
      aria-label={`pause ${formatted}`}
      label={
        <Box component="span" sx={{ fontVariantNumeric: "tabular-nums" }}>
          {formatted}
        </Box>
      }
      sx={{
        mt: "1.5rem",
        color: "primary.main",
        bgcolor: "action.hover",
        "& .MuiChip-icon": { color: "primary.main" },
        "@keyframes pause-fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        animation: "pause-fade-in 0.4s ease-out",
        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
      }}
    />
  );
}
