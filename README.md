# London Weather
This application displays weather forecast for the City of London.   
It is deployed at this [address](https://london-vercast.onrender.com/). Data is being taken from public API [Weather Forecast API](https://open-meteo.com/en/docs).   
## Description  
At the top left is a button to change units(°C/F) used.   
The main part of the application is divided into three tabs.   
The first one displays a table with data for "Date Time", "Weather State", "Temperature", "Surface Pressure" and "Relative Humidity". At the top of the page, user can change whether to display *Forecast* or *Archive*.   
*Forecast* is used to display the last couple of days and up to 16 days ahead. Under the toggle button is a slider that allows the user to set the days he is interested in. This slider is limited to 92 days into the past and 16 days into the future, as these are limitations of the API.   
*Archive* can display data from the past dating back to 1940. User chooses start day and end day for the query. It is then displayed in the table.   
Both views share the same table. The table is sortable by clicking on labels in the table head. At the bottom is a pagination with an option for how many rows should be displayed at one time. At the top is a search bar that allows searching for values inside the table.   
The second tab shows a line chart with x-axis representing "Date Time" and y-axis representing "Temperature". The range it displays is limited to 3 days into past and 6 days into future.   
The last tab contains a calculator for *Heat index*. It takes 3 user inputs and displays the result. At the bottom is a history of previous calculations.   
## Technical   
This application was made with combination of React + Typescript + Vite. Therefore, it is purely client side rendered. [Material UI](https://mui.com/) was used for UI. For data fetching, it was [SWR](https://swr.vercel.app/). Search bar is using [Fuse.js](https://www.fusejs.io/).