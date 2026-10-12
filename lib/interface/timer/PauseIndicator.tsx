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
        <Box component="span" sx={{ display: "inline-flex", gap: 0.75 }}>
          <Box
            component="span"
            aria-hidden
            sx={{
              alignSelf: "center",
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: "primary.main",
              animation: "pause-pulse 2s ease-in-out infinite",
              "@keyframes pause-pulse": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.25 },
              },
              "@media (prefers-reduced-motion: reduce)": { animation: "none" },
            }}
          />
          <Box component="span" sx={{ fontVariantNumeric: "tabular-nums" }}>
            {formatted}
          </Box>
        </Box>
      }
      sx={{
        mt: 0.5,
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
