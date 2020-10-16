import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import useDeny from "./use-deny";

const useStyles = makeStyles((theme) => ({
  error: {
    color: "red",
    padding: "10px",
  },
  search: {
    marginTop: "10px",
  },
}));
export default function WeatherSearch(props) {
  const classes = useStyles();
  const { onCityChange, error } = props;
  const [searchForm, setSearchForm] = useState("");
  const [isSearching, setSearching] = useState(false);
  const hasError = error ? true : false;
  const denySearchForm = useDeny(searchForm, 1000);

  const handleSearch = (e) => {
    setSearching(true);
    setSearchForm(e.target.value);
  };

  useEffect(
    () => {
      if (denySearchForm) {
        onCityChange(denySearchForm);
        setSearching(false);
      }
    },
    [onCityChange, isSearching, denySearchForm]
  );

  return (
    <div className={classes.search}>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <FormControl>
            <InputLabel htmlFor="search-city">Enter city name</InputLabel>
            <Input
              id="search-city"
              role="search"
              type="text"
              error={hasError}
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <Tooltip title="Optional: Enter a two-letter country code after the city name to make the search more precise. For example, London, GB.">
                    <Search />
                  </Tooltip>
                </InputAdornment>
              }
              endAdornment={
                isSearching && (
                  <InputAdornment position="end">
                    <CircularProgress size={20} />
                  </InputAdornment>
                )
              }
            />
            {error && (
              <Typography className={classes.error}>{error}</Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
