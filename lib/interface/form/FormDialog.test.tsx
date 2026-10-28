import { fireEvent, render, screen } from "@testing-library/react";
import { setHours } from "date-fns";
import { vi } from "vitest";
import TimeLog from "../../domain/TimeLog";
import FormDialog from "./FormDialog";
import { timeLogApplicationService } from "../../application/TimeLogApplicationService";

vi.mock("../../application/TimeLogApplicationService", () => ({
  timeLogApplicationService: { update: vi.fn() },
}));

function doneTimeLog(): TimeLog {
  const startTime = setHours(new Date(), 8).setMinutes(0, 0, 0);
  const endTime = setHours(new Date(), 12).setMinutes(0, 0, 0);
  return new TimeLog({
    startTime: new Date(startTime),
    endTime: new Date(endTime),
  });
}

describe("<FormDialog />", () => {
  it("does not save while the form shows an error", () => {
    render(<FormDialog open timeLog={doneTimeLog()} />);

    fireEvent.change(screen.getByLabelText("Start"), {
      target: { value: "09:00" },
    });
    fireEvent.change(screen.getByLabelText("End"), {
      target: { value: "08:00" },
    });

    const save = screen.getByRole("button", { name: "Save" });
    expect(save).toBeDisabled();
    fireEvent.click(save);
    expect(timeLogApplicationService.update).not.toHaveBeenCalled();
  });
});
