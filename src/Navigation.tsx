import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function Navigation({
    tab,
    setTab,
}: {
    tab: string;
    setTab: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <nav>
            <Tabs value={tab} centered>
                <Tab
                    value="temp"
                    label="Temp"
                    onClick={() => setTab("temp")}
                    aria-selected
                />
                <Tab
                    value="chart"
                    label="Chart"
                    onClick={() => setTab("chart")}
                />
                <Tab
                    value="heat"
                    label="Heat Index"
                    onClick={() => setTab("heat")}
                />
            </Tabs>
        </nav>
    );
}
