import { TextField } from "@mui/material";
import { type HeatIndexForm } from "../util/schema";

interface InputHumidityProps {
    temp: HeatIndexForm;
    setTemp: React.Dispatch<React.SetStateAction<HeatIndexForm>>;
}

export default function InputHumidity({ temp, setTemp }: InputHumidityProps) {
    return (
        <TextField
            label="Relative Humidity (%)"
            variant="outlined"
            type="number"
            value={temp.humidity}
            onChange={(e) => setTemp({ ...temp, humidity: e.target.value })}
            inputProps={{ min: "26.7", step: "1" }}
        />
    );
}
