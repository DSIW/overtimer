import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TimeLog from "../../domain/TimeLog";
import TimeLogTable from "./TimeLogTable";

const { totalCount } = vi.hoisted(() => ({ totalCount: { value: 0 } }));

vi.mock("../hooks/useTimeLogCount", () => ({
  useTimeLogCount: () => totalCount.value,
}));
vi.mock("./backup/ExportImportActionButton", () => ({
  default: () => null,
}));
vi.mock("./TimeLogTableRow", () => ({
  default: () => (
    <tr>
      <td>time log</td>
    </tr>
  ),
}));

function doneTimeLog(day: string): TimeLog {
  return new TimeLog({
    startTime: new Date(`${day}T08:00:00`),
    endTime: new Date(`${day}T16:00:00`),
  });
}

describe("<TimeLogTable />", () => {
  it("reports the stored time logs that are not shown as outdated", () => {
    totalCount.value = 5;
    const shown = [doneTimeLog("2026-10-27"), doneTimeLog("2026-10-28")];

    render(
      <TimeLogTable
        timeLogs={shown}
        timeRangeOptionId="w8"
        onTimeRangeOptionChange={() => undefined}
      />
    );

    expect(screen.getAllByText("time log")).toHaveLength(2);
    expect(screen.getByText(/3 time logs are outdated\./)).toBeInTheDocument();
  });

  it("reports nothing as outdated if every stored time log is shown", () => {
    totalCount.value = 2;
    const shown = [doneTimeLog("2026-10-27"), doneTimeLog("2026-10-28")];

    render(
      <TimeLogTable
        timeLogs={shown}
        timeRangeOptionId="w8"
        onTimeRangeOptionChange={() => undefined}
      />
    );

    expect(screen.queryByText(/outdated/)).toBeNull();
  });
});
