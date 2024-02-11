import WeatherTable from "./WeatherTable";
import { Weather } from "../util/schema";
import React from "react";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../util/fetcher";
import WeatherSlider from "./WeatherSlider";
import { Alert, AlertTitle, Box, Skeleton } from "@mui/material";

const latitude = "51.5085";
const longtitude = "-0.1257";
const hourly =
    "temperature_2m,relative_humidity_2m,surface_pressure,weather_code";

const Temp = React.memo(() => {
    //This state holds the number of past days to fetch
    const [pastDays, setPastDays] = useState(3);
    //This state holds the number of future days to fetch
    const [futureDays, setFutureDays] = useState(7);

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

    return (
        <>
            <WeatherSlider
                pastDays={pastDays}
                setPastDays={setPastDays}
                futureDays={futureDays}
                setFutureDays={setFutureDays}
                isLoading={isLoading}
            />
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
});

export default Temp;
