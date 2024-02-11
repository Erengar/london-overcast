import Navigation from "./Navigation";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import MainContent from "./MainContent";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createContext } from "react";
import { Button } from "@mui/material";

export const UnitsContext = createContext("celsius");

export default function App() {
    //This state controls the tab that is currently displayed
    const [tab, setTab] = useState("temp");
    //This state controls the units of the temperature
    const [units, setUnits] = useState("celsius");
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <UnitsContext.Provider value={units}>
                <section>
                    <Navigation tab={tab} setTab={setTab} />
                    <Button
                        variant="contained"
                        onClick={() => {
                            setUnits(
                                units === "celsius" ? "fahrenheit" : "celsius"
                            );
                        }}
                        sx={{position: "absolute", left: 5, top:5}}
                    >
                        {units === "celsius" ? "Farenheit" : "Celsius"}
                    </Button>
                    <Typography
                        variant="h3"
                        gutterBottom
                        align="center"
                        marginTop={1}
                    >
                        London
                    </Typography>
                    <MainContent tab={tab} />
                </section>
            </UnitsContext.Provider>
        </LocalizationProvider>
    );
}
