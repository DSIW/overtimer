import { Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { ReactNode } from "react";
import Link from "next/link";

interface Props {
  title: ReactNode;
  children: ReactNode;
  href?: string;
}

export default function StatisticsCard({ title, children, href }: Props) {
  const content = (
    <div>
      <Typography
        color="textSecondary"
        gutterBottom
        sx={{
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
        }}
      >
        {title}
        {href && <ChevronRight fontSize="small" />}
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

  if (!href) {
    return content;
  }

  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      {content}
    </Link>
  );
}
