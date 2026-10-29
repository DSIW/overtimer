import { vi } from "vitest";
import TimeLog from "../domain/TimeLog";
import TimerApplicationService from "./TimerApplicationService";

const { update, remove, exportAfterWorkdayEnd } = vi.hoisted(() => ({
  update: vi.fn(),
  remove: vi.fn(),
  exportAfterWorkdayEnd: vi.fn(),
}));

vi.mock("../infrastructure/TimeLogRepository", () => ({
  default: class {
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
});
