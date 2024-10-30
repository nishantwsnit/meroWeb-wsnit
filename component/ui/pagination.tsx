// PaginationComponent.tsx
import { Pagination } from "@aws-amplify/ui-react";

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalPages,
  currentPage,
  onChange,
}) => {
  return (
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onChange={(page) => onChange(Number(page))}
    />
  );
};

export default PaginationComponent;
