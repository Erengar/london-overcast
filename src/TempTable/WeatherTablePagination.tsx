import { TablePagination } from "@mui/material";
import TablePaginationActions from "./TablePaginationActions";

interface WeatherTablePaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    rowsPerPage: number;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
    count: number;
}

export default function WeatherTableHead({
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    count,
}: WeatherTablePaginationProps) {
    return (
        <TablePagination
            count={count}
            onPageChange={(_e, newPage) => {
                setPage(newPage);
            }}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 20, 50, 100]}
            onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
            }}
            component="div"
            ActionsComponent={TablePaginationActions}
        />
    );
}
