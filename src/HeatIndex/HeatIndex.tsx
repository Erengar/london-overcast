import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import HeatIndexField from "./HeatIndexField";
import { type HeatIndexForm } from "../util/schema";
import InputTemperature from "./InputTemperature";
import InputHumidity from "./InputHumidity";
import InputTemperatureUnit from "./InputTemperatureUnit";
import HeatIndexCalculate from "./HeatIndexCalculate";
import HeatIndexHistory from "./HeatIndexHistory";
import React from "react";

const HeatIndex = React.memo(() => {
    //This holds the temperature and humidity
    const [temp, setTemp] = useState<HeatIndexForm>({
        temperature: "",
        unit: "C",
        humidity: "",
    });
    //This holds calculated heat index
    const [heatIndex, setHeatIndex] = useState<string>("");
    //This holds the error state, if the temperature entered is too low
    const [error, setError] = useState<boolean>(false);
    useEffect(() => {
        if (
            (temp.unit === "C" &&
                temp.temperature &&
                parseFloat(temp.temperature) < 26.7) ||
            (temp.unit === "F" &&
                temp.temperature &&
                parseFloat(temp.temperature) < 80)
        ) {
            setError(true);
        } else {
            setError(false);
        }
    }, [temp]);
    return (
        <Container
            maxWidth="xs"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
            {error ? (
                <InputTemperature temp={temp} setTemp={setTemp} error={true} />
            ) : (
                <InputTemperature temp={temp} setTemp={setTemp} error={false} />
            )}
            <InputTemperatureUnit temp={temp} setTemp={setTemp} />

            <InputHumidity temp={temp} setTemp={setTemp} />
            <HeatIndexCalculate temp={temp} setHeatIndex={setHeatIndex} />
            <HeatIndexField heatIndex={heatIndex} />
            <HeatIndexHistory />
        </Container>
    );
});

export default HeatIndex;
