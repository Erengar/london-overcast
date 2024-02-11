export interface WeatherObject  {
    relative_humidity_2m: number[];
    surface_pressure: number[];
    temperature_2m: number[];
    time: string[];
    weather_code: number[];
}

export interface Weather  {
    humidity: number;
    pressure: number;
    temperature: number;
    time: string;
    weather: string;
}

export interface HeatIndexForm  {
    temperature: string | null;
    unit: "C" | "F";
    humidity: string | null;
}
