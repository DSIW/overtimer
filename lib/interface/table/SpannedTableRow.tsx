import { TableRow, TableCell } from "@material-ui/core";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode | ReactNode[];
}

export default function SpannedTableRow(props: Props) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={3}>
        {props.children}
      </TableCell>
    </TableRow>
  );
}
