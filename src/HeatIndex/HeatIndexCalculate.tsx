import { Button } from "@mui/material";
import { HeatIndexForm } from "../util/schema";
import { useCallback } from "react";

interface HeatIndexCalculateProps {
    temp: HeatIndexForm;
    setHeatIndex: React.Dispatch<React.SetStateAction<string>>;
}

export default function HeatIndexCalculate({
    temp,
    setHeatIndex,
}: HeatIndexCalculateProps) {
    const calculateHeatIndex = useCallback(() => {
        if (!temp.temperature || !temp.humidity) return;
        const temperatureFloat = parseFloat(temp.temperature);
        const humidityFloat = parseFloat(temp.humidity);
        if (temp.unit === "C" && temperatureFloat < 26.7) return;
        if (temp.unit === "F" && temperatureFloat < 80) return;
        let temperature = temperatureFloat;
        if (temp.unit === "C") {
            temperature = (9 / 5) * temperatureFloat + 32;
        }
        const calculate = (
            -42.379 +
            2.04901523 * temperature +
            10.14333127 * humidityFloat -
            0.22475541 * temperature * humidityFloat -
            6.83783 * Math.pow(10, -3) * Math.pow(temperature, 2) -
            5.481717 * Math.pow(10, -2) * Math.pow(humidityFloat, 2) +
            1.22874 *
                Math.pow(10, -3) *
                Math.pow(temperature, 2) *
                humidityFloat +
            8.5282 *
                Math.pow(10, -4) *
                temperature *
                Math.pow(humidityFloat, 2) -
            1.99 *
                Math.pow(10, -6) *
                Math.pow(temperature, 2) *
                Math.pow(humidityFloat, 2)
        ).toFixed(4);
        setHeatIndex(isNaN(parseFloat(calculate)) ? "Error" : calculate);
    }, [temp, setHeatIndex]);
    return (
        <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
            onClick={calculateHeatIndex}
        >
            Calculate
        </Button>
    );
}
