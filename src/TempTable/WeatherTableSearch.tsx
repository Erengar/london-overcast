import Fuse from "fuse.js";
import { useEffect } from "react";
import { Box, TextField, debounce } from "@mui/material";
import { Weather } from "../util/schema";

interface WeatherTableSearchProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    data: Weather[];
    setNewData: React.Dispatch<React.SetStateAction<Weather[]>>;
}

export default function WeatherTableSearch({
    search,
    setSearch,
    data,
    setNewData,
}: WeatherTableSearchProps) {
    useEffect(() => {
        if (search === "") {
            setNewData(data);
            return;
        }
        const fuse = new Fuse(data, {
            keys: ["time", "weather", "temperature", "pressure", "humidity"],
            minMatchCharLength: 2,
            threshold: 0.3,
        });
        const result = fuse.search(search);
        setNewData(result.map((r) => r.item));
    }, [search]);

    const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, 400);

    return (
        <Box display="flex" justifyContent="center" marginTop={4}>
            <TextField
                label="Search"
                type="search"
                onChange={handleSearch}
                variant="standard"
            />
        </Box>
    );
}
