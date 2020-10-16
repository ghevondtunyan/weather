import React from "react";
import * as weatherIcons from "../icons";
import Layout from "./Layout";
import WeatherSearch from "./WeatherSearch";

export default function Weather(props) {
  const { city, error, currentWeather, forecast, onCityChange } = props;
  if(currentWeather && forecast){
  const prefix = "wi wi-";
  const icon = prefix + weatherIcons.default[currentWeather.icon_id].icon;

  return (
    <div>
      <WeatherSearch city={city} onCityChange={onCityChange} error={error} />
      <Layout currentWeather={currentWeather} forecast={forecast} icon={icon} />
    </div>
  );
  }
}
