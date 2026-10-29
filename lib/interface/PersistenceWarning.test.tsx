import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import TimeLog from "../domain/TimeLog";
import PersistenceWarning from "./PersistenceWarning";
import {
  isPersisted,
  requestPersistence,
} from "../infrastructure/PersistencePermission";

vi.mock("notistack", () => ({
  useSnackbar: () => ({ enqueueSnackbar: vi.fn() }),
}));
vi.mock("../infrastructure/PersistencePermission", () => ({
  isPersisted: vi.fn(),
  requestPersistence: vi.fn(),
}));

const timeLogs = [new TimeLog({ startTime: new Date() })];

describe("<PersistenceWarning />", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("is hidden until the persistence check has finished", () => {
    vi.mocked(isPersisted).mockReturnValue(new Promise(() => undefined));

    render(<PersistenceWarning timeLogs={timeLogs} />);

    expect(screen.queryByText("Persistence not allowed!")).toBeNull();
  });

  it("is shown while storage is not persistent", async () => {
    vi.mocked(isPersisted).mockResolvedValue(false);

    render(<PersistenceWarning timeLogs={timeLogs} />);

    expect(
      await screen.findByText("Persistence not allowed!")
    ).toBeInTheDocument();
  });

  it("disappears after a successful retry", async () => {
    vi.mocked(isPersisted).mockResolvedValue(false);
    vi.mocked(requestPersistence).mockResolvedValue(true);

    render(<PersistenceWarning timeLogs={timeLogs} />);
    fireEvent.click(await screen.findByText("TRY AGAIN"));

    await vi.waitFor(() =>
      expect(screen.queryByText("Persistence not allowed!")).toBeNull()
    );
  });
});
