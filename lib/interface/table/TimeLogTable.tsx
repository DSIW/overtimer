import TimeLog from "../../domain/TimeLog";
import EmptyTableRow from "./EmptyTableRow";
import ExportImportActionButton from "./backup/ExportImportActionButton";
import TimeLogTableRow from "./TimeLogTableRow";
import BackupInfoTableRow from "./backup/BackupInfoTableRow";
import React from "react";
import { useTimeLogCount } from "../hooks/useTimeLogCount";
import MoreEntriesTableRow from "./MoreEntriesTableRow";

interface Props {
  timeLogs: TimeLog[];
  weekLimit: number;
  onWeekLimitChange: (weeks: number) => void;
}

export default function TimerLogTable({
  timeLogs,
  weekLimit,
  onWeekLimitChange,
}: Props) {
  const totalCount = useTimeLogCount();
  const hiddenTimeLogCount = totalCount - timeLogs.length;

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border-primary bg-surface-primary shadow-card">
      <table className="min-w-[400px] max-w-[95vw] border-collapse">
        <thead>
          <tr className="border-b border-border-primary">
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-content-secondary">
              Date
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-content-secondary">
              Duration
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-content-secondary">
              <ExportImportActionButton />
            </th>
          </tr>
          <BackupInfoTableRow timeLogs={timeLogs} />
        </thead>
        <tbody>
          {timeLogs.length === 0 && <EmptyTableRow />}
          {timeLogs.map((timeLog: TimeLog) => (
            <TimeLogTableRow
              key={`${timeLog.startTime}-${timeLog.endTime}`}
              timeLog={timeLog}
            />
          ))}
          <MoreEntriesTableRow
            count={hiddenTimeLogCount}
            weekLimit={weekLimit}
            onWeekLimitChange={onWeekLimitChange}
          />
        </tbody>
      </table>
    </div>
  );
}
