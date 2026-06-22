import { WEEK_LIMIT_OPTIONS } from "../../domain/time-constants";
import SpannedTableRow from "./SpannedTableRow";

interface Props {
  count: number;
  weekLimit: number;
  onWeekLimitChange: (weeks: number) => void;
}

export default function MoreEntriesTableRow({
  count,
  weekLimit,
  onWeekLimitChange,
}: Props) {
  return (
    <SpannedTableRow>
      {count > 0 && <>{count} time logs are outdated after </>}
      {count <= 0 && <>Showing time logs of the last </>}
      <select
        value={weekLimit}
        onChange={(event) => onWeekLimitChange(Number(event.target.value))}
        style={{
          border: "none",
          background: "transparent",
          color: "inherit",
          font: "inherit",
          cursor: "pointer",
        }}
      >
        {WEEK_LIMIT_OPTIONS.map((weeks) => (
          <option key={weeks} value={weeks}>
            {weeks}
          </option>
        ))}
      </select>{" "}
      weeks.
    </SpannedTableRow>
  );
}
