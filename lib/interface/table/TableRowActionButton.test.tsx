import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TimeLog from "../../domain/TimeLog";
import TableRowActionButton from "./TableRowActionButton";
import { timeLogApplicationService } from "../../application/TimeLogApplicationService";

vi.mock("../../application/TimeLogApplicationService", () => ({
  timeLogApplicationService: { update: vi.fn(), delete: vi.fn() },
}));

function openMenu() {
  fireEvent.click(screen.getByRole("button"));
}

function deleteItem() {
  return screen.getByRole("menuitem", { name: "Delete" });
}

describe("<TableRowActionButton />", () => {
  // now: Wed, 2026-10-28 10:00
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-28T10:00:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("deletes a done time log", () => {
    const timeLog = new TimeLog({
      id: 1,
      startTime: new Date("2026-10-28T08:00:00"),
      endTime: new Date("2026-10-28T09:00:00"),
    });
    render(<TableRowActionButton timeLog={timeLog} />);

    openMenu();
    fireEvent.click(deleteItem());

    expect(timeLogApplicationService.delete).toHaveBeenCalledWith(timeLog);
  });

  it("does not offer deleting the time log running today", () => {
    const timeLog = new TimeLog({
      id: 1,
      startTime: new Date("2026-10-28T08:00:00"),
    });
    render(<TableRowActionButton timeLog={timeLog} />);

    openMenu();

    expect(deleteItem()).toHaveAttribute("aria-disabled", "true");
    fireEvent.click(deleteItem());
    expect(timeLogApplicationService.delete).not.toHaveBeenCalled();
  });

  it("deletes a time log left running from a previous day", () => {
    const timeLog = new TimeLog({
      id: 1,
      startTime: new Date("2026-10-27T08:00:00"),
    });
    render(<TableRowActionButton timeLog={timeLog} />);

    openMenu();
    fireEvent.click(deleteItem());

    expect(timeLogApplicationService.delete).toHaveBeenCalledWith(timeLog);
  });

  it("offers editing any time log", () => {
    const timeLog = new TimeLog({
      id: 1,
      startTime: new Date("2026-10-28T08:00:00"),
    });
    render(<TableRowActionButton timeLog={timeLog} />);

    openMenu();
    fireEvent.click(screen.getByRole("menuitem", { name: "Edit" }));

    expect(screen.getByText("Edit", { selector: "h2" })).toBeInTheDocument();
  });
});
