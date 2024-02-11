import TextField from "@mui/material/TextField";
import { useEffect } from "react";

export default function HeatIndexField({ heatIndex }: { heatIndex: string }) {
    //When the heat index is calculated, store it in local storage
    useEffect(() => {
        //If the heat index is not calculated, return
        if (!heatIndex) {
            return;
        }
        //Get the history from local storage
        const historyHeatIndex = localStorage.getItem("historyHeatIndex");
        const historyHeatIndexArray: string[] | [] = JSON.parse(historyHeatIndex || "[]");
        //Storing only the last 5 heat indices
        if (historyHeatIndexArray.length > 4) {
            historyHeatIndexArray.pop();
        }
        localStorage.setItem(
            "historyHeatIndex",
            JSON.stringify([heatIndex, ...historyHeatIndexArray])
        );
        //Trigger the storage event to update the history
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
