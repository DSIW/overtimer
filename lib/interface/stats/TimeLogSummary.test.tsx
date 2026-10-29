import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TimeLog from "../../domain/TimeLog";
import TimeLogSummary from "./TimeLogSummary";

function doneTimeLog(start: string, end: string): TimeLog {
  return new TimeLog({ startTime: new Date(start), endTime: new Date(end) });
}

describe("<TimeLogSummary />", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-28T18:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows week overtime although total overtime is zero", () => {
    // last week: 7h (-1h), today: 9h (+1h) => total 0, this week +1h
    const timeLogs = [
      doneTimeLog("2026-10-20T08:00:00", "2026-10-20T15:00:00"),
      doneTimeLog("2026-10-28T08:00:00", "2026-10-28T17:00:00"),
    ];

    render(<TimeLogSummary timeLogs={timeLogs} />);

    expect(screen.getByText("week overtime")).toBeInTheDocument();
  });

  it("hides week overtime if there is none this week", () => {
    const timeLogs = [
      doneTimeLog("2026-10-20T08:00:00", "2026-10-20T17:00:00"),
    ];

    render(<TimeLogSummary timeLogs={timeLogs} />);

    expect(screen.queryByText("week overtime")).toBeNull();
  });
});
