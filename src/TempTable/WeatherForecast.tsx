import { useContext, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../util/fetcher";
import WeatherSlider from "./WeatherSlider";
import WeatherTable from "./WeatherTable";
import { Weather } from "../util/schema";
import { Box, Skeleton, Alert, AlertTitle } from "@mui/material";
import { latitude, longtitude, hourly } from "../util/constants";
import { UnitsContext } from "../App";

export default function WeatherForecast() {
    //This state holds the number of past days to fetch
    const [pastDays, setPastDays] = useState(3);
    //This state holds the number of future days to fetch
    const [futureDays, setFutureDays] = useState(7);
    //This context holds the units of the temperature
    const units = useContext(UnitsContext);

    const { data, error, isLoading } = useSWR(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longtitude}&hourly=${hourly}&forecast_days=${futureDays}&past_days=${pastDays}&temperature_unit=${units}`,
        fetcher,
        {
            dedupingInterval: 0,
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
            <Box marginBottom={3}>
                <WeatherSlider
                    pastDays={pastDays}
                    setPastDays={setPastDays}
                    futureDays={futureDays}
                    setFutureDays={setFutureDays}
                    isLoading={isLoading}
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
