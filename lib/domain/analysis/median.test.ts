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
});
