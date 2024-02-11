import { LineChart, ChartsReferenceLine } from "@mui/x-charts";
import React, { useContext } from "react";
import { Box, LinearProgress } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "../util/fetcher";
import { latitude, longtitude, hourly } from "../util/constants";
import dayjs from "dayjs";
import { UnitsContext } from "../App";

// Fetch 7 days of future data and 3 days of past data, we want no more than that in chart
const futureDays = 7;
const pastDays = 3;

const Chart = React.memo(() => {
    //This holds the units of temperature
    const units = useContext(UnitsContext);
    
    const { data, error, isLoading } = useSWR(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longtitude}&hourly=${hourly}&forecast_days=${futureDays}&past_days=${pastDays}&temperature_unit=${units}`,
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
    const date = new Date();
    return (
        <>
            {isLoading ? (
                <LinearProgress />
            ) : error ? (
                <div>Failed to load</div>
            ) : (
                <Box width={"100%"} height={"60vh"}>
                    <LineChart
                        xAxis={[
                            {
                                label: "Date Time",
                                id: "Date Time",
                                scaleType: "time",
                                data: data?.map((d) => dayjs(d.time)),
                                valueFormatter(value) {
                                    return dayjs(value).format("DD/MM HH:mm");
                                },
                            },
                        ]}
                        series={[
                            {
                                label: `Temperature ${units === "celsius" ? "(°C)": "(F)"}`,
                                data: data?.map((d) => d.temperature),
                            },
                        ]}
                        sx={{ ml: { xs: 0, sm: 4 } }}
                    >
                        <ChartsReferenceLine
                            x={date.setHours(date.getHours())}
                            label="Now"
                            labelAlign="start"
                            lineStyle={{
                                stroke: "red",
                                strokeDasharray: "8,5",
                                strokeWidth: 2,
                            }}
                        />
                    </LineChart>
                </Box>
            )}
        </>
    );
});

export default Chart;
