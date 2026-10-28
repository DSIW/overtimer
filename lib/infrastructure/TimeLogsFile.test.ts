import { describe, expect, it } from "vitest";
import TimeLogsFile from "./TimeLogsFile";

const fileOf = (records: object[]) =>
  new File([JSON.stringify(records)], "backup.json");

describe("TimeLogsFile#read", () => {
  it("reads valid time logs", async () => {
    const timeLogs = await new TimeLogsFile().read(
      fileOf([
        {
          startTime: "2020-01-01T08:00:00+00:00",
          endTime: "2020-01-01T12:00:00+00:00",
        },
        {
          startTime: "2020-01-01T13:00:00+00:00",
          endTime: "2020-01-01T17:00:00+00:00",
        },
      ])
    );

    expect(timeLogs).toHaveLength(2);
  });

  it("rejects the whole file if two time logs start at the same time", async () => {
    const read = new TimeLogsFile().read(
      fileOf([
        {
          startTime: "2020-01-01T08:00:00+00:00",
          endTime: "2020-01-01T12:00:00+00:00",
        },
        {
          startTime: "2020-01-01T08:00:00+00:00",
          endTime: "2020-01-01T10:00:00+00:00",
        },
      ])
    );

    await expect(read).rejects.toThrow("more than once");
  });
});
