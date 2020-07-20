import React, { useState } from "react";
import Keys from "./keys";

const api = {
  key: Keys.API_KEY,
  base: Keys.BASE_URL,
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  return (
    <div className="main">
      <h1 className="heading">Weather info.</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Enter City.."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
      />
      <main className="card">
        {typeof weather.main != "undefined" ? (
          <div className="info">
            <h1 className="city">
              {weather.name}, {weather.sys.country}
            </h1>
            <h1 className="weather">{Math.round(weather.main.temp)}°C</h1>
            <h1 className="weatherinfo">{weather.weather[0].main}</h1>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
