import { fireEvent, render, screen } from "@testing-library/react";
import { setHours } from "date-fns";
import { vi } from "vitest";
import TimeLog from "../../domain/TimeLog";
import FormDialog from "./FormDialog";
import { timeLogApplicationService } from "../../application/TimeLogApplicationService";

vi.mock("../../application/TimeLogApplicationService", () => ({
  timeLogApplicationService: { update: vi.fn() },
}));

function doneTimeLog(): TimeLog {
  const startTime = setHours(new Date(), 8).setMinutes(0, 0, 0);
  const endTime = setHours(new Date(), 12).setMinutes(0, 0, 0);
  return new TimeLog({
    startTime: new Date(startTime),
    endTime: new Date(endTime),
  });
}

describe("<FormDialog />", () => {
  it("does not save while the form shows an error", () => {
    render(<FormDialog open timeLog={doneTimeLog()} />);

    fireEvent.change(screen.getByLabelText("Start"), {
      target: { value: "09:00" },
    });
    fireEvent.change(screen.getByLabelText("End"), {
      target: { value: "08:00" },
    });

    const save = screen.getByRole("button", { name: "Save" });
    expect(save).toBeDisabled();
    fireEvent.click(save);
    expect(timeLogApplicationService.update).not.toHaveBeenCalled();
  });
});

describe("<FormDialog /> with a fixed now", () => {
  // now: Wed, 2026-10-28 10:00
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-28T10:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("saves the edited start and end of a done time log", () => {
    const timeLog = new TimeLog({
      id: 1,
      startTime: new Date("2026-10-27T08:00:00"),
      endTime: new Date("2026-10-27T12:00:00"),
    });
    render(<FormDialog open timeLog={timeLog} />);

    fireEvent.change(screen.getByLabelText("Start"), {
      target: { value: "09:00" },
    });
    fireEvent.change(screen.getByLabelText("End"), {
      target: { value: "13:30" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(timeLogApplicationService.update).toHaveBeenCalledTimes(1);
    const saved = vi.mocked(timeLogApplicationService.update).mock.calls[0][0];
    expect(saved.id).toBe(1);
    expect(saved.startTime).toEqual(new Date("2026-10-27T09:00:00"));
    expect(saved.endTime).toEqual(new Date("2026-10-27T13:30:00"));
  });

  it("offers only the start for a running time log", () => {
    const timeLog = new TimeLog({
      id: 1,
      startTime: new Date("2026-10-28T09:00:00"),
    });
    render(<FormDialog open timeLog={timeLog} />);

    expect(screen.getByLabelText("Start")).toBeInTheDocument();
    expect(screen.queryByLabelText("End")).toBeNull();
  });

  it("starts the timer with an earlier start time today", () => {
    // "Start with time": the log was started now, the dialog back-dates it
    const timeLog = new TimeLog({
      id: 1,
      startTime: new Date("2026-10-28T10:00:00"),
    });
    render(<FormDialog open timeLog={timeLog} />);

    fireEvent.change(screen.getByLabelText("Start"), {
      target: { value: "08:30" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(timeLogApplicationService.update).toHaveBeenCalledTimes(1);
    const saved = vi.mocked(timeLogApplicationService.update).mock.calls[0][0];
    expect(saved.startTime).toEqual(new Date("2026-10-28T08:30:00"));
    expect(saved.isRunning()).toBe(true);
  });

  it("does not start the timer with a start time in the future", () => {
    const timeLog = new TimeLog({
      id: 1,
      startTime: new Date("2026-10-28T10:00:00"),
    });
    render(<FormDialog open timeLog={timeLog} />);

    fireEvent.change(screen.getByLabelText("Start"), {
      target: { value: "11:00" },
    });

    const save = screen.getByRole("button", { name: "Save" });
    expect(save).toBeDisabled();
    fireEvent.click(save);
    expect(timeLogApplicationService.update).not.toHaveBeenCalled();
  });
});
