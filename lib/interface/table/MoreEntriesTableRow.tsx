import { WEEK_LIMIT } from "../../domain/time-constants";
import SpannedTableRow from "./SpannedTableRow";

interface Props {
  count: number;
}

export default function MoreEntriesTableRow({ count }: Props) {
  return (
    <SpannedTableRow>
      {count} time logs are outdated after {WEEK_LIMIT} weeks.
    </SpannedTableRow>
  );
}
