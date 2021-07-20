import Duration from "./Duration"
import { render, screen } from "@testing-library/react"

const SEC = 1000
const MIN = 60*SEC
const HOUR = 60*MIN

describe("<Duration />", () => {
  it("renders 0s", async () => {
    render(<Duration milliseconds={0} />);

    expect(await screen.findByText(/0 s/i)).toBeInTheDocument();
  })

  it("renders special zero case", async () => {
    render(<Duration milliseconds={0} zero="ZERO" />);

    expect(await screen.findByText(/ZERO/i)).toBeInTheDocument();
  })

  it("renders 1s", async () => {
    render(<Duration milliseconds={1*SEC} />);

    expect(await screen.findByText(/1 s/i)).toBeInTheDocument();
  })

  it("renders 1m", async () => {
    render(<Duration milliseconds={1*MIN} />);

    expect(await screen.findByText(/1 m/i)).toBeInTheDocument();
  })

  it("removes seconds if in minute range", async () => {
    render(<Duration milliseconds={1*MIN + 1*SEC} />);

    expect(await screen.findByText(/1 m/i)).toBeInTheDocument();
  })

  it("renders 1h", async () => {
    render(<Duration milliseconds={1*HOUR} />);

    expect(await screen.findByText(/1 h/i)).toBeInTheDocument();
  })

  it("renders 1h 1m", async () => {
    render(<Duration milliseconds={1*HOUR + 1*MIN} />);

    expect(await screen.findByText(/1 h 1 m/i)).toBeInTheDocument();
  })
})