import { Box, Skeleton, Alert, AlertTitle } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "../util/fetcher";
import WeatherTable from "./WeatherTable";
import { Weather } from "../util/schema";
import { latitude, longtitude, hourly } from "../util/constants";
import { useContext, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { UnitsContext } from "../App";

export default function WeatherArchive() {
    //This component holds the starting day of our query
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(7, "day"));
    //This component holds the ending day of our query
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
    //This context holds the units of the temperature
    const units = useContext(UnitsContext)
    const { data, error, isLoading } = useSWR(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longtitude}&start_date=${startDate?.format(
            "YYYY-MM-DD"
        )}&end_date=${endDate?.format("YYYY-MM-DD")}&hourly=${hourly}&temperature_unit=${units}`,
        fetcher,
        {
            onErrorRetry: (
                _error,
                _key,
                _config,
                revalidate,
                { retryCount }
            ) => {
                //Retry up to 10 times
                if (retryCount >= 10) return;
                // Retry after 5 seconds
                setTimeout(() => revalidate({ retryCount }), 5000);
            },
        }
    );
    return (
        <>
            <Box display={"flex"} justifyContent={"center"}>
                <DatePicker
                    value={startDate}
                    onChange={(e) => setStartDate(e)}
                    slotProps={{ textField: { helperText: "Start Date" } }}
                    disableFuture
                    maxDate={endDate}
                    sx={{marginRight: 2}}
                />
                <DatePicker
                    value={endDate}
                    onChange={(e) => setEndDate(e)}
                    slotProps={{ textField: { helperText: "End Date" } }}
                    disableFuture
                    minDate={startDate}
                />
            </Box>
            {isLoading ? (
                <Box display="flex" justifyContent="center" marginTop={17}>
                    <Box display="flex" flexDirection="column" gap={1}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton
                                variant="rectangular"
                                width={1155}
                                height={46}
                                key={index}
                            />
                        ))}
                    </Box>
                </Box>
            ) : error ? (
                <Alert
                    severity="error"
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        justifyContent: "center",
                        marginX: 47,
                    }}
                    variant="standard"
                >
                    <AlertTitle>Error</AlertTitle>
                    Failed to load.
                </Alert>
            ) : (
                <WeatherTable data={data as Weather[]} />
            )}
        </>
    );
}
