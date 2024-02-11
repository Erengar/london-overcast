import {
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import React, { useContext, useEffect } from "react";
import { Weather } from "../util/schema";
import { UnitsContext } from "../App";

interface WeatherTableHeadProps {
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
    sortDirection: "asc" | "desc";
    setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    setNewData: React.Dispatch<React.SetStateAction<Weather[]>>;
    newData: Weather[];
}

export default function WeatherTableHead({
    sort,
    setSort,
    sortDirection,
    setSortDirection,
    setNewData,
    newData,
}: WeatherTableHeadProps) {
    //This context holds the units of the temperature
    const units = useContext(UnitsContext);
    //The header of the table
    const header = [
        "Date Time",
        "Weather State",
        `Temperature ${units === "celsius"?"(°C)" : "(F)"}`,
        "Surface Pressure (hPa)",
        "Relative Humidity (%)",
    ];
    // Sort the data based on the sort and sortDirection states
    useEffect(() => {
        // Clone the data to avoid mutating the original data
        const sortedData = [...newData];
        switch (sort) {
            case header[4]:
                sortedData.sort((a, b) =>
                    sortDirection === "asc"
                        ? b.humidity - a.humidity
                        : a.humidity - b.humidity
                );
                break;
            case header[3]:
                sortedData.sort((a, b) =>
                    sortDirection === "asc"
                        ? b.pressure - a.pressure
                        : a.pressure - b.pressure
                );
                break;
            case header[2]:
                sortedData.sort((a, b) =>
                    sortDirection === "asc"
                        ? b.temperature - a.temperature
                        : a.temperature - b.temperature
                );
                break;
            case header[1]:
                sortedData.sort((a, b) =>
                    sortDirection === "asc"
                        ? b.weather.localeCompare(a.weather)
                        : a.weather.localeCompare(b.weather)
                );
                break;
            default:
                sortedData.sort((a, b) =>
                    sortDirection === "asc"
                        ? new Date(b.time).getTime() -
                          new Date(a.time).getTime()
                        : new Date(a.time).getTime() -
                          new Date(b.time).getTime()
                );
                break;
        }
        setNewData(sortedData);
    }, [sort, sortDirection]);
    return (
        <TableHead>
            <TableRow>
                {header.map((head) => (
                    <TableCell
                        key={head}
                        sortDirection={sort === head ? sortDirection : false}
                    >
                        <TableSortLabel
                            active={sort === head}
                            direction={sort === head ? sortDirection : "asc"}
                            onClick={() => {
                                const isAsc =
                                    sort === head && sortDirection === "asc";
                                setSortDirection(isAsc ? "desc" : "asc");
                                setSort(head);
                            }}
                        >
                            {head}
                            {sort === head ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {sortDirection === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
