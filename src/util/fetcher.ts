import { WeatherObject } from "./schema";
import { weatherTypes } from "./interpretaionCodes";

//This is a callback that is used by the useSWR hook to fetch the data from the API
export const fetcher = async (url: string) => {
    const res = await fetch(url);
    //If the response is not ok, throw an error
    if (!res.ok) {
        const response = await res.json();
        console.log(response.reason);
        throw new Error(response.reason);
    }
    const response = await res.json();
    //Only hourly is of interested to us
    const weather: WeatherObject = response.hourly;

    //We map the response to a more readable format
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
