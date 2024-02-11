import Navigation from "./Navigation";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import MainContent from "./MainContent";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App() {
    const [tab, setTab] = useState("temp");
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <section>
                <Navigation tab={tab} setTab={setTab} />
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
        </LocalizationProvider>
    );
}
