import PaginationBox from "./PaginationBox";

// components/Pagination.tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const nextPage = Math.min(currentPage + 1, totalPages);
  const prevPage = Math.max(currentPage - 1, 1);

  return (
    <section className="pagination pt-10 flex">
      <PaginationBox isDisabled={currentPage === 1} onClick={() => onPageChange(prevPage)}>{"<"}</PaginationBox>
      <PaginationBox isDisabled={false} onClick={() => onPageChange(currentPage)}>{currentPage}</PaginationBox>
      <PaginationBox isDisabled={false} onClick={() => onPageChange(nextPage)}>{nextPage}</PaginationBox>
      <PaginationBox isDisabled={true} onClick={()=>0}>...</PaginationBox>
      <PaginationBox isDisabled={true} onClick={()=>0}>{totalPages}</PaginationBox>
      <PaginationBox isDisabled={currentPage === totalPages} onClick={() => onPageChange(nextPage)}>{">"}</PaginationBox>
    </section>
  );
};

export default Pagination;
