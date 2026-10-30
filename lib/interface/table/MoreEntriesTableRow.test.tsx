import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import MoreEntriesTableRow from "./MoreEntriesTableRow";

// The selectable quarters are computed from the date the module is loaded,
// so the clock is set before any import (Sun, 2026-05-17, in Q2).
vi.hoisted(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(2026, 4, 17, 12, 0, 0));
});

function renderRow(
  count: number,
  onTimeRangeOptionChange: (optionId: string) => void = () => undefined
) {
  return render(
    <table>
      <tbody>
        <MoreEntriesTableRow
          count={count}
          timeRangeOptionId="w8"
          onTimeRangeOptionChange={onTimeRangeOptionChange}
        />
      </tbody>
    </table>
  );
}

describe("<MoreEntriesTableRow />", () => {
  afterAll(() => {
    vi.useRealTimers();
  });

  it("reports hidden time logs as outdated", () => {
    renderRow(3);

    expect(screen.getByText(/3 time logs are outdated\./)).toBeInTheDocument();
  });

  it("does not mention outdated time logs if none are hidden", () => {
    renderRow(0);

    expect(screen.queryByText(/outdated/)).toBeNull();
  });

  it("shows the selected time range", () => {
    renderRow(0);

    expect(screen.getByRole("combobox")).toHaveValue("w8");
  });

  it("offers every week range, this year and only quarters that have started", () => {
    renderRow(0);

    const values = within(screen.getByRole("combobox"))
      .getAllByRole("option")
      .map((option) => option.getAttribute("value"));
    expect(values).toEqual([
      "w4",
      "w8",
      "w12",
      "w26",
      "w52",
      "ytd",
      "q1",
      "q2",
    ]);
  });

  it("selects a selectable time range", () => {
    const onChange = vi.fn();
    renderRow(0, onChange);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "q2" },
    });

    expect(onChange).toHaveBeenCalledWith("q2");
  });
});
