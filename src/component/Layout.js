import React from "react";
import Forecast from "./Forecast";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
  Grid,
} from "@material-ui/core";
import dayjs from 'dayjs'
const useStyles = makeStyles((theme) => ({
  atmospheric: {
    fontSize: "28px",
    padding: "5px",
  },
  buttons: {
    color: "black",
  },
  card: {
    minWidth: 600,
    minHeight: 600,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  error: {
    color: "red",
    padding: "10px",
  },
  fullList: {
    width: "auto",
  },
  layout: {
    marginTop: "20px",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  recommendation: {
    fontFamily: "Montserrat, sans-serif",
    padding: "20px 0px 10px 0px",
    fontSize: "26px",
    textAlign: "center",
  },
  root: {
    flexiGrow: 1,
    color: "black",
  },
  search: {
    marginTop: "100px",
  },
  wi: {
    color: "#673ab7",
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  const { currentWeather, forecast, icon } = props;
  const date = dayjs().isValid(currentWeather.date) ? currentWeather.date : "";
  const description = currentWeather.description ? currentWeather.description : "";

  return (
    <div className={classes.layout}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardHeader
              title={currentWeather.city + ", " + currentWeather.country}
              subheader={<span>
                {dayjs(date).format("dddd")}, {dayjs(date).format("h:mm")}{" "}
                {dayjs(date).format("A")},{" "}
                {description.replace(/\w\S*/g, txt => {
                  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                })}
              </span>}
            />
            <CardContent>
              <CardMedia
                className={`${icon} ${classes.wi}`}
                src={icon}
                style={{ fontSize: "128px", float: "right" }}
              />
              <Typography
                variant="h2"
                className="big-temp"
                color="textPrimary"
                component="h2"
                style={{ fontFamily: "Montserrat", paddingTop: "30px" }}
              >
                {Math.round(currentWeather.temperature)}&deg;C
              </Typography>
              <Typography
                variant="subtitle2"
                className="atmospheric-conditions"
                color="textSecondary"
                gutterBottom
                style={{ paddingTop: "40px" }}
              ></Typography>
              <Divider variant="middle" />
              <Forecast forecast={forecast} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
