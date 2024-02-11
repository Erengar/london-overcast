import Temp from "./TempTable/Temp";
import Chart from "./Chart/Chart";
import HeatIndex from "./HeatIndex/HeatIndex";

export default function MainComponent({ tab }: { tab: string }) {
    return (
        <section>
            {tab === "temp" && <Temp />}
            {tab === "chart" && <Chart />}
            {tab === "heat" && <HeatIndex />}
        </section>
    );
}
