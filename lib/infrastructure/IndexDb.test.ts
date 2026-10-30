import IndexDb from "./IndexDb";

describe("IndexDb", () => {
  it("allows at most one time log per start time", () => {
    const startTime = new IndexDb().timeLogs.schema.idxByName.startTime;

    expect(startTime.unique).toBe(true);
  });
});
