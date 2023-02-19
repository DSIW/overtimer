import React, { ReactElement } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import DiagramContainer from "./DiagramContainer";

interface Props {
  title: string;
  children: ReactElement;
}

export default function DiagramCard({ title, children }: Props) {
  return (
    <Grid xs={12}>
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
          <DiagramContainer>{children}</DiagramContainer>
        </CardContent>
      </Card>
    </Grid>
  );
}
