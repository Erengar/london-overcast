import { useState } from "react";
import { startTransition } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

type WeatherSliderProps = {
    pastDays: number;
    setPastDays: React.Dispatch<React.SetStateAction<number>>;
    futureDays: number;
    setFutureDays: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
};

export default function WeatherSlider({
    pastDays,
    setPastDays,
    futureDays,
    setFutureDays,
    isLoading,
}: WeatherSliderProps) {
    //This state holds the value of the slider, this is to add another layer between the slider and the actual state(change of state triggers refetch)
    const [sliderValues, setSliderValues] = useState([-pastDays, futureDays]);
    return (
        <Box sx={{ width: 600, margin: "auto" }}>
            <Slider
                min={-92}
                max={16}
                onChange={(_, value: number[] | number) => {
                    if (typeof value === "number") return;
                    if (value[0] > 0) value[0] = 0;
                    if (value[1] < 0) value[1] = 0;
                    startTransition(() => setSliderValues(value));
                }}
                onChangeCommitted={(_, value: number[] | number) => {
                    if (typeof value === "number") return;
                    startTransition(() => {
                        setPastDays(-value[0]);
                        setFutureDays(value[1]);
                    });
                }}
                value={sliderValues}
                marks={[
                    { value: -92, label: "Past 92 days" },
                    { value: -30, label: "Past 30 days" },
                    { value: 0, label: "Today" },
                    { value: 16, label: "Next 16 days" },
                ]}
                disableSwap
                disabled={isLoading}
                valueLabelDisplay="auto"
            />
        </Box>
    );
}
