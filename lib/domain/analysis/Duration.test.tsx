import { HOUR, MIN, SEC } from "../time-constants";
import Duration from "./Duration";

describe("Duration", () => {
  describe("getFormatted()", () => {
    it("renders zero seconds", () => {
      expect(new Duration(0).getFormatted()).toEqual("0 s");
    });

    it("renders seconds", () => {
      expect(new Duration(1 * SEC).getFormatted()).toEqual("1 s");
    });

    it("renders minutes", () => {
      expect(new Duration(1 * MIN).getFormatted()).toEqual("1 m");
    });

    it("removes seconds if in minute range", () => {
      expect(new Duration(1 * MIN + 1 * SEC).getFormatted()).toEqual("1 m");
    });

    it("does not remove seconds if withSeconds set", () => {
      expect(new Duration(1 * MIN + 1 * SEC).getFormatted(true)).toEqual(
        "1 m 1 s"
      );
    });

    it("renders hours", () => {
      expect(new Duration(1 * HOUR).getFormatted()).toEqual("1 h");
    });

    it("renders hours and minutes", () => {
      expect(new Duration(1 * HOUR + 1 * MIN).getFormatted()).toEqual(
        "1 h 1 m"
      );
    });

    it("renders days", () => {
      expect(new Duration(25 * HOUR + 1 * MIN).getFormatted()).toEqual(
        "1 d 1 h 1 m"
      );
    });
  });

  describe("getFormattedHours()", () => {
    it("renders zero seconds", () => {
      expect(new Duration(0).getFormattedHours()).toEqual("0 h");
    });

    it("renders no seconds", () => {
      expect(new Duration(1 * SEC).getFormattedHours()).toEqual("0 h");
    });

    it("renders minutes", () => {
      expect(new Duration(30 * MIN).getFormattedHours()).toEqual("0.5 h");
    });

    it("removes seconds if in minute range", () => {
      expect(new Duration(30 * MIN + 1 * SEC).getFormattedHours()).toEqual(
        "0.5 h"
      );
    });

    it("renders hours", () => {
      expect(new Duration(1 * HOUR).getFormattedHours()).toEqual("1 h");
    });

    it("renders hours and minutes", () => {
      expect(new Duration(1 * HOUR + 1 * MIN).getFormattedHours()).toEqual(
        "1 h"
      );
    });

    it("renders no days", () => {
      expect(new Duration(25 * HOUR).getFormattedHours()).toEqual("25 h");
    });
  });

  describe("getFormattedMaxHours()", () => {
    it("renders zero seconds", () => {
      expect(new Duration(0).getFormattedMaxHours()).toEqual("0 h");
    });

    it("renders seconds as less than 1 hour", () => {
      expect(new Duration(1 * SEC).getFormattedMaxHours()).toEqual(
        "less than 1 h"
      );
    });

    it("renders minutes as less than 1 hour", () => {
      expect(new Duration(30 * MIN).getFormattedMaxHours()).toEqual(
        "less than 1 h"
      );
    });

    it("renders hours", () => {
      expect(new Duration(1 * HOUR).getFormattedMaxHours()).toEqual(
        "less than 1 h"
      );
    });

    it("renders hours and minutes", () => {
      expect(new Duration(1 * HOUR + 1 * MIN).getFormattedMaxHours()).toEqual(
        "less than 2 h"
      );
    });

    it("renders no days", () => {
      expect(new Duration(25 * HOUR).getFormattedMaxHours()).toEqual(
        "less than 25 h"
      );
    });
  });
});
