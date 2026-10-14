import React, { Fragment, ReactElement, useEffect, useState } from "react";
import TimeLog from "../../../domain/TimeLog";
import _ from "lodash";
import YearSelect, { ALL_YEARS } from "./YearSelect";

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

  const currentYear = new Date().getFullYear();
  const defaultYear = years.includes(currentYear) ? currentYear : ALL_YEARS;

  const [yearFilter, setYearFilter] = useState("" + defaultYear);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYearFilter("" + defaultYear);
  }, [props.timeLogs, defaultYear]);

  const timeLogs = props.timeLogs.filter((timeLog) => {
    return (
      yearFilter === ALL_YEARS ||
      timeLog.startTime.getFullYear() === parseInt(yearFilter)
    );
  });

  function handleYearSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setYearFilter(event.target.value);
  }

  return (
    <Fragment>
      <div className="flex w-full items-center justify-end">
        <YearSelect
          value={yearFilter}
          onChange={handleYearSelect}
          years={years}
        />
      </div>
      {props.children(timeLogs)}
    </Fragment>
  );
}
