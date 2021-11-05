import SpannedTableRow from "./SpannedTableRow";

interface Props {
  count: number;
  weekLimit: number;
}

export default function MoreEntriesTableRow({ count, weekLimit }: Props) {
  return (
    <SpannedTableRow>
      {count} time logs are outdated after {weekLimit} weeks.
    </SpannedTableRow>
  );
}
