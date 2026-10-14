import { ReactNode } from "react";

interface Props {
  children?: ReactNode | ReactNode[];
}

export default function SpannedTableRow(props: Props) {
  return (
    <tr>
      <td colSpan={3} className="px-4 py-3 text-center">
        {props.children}
      </td>
    </tr>
  );
}
