import TextField from "@mui/material/TextField";
import { useEffect } from "react";

export default function HeatIndexField({ heatIndex }: { heatIndex: string }) {
    useEffect(() => {
        if (!heatIndex) {
            return;
        }
        const historyHeatIndex = localStorage.getItem("historyHeatIndex");
        const historyHeatIndexArray = JSON.parse(historyHeatIndex || "[]");
        if (historyHeatIndexArray.length > 4) {
            historyHeatIndexArray.pop();
        }
        localStorage.setItem(
            "historyHeatIndex",
            JSON.stringify([heatIndex, ...historyHeatIndexArray])
        );
        window.dispatchEvent(new Event("storage"));
    }, [heatIndex]);
    return (
        <>
            <TextField
                InputProps={{
                    readOnly: true,
                }}
                value={heatIndex}
                helperText="Heat Index"
            />
        </>
    );
}
