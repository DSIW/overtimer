import { vi } from "vitest";
import TimeLogApplicationService from "./TimeLogApplicationService";
import { endOfTimeRange, startOfTimeRange } from "../domain/time-constants";

const { allBefore } = vi.hoisted(() => ({ allBefore: vi.fn() }));

vi.mock("../infrastructure/TimeLogRepository", () => ({
  default: class {
    allBefore = allBefore;
  },
}));

describe("TimeLogApplicationService#getAllRecentTimeLogs()", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("queries a quarter from its start up to its end", async () => {
    await new TimeLogApplicationService().getAllRecentTimeLogs("q1");

    expect(allBefore).toHaveBeenCalledWith(
      startOfTimeRange("q1"),
      endOfTimeRange("q1")
    );
    expect(allBefore.mock.calls[0][1]).toBeInstanceOf(Date);
  });

  it("queries a week range from its start without an end", async () => {
    await new TimeLogApplicationService().getAllRecentTimeLogs("w12");

    expect(allBefore).toHaveBeenCalledWith(startOfTimeRange("w12"), undefined);
  });

  it("uses last 8 weeks when no time range is given", async () => {
    await new TimeLogApplicationService().getAllRecentTimeLogs();

    expect(allBefore).toHaveBeenCalledWith(startOfTimeRange("w8"), undefined);
  });
});
