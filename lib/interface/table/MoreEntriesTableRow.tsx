import { visibleTimeRangeOptions } from "../../domain/time-constants";
import SpannedTableRow from "./SpannedTableRow";

interface Props {
  count: number;
  timeRangeOptionId: string;
  onTimeRangeOptionChange: (optionId: string) => void;
}

export default function MoreEntriesTableRow({
  count,
  timeRangeOptionId,
  onTimeRangeOptionChange,
}: Props) {
  return (
    <SpannedTableRow>
      {count > 0 && <>{count} time logs are outdated. </>}
      Showing time logs for{" "}
      <select
        value={timeRangeOptionId}
        onChange={(event) => onTimeRangeOptionChange(event.target.value)}
        style={{
          border: "none",
          background: "transparent",
          color: "inherit",
          font: "inherit",
          cursor: "pointer",
        }}
      >
        {visibleTimeRangeOptions().map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      .
    </SpannedTableRow>
  );
}
