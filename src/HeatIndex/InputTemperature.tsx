import { TextField } from "@mui/material";
import { type HeatIndexForm } from "../util/schema";

interface InputTemperatureProps {
    temp: HeatIndexForm;
    setTemp: React.Dispatch<React.SetStateAction<HeatIndexForm>>;
    error: boolean;
}

export default function InputTemperature({
    temp,
    setTemp,
    error = false,
}: InputTemperatureProps) {
    if (error) {
        return (
            <TextField
                label={`Temperature (${temp.unit === "C" ? "°C" : "F"})`}
                variant="outlined"
                value={temp.temperature}
                onChange={(e) => {
                    console.log(e.target.value)
                    console.log(typeof(e.target.value))
                    if (isNaN(parseFloat(e.target.value)) && e.target.value !== "") return;
                    setTemp({
                        ...temp,
                        temperature: e.target.value,
                    });
                }}
                inputProps={{ min: "26.7", step: "1" }}
                error
                helperText="Temperature must be greater than 26.7°C or 80°F"
            />
        );
    }
    return (
        <TextField
            label={`Temperature (${temp.unit === "C" ? "°C" : "F"})`}
            variant="outlined"
            value={temp.temperature}
            onChange={(e) => {
                if (isNaN(parseFloat(e.target.value)) && e.target.value !== "") return;
                setTemp({
                    ...temp,
                    temperature: e.target.value,
                });
            }}
            inputProps={{ min: "26.7", step: "1" }}
        />
    );
}
