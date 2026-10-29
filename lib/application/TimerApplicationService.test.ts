import { vi } from "vitest";
import TimeLog from "../domain/TimeLog";
import TimerApplicationService from "./TimerApplicationService";

const { save, update, remove, exportAfterWorkdayEnd } = vi.hoisted(() => ({
  save: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
  exportAfterWorkdayEnd: vi.fn(),
}));

vi.mock("../infrastructure/TimeLogRepository", () => ({
  default: class {
    save = save;
    update = update;
    delete = remove;
  },
}));
vi.mock("./ExportImportApplicationService", () => ({
  exportImportApplicationService: {
    exportAllTimeLogsAfterWorkdayEnd: exportAfterWorkdayEnd,
  },
}));

describe("TimerApplicationService#stop()", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-28T10:00:00.800"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("stops a running time log", async () => {
    const running = new TimeLog({
      id: 1,
      startTime: new Date("2026-10-28T08:00:00"),
    });

    await new TimerApplicationService().stop(running);

    expect(update).toHaveBeenCalledTimes(1);
    expect(update.mock.calls[0][0].endTime).toEqual(
      new Date("2026-10-28T10:00:00")
    );
    expect(remove).not.toHaveBeenCalled();
  });

  it("discards a time log stopped within the second it was started", async () => {
    const running = new TimeLog({
      id: 1,
      startTime: new Date("2026-10-28T10:00:00.100"),
    });

    await new TimerApplicationService().stop(running);

    expect(remove).toHaveBeenCalledWith(running);
    expect(update).not.toHaveBeenCalled();
    expect(exportAfterWorkdayEnd).not.toHaveBeenCalled();
  });

  it("ends a time log forgotten over midnight at the end of its day", async () => {
    const running = new TimeLog({
      id: 1,
      startTime: new Date("2026-10-27T08:00:00"),
    });

    await new TimerApplicationService().stop(running);

    expect(update.mock.calls[0][0].endTime).toEqual(
      new Date("2026-10-27T23:59:59")
    );
  });
});

describe("TimerApplicationService#start()", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-28T10:00:00.800"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("creates a running time log started now", async () => {
    await new TimerApplicationService().start();

    expect(save).toHaveBeenCalledTimes(1);
    const created: TimeLog = save.mock.calls[0][0];
    expect(created.startTime).toEqual(new Date("2026-10-28T10:00:00"));
    expect(created.endTime).toBeUndefined();
    expect(created.isRunning()).toBe(true);
  });
});

describe("TimerApplicationService#stop() after midnight", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-28T00:30:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("ends a log forgotten over midnight on the day it started", async () => {
    const running = new TimeLog({
      id: 1,
      startTime: new Date("2026-10-27T23:00:00"),
    });

    await new TimerApplicationService().stop(running);

    const stopped: TimeLog = update.mock.calls[0][0];
    expect(stopped.isDone()).toBe(true);
    expect(stopped.startTime < stopped.endTime!).toBe(true);
    expect(stopped.endTime!.toDateString()).toEqual(
      stopped.startTime.toDateString()
    );
  });

  it("discards a log started in the last second of the previous day", async () => {
    const running = new TimeLog({
      id: 1,
      startTime: new Date("2026-10-27T23:59:59.500"),
    });

    await new TimerApplicationService().stop(running);

    expect(remove).toHaveBeenCalledWith(running);
    expect(update).not.toHaveBeenCalled();
  });
});
