import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import React, { Fragment, ReactElement, useState } from "react";
import TimeLog from "../../../domain/TimeLog";
import _ from "lodash";
import YearSelect from "./YearSelect";
import { Box } from "@mui/material";

interface Props {
  timeLogs: TimeLog[];
  children: (timeLogs: TimeLog[]) => ReactElement;
}

export default function YearFilter(props: Props) {
  const years = _.reverse(
    _.uniq(
      props.timeLogs.map((timeLog) => {
        return timeLog.startTime.getFullYear();
      })
    )
  );

  const [yearFilter, setYearFilter] = useState("all");

  const timeLogs = props.timeLogs.filter((timeLog) => {
    return (
      yearFilter === "all" ||
      timeLog.startTime.getFullYear() === parseInt(yearFilter)
    );
  });

  function handleYearSelect(event: SelectChangeEvent) {
    setYearFilter(event.target.value);
  }

  return (
    <Fragment>
      <Box
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          width: "100%",
        }}
      >
        <YearSelect
          value={yearFilter}
          onChange={handleYearSelect}
          years={years}
        />
      </Box>
      {props.children(timeLogs)}
    </Fragment>
  );
}
