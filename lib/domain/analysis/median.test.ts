import median from "./median";

describe("median()", () => {
  it("returns number if only one element", () => {
    expect(median([1])).toEqual(1);
  });

  it("returns same number", () => {
    expect(median([1, 1])).toEqual(1);
  });

  it("returns middle if uneven length", () => {
    expect(median([1, 2, 3])).toEqual(2);
  });

  it("returns average of two middle elements if even length", () => {
    expect(median([1, 2, 3, 4])).toEqual(2.5);
  });

  it("sorts numerically, not as text", () => {
    expect(median([10, 9, 100])).toEqual(10);
  });

  it("returns the average of the middle elements for six elements", () => {
    expect(median([6, 1, 5, 2, 4, 3])).toEqual(3.5);
  });

  it("returns the middle element for five elements", () => {
    expect(median([5, 1, 4, 2, 3])).toEqual(3);
  });

  it("does not change the given list", () => {
    const times = [3, 1, 2];

    median(times);

    expect(times).toEqual([3, 1, 2]);
  });
});
