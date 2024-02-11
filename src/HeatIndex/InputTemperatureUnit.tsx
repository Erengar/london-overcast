import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { type HeatIndexForm } from "../util/schema";

interface InputTemperatureUnitProps {
    temp: HeatIndexForm;
    setTemp: React.Dispatch<React.SetStateAction<HeatIndexForm>>;
}

export default function InputTemperatureUnit({
    temp,
    setTemp,
}: InputTemperatureUnitProps) {
    return (
        <ToggleButtonGroup
            exclusive
            aria-label="temperature unit"
            value={temp?.unit}
            onChange={(_e, newValue) => setTemp({ ...temp, unit: newValue })}
        >
            <ToggleButton value="C">Celzius</ToggleButton>
            <ToggleButton value="F">Farenheit</ToggleButton>
        </ToggleButtonGroup>
    );
}
