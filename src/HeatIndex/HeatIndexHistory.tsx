import { List, ListItem, Typography, ListItemText, Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function HeatIndexHistory() {
    const [historyHeatIndex, setHistoryHeatIndex] = useState<number[]>([]);
    useEffect(() => {
        const historyHeatIndex = localStorage.getItem("historyHeatIndex");
        setHistoryHeatIndex(JSON.parse(historyHeatIndex || "[]"));
        window.addEventListener("storage", () => {
            const historyHeatIndex = localStorage.getItem("historyHeatIndex");
            setHistoryHeatIndex(JSON.parse(historyHeatIndex || "[]"));
        });
        return () => {
            window.removeEventListener("storage", () => {
                const historyHeatIndex =
                    localStorage.getItem("historyHeatIndex");
                setHistoryHeatIndex(JSON.parse(historyHeatIndex || "[]"));
            });
        };
    }, []);
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5">History Heat Index</Typography>
            <List dense={true} sx={{ m: "auto" }}>
                {historyHeatIndex.map((heatIndex, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={heatIndex}></ListItemText>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
