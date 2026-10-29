import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import TimeLog from "../../../domain/TimeLog";
import YearFilter from "./YearFilter";

function doneTimeLog(day: string): TimeLog {
  return new TimeLog({
    startTime: new Date(`${day}T08:00:00`),
    endTime: new Date(`${day}T16:00:00`),
  });
}

function renderFilter(timeLogs: TimeLog[]) {
  return (
    <YearFilter timeLogs={timeLogs}>
      {(filtered) => (
        <div data-testid="years">
          {filtered.map((t) => t.startTime.getFullYear()).join(",")}
        </div>
      )}
    </YearFilter>
  );
}

describe("<YearFilter />", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-28T18:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("defaults to the current year", () => {
    render(
      renderFilter([doneTimeLog("2025-05-05"), doneTimeLog("2026-05-05")])
    );

    expect(screen.getByTestId("years")).toHaveTextContent("2026");
  });

  it("keeps the selected year when the time logs change", () => {
    const { rerender } = render(
      renderFilter([doneTimeLog("2025-05-05"), doneTimeLog("2026-05-05")])
    );

    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(within(screen.getByRole("listbox")).getByText("2025"));
    expect(screen.getByTestId("years")).toHaveTextContent("2025");

    rerender(
      renderFilter([
        doneTimeLog("2025-05-05"),
        doneTimeLog("2026-05-05"),
        doneTimeLog("2026-06-06"),
      ])
    );

    expect(screen.getByTestId("years")).toHaveTextContent("2025");
  });

  it("falls back to the default if the selected year has no time logs", () => {
    const { rerender } = render(
      renderFilter([doneTimeLog("2025-05-05"), doneTimeLog("2026-05-05")])
    );

    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(within(screen.getByRole("listbox")).getByText("2025"));

    rerender(renderFilter([doneTimeLog("2026-05-05")]));

    expect(screen.getByTestId("years")).toHaveTextContent("2026");
  });
});
