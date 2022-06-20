import SpannedTableRow from "./SpannedTableRow";

interface Props {
  count: number;
  weekLimit: number;
}

function pluralize(value: number, singular: string, plural?: string) {
  const pluralValue = plural || `${singular}s`;
  return value === 1 ? singular : pluralValue;
}

export default function MoreEntriesTableRow({ count, weekLimit }: Props) {
  return (
    <SpannedTableRow>
      {count} time logs are outdated after {weekLimit}{" "}
      {pluralize(weekLimit, "week")}.
    </SpannedTableRow>
  );
}
