import { vi } from "vitest";
import TimeLogRepository from "./TimeLogRepository";

const { records } = vi.hoisted(() => ({
  records: [] as { id: number; startTime: Date; endTime?: Date }[],
}));

// In-memory stand-in for the Dexie table, supporting the query chain the
// repository uses: orderBy("startTime").filter(fn).reverse().toArray().
vi.mock("./IndexDb", () => ({
  default: class {
    timeLogs = {
      mapToClass: () => undefined,
      count: async () => records.length,
      orderBy: () => {
        const ordered = [...records].sort(
          (a, b) => +a.startTime - +b.startTime
        );
        const chain = (rows: typeof records) => ({
          filter: (fn: (row: (typeof records)[number]) => boolean) =>
            chain(rows.filter(fn)),
          reverse: () => chain([...rows].reverse()),
          toArray: async () => rows,
        });
        return chain(ordered);
      },
    };
  },
}));
vi.mock("./PersistencePermission", () => ({
  requestPersistence: vi.fn(),
}));

function store(...startTimes: string[]) {
  records.length = 0;
  startTimes.forEach((startTime, index) =>
    records.push({ id: index + 1, startTime: new Date(startTime) })
  );
}

const startsOf = (timeLogs: { startTime: Date }[]) =>
  timeLogs.map((timeLog) => timeLog.startTime.toISOString());

describe("TimeLogRepository#allBefore (time logs shown for a time range)", () => {
  const rangeStart = new Date("2026-07-01T00:00:00Z");
  const rangeEnd = new Date("2026-09-30T23:59:59.999Z");

  it("excludes a time log starting exactly at the range start", async () => {
    store("2026-07-01T00:00:00Z", "2026-07-01T08:00:00Z");

    const shown = await new TimeLogRepository().allBefore(rangeStart);

    expect(startsOf(shown)).toEqual(["2026-07-01T08:00:00.000Z"]);
  });

  it("includes a time log starting exactly at the range end", async () => {
    store("2026-09-30T23:59:59.999Z");

    const shown = await new TimeLogRepository().allBefore(rangeStart, rangeEnd);

    expect(shown).toHaveLength(1);
  });

  it("excludes time logs starting after the end of a bounded range", async () => {
    store(
      "2026-06-30T08:00:00Z",
      "2026-08-15T08:00:00Z",
      "2026-10-01T08:00:00Z"
    );

    const shown = await new TimeLogRepository().allBefore(rangeStart, rangeEnd);

    expect(startsOf(shown)).toEqual(["2026-08-15T08:00:00.000Z"]);
  });

  it("keeps every later time log when the range has no end", async () => {
    store("2026-08-15T08:00:00Z", "2027-01-05T08:00:00Z");

    const shown = await new TimeLogRepository().allBefore(rangeStart);

    expect(shown).toHaveLength(2);
  });

  it("returns the shown time logs newest first", async () => {
    store(
      "2026-07-02T08:00:00Z",
      "2026-07-04T08:00:00Z",
      "2026-07-03T08:00:00Z"
    );

    const shown = await new TimeLogRepository().allBefore(rangeStart);

    expect(startsOf(shown)).toEqual([
      "2026-07-04T08:00:00.000Z",
      "2026-07-03T08:00:00.000Z",
      "2026-07-02T08:00:00.000Z",
    ]);
  });

  it("does not delete hidden time logs: count still includes them", async () => {
    store("2026-06-30T08:00:00Z", "2026-08-15T08:00:00Z");
    const repository = new TimeLogRepository();

    const shown = await repository.allBefore(rangeStart, rangeEnd);

    expect(shown).toHaveLength(1);
    expect(await repository.count()).toBe(2);
  });
});
