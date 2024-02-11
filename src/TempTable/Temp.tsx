import React from "react";
import { useState } from "react";
import WeatherForecast from "./WeatherForecast";
import WeatherArchive from "./WeatherArchive";
import { Box, Button } from "@mui/material";

const Temp = React.memo(() => {
    const [archive, setArchive] = useState(false);
    return (
        <>
            <Box display="flex" justifyContent="center" marginBottom={2}>
                <Button
                    onClick={() => setArchive((prev) => !prev)}
                    variant="contained"
                >
                    {archive ? "Forecast" : "Archive"}
                </Button>
            </Box>
            {archive ? <WeatherArchive /> : <WeatherForecast />}
        </>
    );
});

export default Temp;
