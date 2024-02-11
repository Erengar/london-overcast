import Navigation from "./Navigation";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import MainContent from "./MainContent";

export default function App() {
    const [tab, setTab] = useState("temp");
    return (
        <section>
            <Navigation tab={tab} setTab={setTab} />
            <Typography variant="h3" gutterBottom align="center">
                London
            </Typography>
            <MainContent tab={tab} />
        </section>
    );
}
