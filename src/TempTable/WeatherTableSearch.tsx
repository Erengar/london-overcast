import Fuse from "fuse.js";
import { useEffect } from "react";
import { Box, TextField, debounce } from "@mui/material";
import { Weather } from "../util/schema";
import SearchIcon from "@mui/icons-material/Search";

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
        //If the search string is empty, display all the data
        if (search === "") {
            setNewData(data);
            return;
        }
        const fuse = new Fuse(data, {
            keys: ["time", "weather", "temperature", "pressure", "humidity"],
            //0.6 is the default value, but we want to make it more strict
            threshold: 0.3,
        });
        const result = fuse.search(search);
        setNewData(result.map((r) => r.item));
    }, [search]);

    //Debounce the search to avoid unnecessary re-renders
    const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, 400);

    return (
        <Box display="flex" justifyContent="center">
            <TextField
                label="Search"
                type="search"
                onChange={handleSearch}
                variant="standard"
                InputProps={{
                    endAdornment: <SearchIcon />,
                }}
            />
        </Box>
    );
}
