import React from "react";
import Page from "../../lib/interface/layout/Page";
import { useLiveQuery } from "dexie-react-hooks";
import { timeLogApplicationService } from "../../lib/application/TimeLogApplicationService";
import TimeLog from "../../lib/domain/TimeLog";
import YearFilter from "../../lib/interface/analysis/filter/YearFilter";
import Analysis from "../../lib/interface/analysis/Analysis";

export default function AnalysisPage() {
  const timeLogs = useLiveQuery(
    () => timeLogApplicationService.getAllTimeLogs(),
    [],
    [] as TimeLog[]
  );

  return (
    <Page>
      <YearFilter timeLogs={timeLogs}>
        {(timeLogs) => <Analysis timeLogs={timeLogs} />}
      </YearFilter>
    </Page>
  );
}
