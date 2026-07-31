import Duration from "./Duration";
import { render, screen } from "@testing-library/react";
import { HOUR, MIN, SEC } from "../domain/time-constants";

describe("<Duration />", () => {
  it("renders zero seconds", async () => {
    render(<Duration milliseconds={0} />);

    expect(await screen.findByText("0 s")).toBeInTheDocument();
  });

  it("renders special zero case", async () => {
    render(<Duration milliseconds={0} zero="ZERO" />);

    expect(await screen.findByText("ZERO")).toBeInTheDocument();
  });

  it("removes seconds if in minute range", async () => {
    render(<Duration milliseconds={1 * MIN + 1 * SEC} />);

    expect(await screen.findByText("1 m")).toBeInTheDocument();
  });

  it("renders hours and minutes", async () => {
    render(<Duration milliseconds={1 * HOUR + 1 * MIN} />);

    expect(await screen.findByText("1 h 1 m")).toBeInTheDocument();
  });

  it("renders negative durations as a negative number instead of zero", async () => {
    render(<Duration milliseconds={-1 * HOUR} />);

    expect(await screen.findByText("-1 h")).toBeInTheDocument();
  });

  it("renders small negative durations as zero", async () => {
    render(<Duration milliseconds={-500} />);

    expect(await screen.findByText("0 s")).toBeInTheDocument();
  });
});
