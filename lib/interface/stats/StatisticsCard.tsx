import { Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  children: ReactNode;
}

export default function StatisticsCard({ title, children }: Props) {
  return (
    <div>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="body2"
        component="p"
        align="right"
        color="primary"
        style={{ fontSize: "1.3rem" }}
      >
        {children}
      </Typography>
    </div>
  );
}
