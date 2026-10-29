import { act, renderHook } from "@testing-library/react";
import { useTimeRangeOption } from "./useTimeRangeOption";

describe("useTimeRangeOption()", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("defaults to the last 8 weeks", () => {
    const { result } = renderHook(() => useTimeRangeOption());

    expect(result.current[0]).toBe("w8");
  });

  it("selects a time range and remembers it across sessions", () => {
    const { result } = renderHook(() => useTimeRangeOption());

    act(() => result.current[1]("q1"));

    expect(result.current[0]).toBe("q1");
    const { result: nextSession } = renderHook(() => useTimeRangeOption());
    expect(nextSession.current[0]).toBe("q1");
  });
});
