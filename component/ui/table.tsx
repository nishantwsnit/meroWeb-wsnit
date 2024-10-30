// TableComponent.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";

interface TableComponentProps {
  headers: string[];
  data: any[];
  renderRow: (item: any) => JSX.Element;
}

const TableComponent: React.FC<TableComponentProps> = ({
  headers,
  data,
  renderRow,
}) => {
  return (
    <Table caption="" highlightOnHover={true} size="small" variation="striped">
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell as="th" key={header}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{data.map(renderRow)}</TableBody>
    </Table>
  );
};

export default TableComponent;
