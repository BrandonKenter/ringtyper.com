import {
  faAngleLeft,
  faAngleRight,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFlexLayout, usePagination, useTable } from "react-table";

const PaginatedTable = ({ columns, data, newRecord, leaderboardLoading }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageCount,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination,
    useFlexLayout
  );

  return (
    <div className="relative w-full h-[510px] flex flex-col">
      {data.length === 0 && !leaderboardLoading && (
        <div className="absolute left-0 right-0 mx-auto w-fit h-fit top-0 bottom-0 my-auto flex items-center gap-2 bg-neutral-800 px-6 py-1 rounded-lg">
          <FontAwesomeIcon
            className="text-neutral-500"
            icon={faBarsStaggered}
          />
          <span className="text-neutral-500 font-extrabold">No Records</span>
        </div>
      )}
      <table className="" {...getTableProps()}>
        <thead className="bg-neutral-900 rounded-t-md text-neutral-600 font-semibold">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="pb-2"
                  key={column.id}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {!leaderboardLoading && (
          <tbody
            className="bg-neutral-900 text-neutral-300"
            {...getTableBodyProps()}
          >
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  className={`text-neutral-400 h-10 font-bold transition duration-300 ring-2 ring-inset ${
                    pageIndex * pageSize + rowIndex === newRecord
                      ? "ring-rose-600"
                      : "ring-transparent"
                  } ${row.index % 2 == 0 ? "bg-neutral-800" : ""}`}
                  key={row.id}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td
                      className="flex items-center justify-center"
                      key={cell.id}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        )}
        {leaderboardLoading && (
          <tbody className="w-full">
            {Array.from({ length: 10 }, (_, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-neutral-800" : ""
                } animate-pulse`}
              >
                {/* Create a single cell that spans across all columns */}
                <td colSpan="100%" className="h-[40px] w-full"></td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <div className="mt-auto flex flex-col items-center justify-center text-neutral-900 dark:text-neutral-100">
        <span className="w-18 mb-2 text-center xs:w-24">
          Page {pageOptions.length > 0 ? pageIndex + 1 : 0} of{" "}
          {pageOptions.length}
        </span>
        <div className="flex">
          <button
            className="mr-2 rounded bg-neutral-200 w-8 text-sm py-1 text-neutral-700 outline-none hover:bg-neutral-300 disabled:opacity-50 disabled:hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-50 dark:hover:bg-neutral-600 disabled:dark:hover:bg-neutral-700"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <FontAwesomeIcon className="-mx-0.5" icon={faAngleLeft} />
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            className="mr-2 rounded bg-neutral-200 w-8 py-1 text-sm text-neutral-700 outline-none hover:bg-neutral-300 disabled:opacity-50 disabled:hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-50 dark:hover:bg-neutral-600 disabled:dark:hover:bg-neutral-700"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            className="mr-2 rounded bg-neutral-200 w-8 py-1 text-sm text-neutral-700 outline-none hover:bg-neutral-300 disabled:opacity-50 disabled:hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-50 dark:hover:bg-neutral-600 disabled:dark:hover:bg-neutral-700"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button
            className="rounded bg-neutral-200 w-8 py-1 text-sm text-neutral-700 outline-none hover:bg-neutral-300 disabled:opacity-50 disabled:hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-50 dark:hover:bg-neutral-600 disabled:dark:hover:bg-neutral-700"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <FontAwesomeIcon className="-mx-0.5" icon={faAngleRight} />
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginatedTable;
