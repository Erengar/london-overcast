import { LineChart, ChartsReferenceLine } from "@mui/x-charts";
import React from "react";
import { LinearProgress } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "../util/fetcher";

const latitude = "51.5085";
const longtitude = "-0.1257";
const hourly =
    "temperature_2m,relative_humidity_2m,surface_pressure,weather_code";
// Fetch 7 days of future data and 3 days of past data, we want no more than that in chart
const futureDays = 7;
const pastDays = 3;

const Chart = React.memo(() => {
    const { data, error, isLoading } = useSWR(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longtitude}&hourly=${hourly}&forecast_days=${futureDays}&past_days=${pastDays}`,
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
                <LineChart
                    height={400}
                    width={1900}
                    xAxis={[
                        {
                            label: "Date Time",
                            id: "Date Time",
                            scaleType: "utc",
                            data: data?.map((d) => new Date(d.time)),
                            valueFormatter(value) {
                                return value.toLocaleString();
                            },
                        },
                    ]}
                    series={[
                        {
                            label: "Temperature (°C)",
                            data: data?.map((d) => d.temperature),
                        },
                    ]}
                    sx={{ ml: { xs: 0, sm: 4 } }}
                >
                    <ChartsReferenceLine
                        x={date.setHours(date.getHours() + 1)}
                        label="Now"
                        labelAlign="start"
                        lineStyle={{
                            stroke: "red",
                            strokeDasharray: "8,5",
                            strokeWidth: 2,
                        }}
                    />
                </LineChart>
            )}
        </>
    );
});

export default Chart;
