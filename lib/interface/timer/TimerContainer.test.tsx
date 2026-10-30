import { fireEvent, render, screen, within } from "@testing-library/react";
import { vi } from "vitest";
import TimeLog from "../../domain/TimeLog";
import TimerContainer from "./TimerContainer";

const { start, stop, notification } = vi.hoisted(() => ({
  start: vi.fn(),
  stop: vi.fn(),
  notification: vi.fn(),
}));

vi.mock("../../application/TimerApplicationService", () => ({
  timerApplicationService: { start, stop },
}));
vi.mock("./useTimerNotification", () => ({
  default: notification,
}));
vi.mock("../hooks/useTimeLogs", () => ({
  useTimeLogs: () => [],
}));

function running(start: string): TimeLog {
  return new TimeLog({ id: 1, startTime: new Date(start) });
}

function done(start: string, end: string): TimeLog {
  return new TimeLog({
    id: 2,
    startTime: new Date(start),
    endTime: new Date(end),
  });
}

function lastNotification(): [boolean, string] {
  return notification.mock.calls.at(-1) as [boolean, string];
}

describe("<TimerContainer />", () => {
  // now: Wed, 2026-10-28 12:00
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-28T12:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  describe("start and stop", () => {
    it("starts the timer if no time log is running", () => {
      render(
        <TimerContainer
          timeLogs={[done("2026-10-28T08:00:00", "2026-10-28T10:00:00")]}
        />
      );

      expect(screen.queryByRole("button", { name: /Stop/ })).toBeNull();
      fireEvent.click(screen.getByRole("button", { name: /Start/ }));

      expect(start).toHaveBeenCalledTimes(1);
      expect(stop).not.toHaveBeenCalled();
    });

    it("offers starting with a time if no time log is running", () => {
      render(<TimerContainer timeLogs={[]} />);

      const startOptions = within(
        screen.getByRole("group", { name: "split button" })
      ).getAllByRole("button")[1];
      fireEvent.click(startOptions);
      fireEvent.click(
        screen.getByRole("menuitem", { name: "Start with time" })
      );

      expect(start).toHaveBeenCalledTimes(1);
    });

    it("stops the running time log instead of starting another one", () => {
      const log = running("2026-10-28T08:00:00");
      render(<TimerContainer timeLogs={[log]} />);

      expect(screen.queryByRole("button", { name: /Start/ })).toBeNull();
      fireEvent.click(screen.getByRole("button", { name: /Stop/ }));

      expect(stop).toHaveBeenCalledWith(log);
      expect(start).not.toHaveBeenCalled();
    });
  });

  describe("timer display", () => {
    it("shows the remaining time of today", () => {
      // 2h done + 1h running = 3h worked
      const timeLogs = [
        running("2026-10-28T11:00:00"),
        done("2026-10-28T08:00:00", "2026-10-28T10:00:00"),
      ];
      render(<TimerContainer timeLogs={timeLogs} />);

      expect(screen.getByText("05:00:00")).toBeInTheDocument();
    });

    it("shows the overtime once the daily target is reached", () => {
      // 9h running
      render(<TimerContainer timeLogs={[running("2026-10-28T03:00:00")]} />);

      expect(screen.getByText("01:00:00")).toBeInTheDocument();
    });

    it("does not count a time log left running from a previous day", () => {
      render(<TimerContainer timeLogs={[running("2026-10-27T08:00:00")]} />);

      expect(screen.getByText("08:00:00")).toBeInTheDocument();
    });

    it("shows the pause since the last stop today", () => {
      render(
        <TimerContainer
          timeLogs={[done("2026-10-28T08:00:00", "2026-10-28T11:30:00")]}
        />
      );

      expect(screen.getByLabelText("pause 30 m 0 s")).toBeInTheDocument();
    });

    it("shows no pause while the timer runs", () => {
      const timeLogs = [
        running("2026-10-28T11:45:00"),
        done("2026-10-28T08:00:00", "2026-10-28T11:30:00"),
      ];
      render(<TimerContainer timeLogs={timeLogs} />);

      expect(screen.queryByLabelText(/^pause/)).toBeNull();
    });
  });

  describe("timer notification", () => {
    it("tells the remaining hours rounded up while running", () => {
      // 4h 30m running => 3h 30m remaining
      render(<TimerContainer timeLogs={[running("2026-10-28T07:30:00")]} />);

      expect(lastNotification()).toEqual([true, "less than 4 h remaining"]);
    });

    it("tells exactly N remaining hours as less than N h", () => {
      // 4h running => 4h remaining
      render(<TimerContainer timeLogs={[running("2026-10-28T08:00:00")]} />);

      expect(lastNotification()).toEqual([true, "less than 4 h remaining"]);
    });

    it("tells to stop working once the daily target is reached", () => {
      // 8h running => 0 remaining
      render(<TimerContainer timeLogs={[running("2026-10-28T04:00:00")]} />);

      expect(lastNotification()).toEqual([true, "Stop working!"]);
    });

    it("counts today's done time logs towards the remaining time", () => {
      // 5h done + 2h running => 1h remaining
      const timeLogs = [
        running("2026-10-28T10:00:00"),
        done("2026-10-28T04:00:00", "2026-10-28T09:00:00"),
      ];
      render(<TimerContainer timeLogs={timeLogs} />);

      expect(lastNotification()).toEqual([true, "less than 1 h remaining"]);
    });

    it("is not shown while no time log is running", () => {
      render(
        <TimerContainer
          timeLogs={[done("2026-10-28T08:00:00", "2026-10-28T10:00:00")]}
        />
      );

      expect(lastNotification()[0]).toBe(false);
    });
  });
});
