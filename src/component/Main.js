import React, { useState, useEffect } from "react";
import Weather from "./Weather";
import { createMuiTheme, Container, ThemeProvider } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";

const api = {
  key: "feb3f9c68c76bea2bc5cc18463bb265e",
  base: "http://api.openweathermap.org/data/2.5/",
};
export default function Main() {
  const [city, setCity] = useState("Yerevan");
  const [error, setError] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      fontSize: 10,
      h5: {
        fontWeight: 400,
      },
    },
  });

  useEffect(() => {
    getWeather(city)
      .then((data) => {
        setCurrentWeather(data);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, [city, error]);

  useEffect(() => {
    getForecast(city)
      .then((result) => {
        setForecast(result);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, [city, error]);

  const handleCityChange = (city) => {
    setCity(city);
  };

  function handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error: Location " + res.statusText.toLowerCase());
    }
  }
  function getWeather(city) {
    return fetch(`${api.base}/weather/?q=${city}&units=metric&appid=${api.key}`)
      .then((res) => handleResponse(res))
      .then((data) => {
        if (Object.entries(data).length) {
          const mappedData = mapDataToweatherInterface(data);
          return mappedData;
        }
      });
  }
  function getForecast() {
    return fetch(
      `${api.base}/forecast/?q=${city}&units=metric&appid=${api.key}`
    )
      .then((res) => handleResponse(res))
      .then((result) => {
        if (Object.entries(result).length) {
          const forecast = [];
          for (let i = 0; i < result.list.length; i += 8) {
            forecast.push(mapDataToweatherInterface(result.list[i + 4]));
          }
          return forecast;
        }
      });
  }
  function mapDataToweatherInterface(data) {
    const mapped = {
      city: data.name,
      country: data.sys.country,
      date: new Date(data.dt * 1000),
      description: data.weather[0].description,
      temperature: data.main.temp,
      icon_id: data.weather[0].id,
    };
    //Add properties for the five days forecast
    if (data.dt_txt) {
      mapped.dt_txt = data.dt_txt;
    }
    if (data.weather[0].icon) {
      mapped.icon = data.weather[0].icon;
    }
    if (data.main.temp_min && data.main.temp_max) {
      mapped.max = data.main.temp_max;
      mapped.min = data.main.temp_min;
    }
    // remove undefined fields
    Object.keys(mapped).forEach(
      (key) => mapped[key] === undefined && delete data[key]
    );
    return mapped;
  }
  if (
    (currentWeather && Object.keys(currentWeather).length) ||
    (forecast && Object.keys(forecast).length)
  ) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Weather
            city={city}
            error={error}
            currentWeather={currentWeather}
            forecast={forecast}
            onCityChange={handleCityChange}
          />
        </Container>
      </ThemeProvider>
    );
  } else {
    return (
      <div>
        <CircularProgress color={error ? "secondary" : "primary"} />
        {error ? <p>{error}</p> : ""}
      </div>
    );
  }
}
