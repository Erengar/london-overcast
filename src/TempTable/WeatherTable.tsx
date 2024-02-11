import { Container, Fade } from "@mui/material";
import { Weather } from "../util/schema";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import WeatherTableHead from "./WeatherTableHead";
import WeatherTablePagination from "./WeatherTablePagination";
import WeatherTableSearch from "./WeatherTableSearch";
import { useEffect } from "react";

export default function WeatherTable({ data }: { data: Weather[] }) {
    const [sort, setSort] = useState<string>("");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [newData, setNewData] = useState<Weather[]>(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState<string>("");
    
    useEffect(() => {
        setNewData(data);
    }, [data])
    return (
        <Container>
            <WeatherTableSearch
                search={search}
                setSearch={setSearch}
                data={data}
                setNewData={setNewData}
            />
            <TableContainer>
                <Table sx={{ maxWidth: 1200 }}>
                    <WeatherTableHead
                        sort={sort}
                        setSort={setSort}
                        sortDirection={sortDirection}
                        setSortDirection={setSortDirection}
                        newData={newData}
                        setNewData={setNewData}
                    />
                    <TableBody>
                        {newData
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => (
                                <Fade in={true} key={row.time}>
                                    <TableRow key={row.time}>
                                        <TableCell>
                                            {row.time.replace("T", " ")}
                                        </TableCell>
                                        <TableCell>{row.weather}</TableCell>
                                        <TableCell>{row.temperature}</TableCell>
                                        <TableCell>{row.pressure}</TableCell>
                                        <TableCell>{row.humidity}</TableCell>
                                    </TableRow>
                                </Fade>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <WeatherTablePagination
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                count={newData.length}
            />
        </Container>
    );
}
