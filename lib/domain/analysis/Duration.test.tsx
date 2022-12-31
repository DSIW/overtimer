import { HOUR, MIN, SEC } from "../time-constants";
import Duration from "./Duration";

describe("Duration", () => {
  it("renders zero seconds", async () => {
    expect(new Duration(0).getFormatted()).toEqual("0 s");
  });

  it("renders seconds", async () => {
    expect(new Duration(1 * SEC).getFormatted()).toEqual("1 s");
  });

  it("renders minutes", async () => {
    expect(new Duration(1 * MIN).getFormatted()).toEqual("1 m");
  });

  it("removes seconds if in minute range", async () => {
    expect(new Duration(1 * MIN + 1 * SEC).getFormatted()).toEqual("1 m");
  });

  it("renders hours", async () => {
    expect(new Duration(1 * HOUR).getFormatted()).toEqual("1 h");
  });

  it("renders hours and minutes", async () => {
    expect(new Duration(1 * HOUR + 1 * MIN).getFormatted()).toEqual("1 h 1 m");
  });

  it("renders days", async () => {
    expect(new Duration(25 * HOUR + 1 * MIN).getFormatted()).toEqual(
      "1 d 1 h 1 m"
    );
  });
});
