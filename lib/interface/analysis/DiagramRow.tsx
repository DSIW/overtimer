import React, { ReactNode } from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  title: string;
  children: ReactNode;
}

export default function DiagramRow({ title, children }: Props) {
  return (
    <Card
      style={{
        width: "100%",
      }}
    >
      <CardContent>
        <Typography
          variant={"h5"}
          color="text.secondary"
          gutterBottom
          marginBottom="2rem"
          textTransform="uppercase"
          fontWeight={300}
        >
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
