import Time from "./Time"
import { render, screen } from "@testing-library/react"
import { HOUR, MIN, SEC } from "../../domain/time-constants";

describe("<Time />", () => {
  it("renders zero seconds", async () => {
    render(<Time milliseconds={0} />);

    expect(await screen.findByText("00:00:00")).toBeInTheDocument();
  })

  it("renders seconds", async () => {
    render(<Time milliseconds={1*SEC} />);

    expect(await screen.findByText("00:00:01")).toBeInTheDocument();
  })

  it("renders minutes", async () => {
    render(<Time milliseconds={1*MIN} />);

    expect(await screen.findByText("00:01:00")).toBeInTheDocument();
  })

  it("renders hours", async () => {
    render(<Time milliseconds={1*HOUR} />);

    expect(await screen.findByText("01:00:00")).toBeInTheDocument();
  })

  it("renders hours and minutes", async () => {
    render(<Time milliseconds={1*HOUR + 1*MIN} />);

    expect(await screen.findByText("01:01:00")).toBeInTheDocument();
  })

  it("renders hours, minutes and seconds", async () => {
    render(<Time milliseconds={1*HOUR + 1*MIN + 1*SEC} />);

    expect(await screen.findByText("01:01:01")).toBeInTheDocument();
  })
})