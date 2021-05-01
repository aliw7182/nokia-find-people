import DynamicTable from "@atlaskit/dynamic-table";
import Pagination from '@atlaskit/pagination';
import { Box } from "../atoms";
import { TableWrapper } from "./TableWrapper";

export const Table = ({
  totalPage = null,
  setCurrentPage = null,
  items,
  pending = false,
  head,
  emptyView="Not found",
  currentPage,
}) => {
  return (
    <div>
      <TableWrapper>
        <DynamicTable
          isLoading={pending}
          head={{ cells: head }}
          rows={items}
          emptyView={emptyView}
          isFixedSize
        />
      </TableWrapper>
      {totalPage && totalPage > 1 && (
        <Box d="flex" justify="center" mt="6px">
          <Pagination selectedIndex={currentPage - 1} pages={pagesArray(totalPage)} onChange={(e, page) => setCurrentPage(page)}/>
        </Box>
      )}
    </div>
  );
};

const pagesArray = (totalPage) => {
  const pages = [];
  for (var i = 1; i <= totalPage; ++i){
    pages.push(i);
  }
  return pages;
}