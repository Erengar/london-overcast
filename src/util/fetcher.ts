import { WeatherObject } from "./schema";
import { weatherTypes } from "./interpretaionCodes";

export const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
        const response = await res.json();
        console.log(response.reason);
        throw new Error(response.reason);
    }
    const response = await res.json();
    const weather: WeatherObject = response.hourly;

    const weatherArray = Array.from({
        length: response.hourly.time.length,
    }).map((_, index) => {
        return {
            time: weather.time[index],
            weather:
                weatherTypes[
                    weather.weather_code[index] as keyof typeof weatherTypes
                ],
            temperature: weather.temperature_2m[index],
            humidity: weather.relative_humidity_2m[index],
            pressure: weather.surface_pressure[index],
        };
    });

    return weatherArray;
};
