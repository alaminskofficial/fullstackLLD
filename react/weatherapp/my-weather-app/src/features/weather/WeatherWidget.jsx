import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchWeatherWithForecast,
} from "./weatherSlice";
import { getCurrentUserLocationData } from "../../utils/weatherApi";

export default function WeatherWidget() {
  const dispatch = useDispatch();
  const { data, status, forcasts } = useSelector((state) => state.weather);
  const [city, setCity] = useState("");

  const handleAutoLocation = async () => {
    try {
      const loc = await getCurrentUserLocationData();
      dispatch(fetchWeatherByCoords(loc));
      dispatch(fetchWeatherWithForecast(loc));
    } catch {
      alert("Failed to get location");
    }
  };

  const handleCitySearch = () => {
    if (city.trim()) {
      dispatch(fetchWeatherByCity(city));
      dispatch(fetchWeatherWithForecast(city));
      setCity("");
    }
  };

  useEffect(() => {
    handleAutoLocation();
  }, []);

  if (status === "loading") {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "rgba(98, 150, 206, 0.5)", p: 2 }}>
      {/* Top Bar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={2}
      >
        <Typography variant="h4" fontWeight="bold">
          Weather App
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            variant="outlined"
            placeholder="Enter city"
            size="small"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{ backgroundColor: "#fff", borderRadius: 2 }}
          />
          <Button variant="contained" onClick={handleCitySearch}>
            Search
          </Button>
          <Button variant="contained" onClick={handleAutoLocation}>
            Use My Location
          </Button>
        </Box>
      </Box>

      {data && (
        <>
          {/* Location + Weather Summary */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  backgroundColor: "#ffffffdd",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {data.location.name}, {data.location.country}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mb={2}>
                    Local Time:{" "}
                    {new Date(data.location.localtime).toLocaleString(
                      undefined,
                      {
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "short",
                      }
                    )}
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <img
                    src={`https:${data.current.condition.icon}`}
                    alt="weather"
                    style={{ width: 80 }}
                  />
                  <Typography variant="h3" color="textPrimary">
                    {data.current.temp_c}°C
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {data.current.condition.text}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Weather Details */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: "#ffffffdd",
                  overflowX: "auto",
                }}
              >
                <Typography variant="h6" mb={2} color="textPrimary">
                  Weather Details
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    flexWrap: "nowrap",
                    minWidth: "100%",
                  }}
                >
                  {[
                    {
                      label: "Feels Like",
                      value: `${data.current.feelslike_c}°C`,
                      icon: "🌡️",
                    },
                    {
                      label: "Wind",
                      value: `${data.current.wind_kph} km/h`,
                      icon: "💨",
                    },
                    {
                      label: "Humidity",
                      value: `${data.current.humidity}%`,
                      icon: "💧",
                    },
                    {
                      label: "UV Index",
                      value: data.current.uv,
                      icon: "🔆",
                    },
                    {
                      label: "Visibility",
                      value: `${data.current.vis_km} km`,
                      icon: "👀",
                    },
                    {
                      label: "Air Quality (PM2.5)",
                      value: `${data.current.air_quality.pm2_5?.toFixed(
                        1
                      )} µg/m³`,
                      icon: "🏭",
                    },
                  ].map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        minWidth: 120,
                        backgroundColor: "#f0f0f0",
                        color: "#333",
                        p: 2,
                        borderRadius: 2,
                        textAlign: "center",
                        boxShadow: 1,
                      }}
                    >
                      <Typography fontSize={24}>{item.icon}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.label}
                      </Typography>
                      <Typography variant="h6">{item.value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Hourly Forecast */}
          {forcasts?.forecast?.forecastday?.[0]?.hour && (
            <Box mt={2}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: "#ffffffdd",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mb={2}
                  color="textPrimary"
                >
                  Hourly Forecast for{" "}
                  {new Date(
                    forcasts.forecast.forecastday[0].date
                  ).toLocaleDateString()}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 2,
                    scrollbarWidth: "thin",
                    "&::-webkit-scrollbar": {
                      height: 6,
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#ccc",
                      borderRadius: 10,
                    },
                  }}
                >
                  {forcasts.forecast.forecastday[0].hour.map((hourData) => {
                    const time = new Date(hourData.time);
                    const currentDate = new Date();
                    const isToday =
                      time.toDateString() === currentDate.toDateString();

                    if (!isToday) return null;

                    return (
                      <Box
                        key={hourData.time}
                        sx={{
                          minWidth: 100,
                          p: 2,
                          borderRadius: 2,
                          textAlign: "center",
                          backgroundColor: "#f4f4f4",
                          color: "#000",
                          flexShrink: 0,
                        }}
                      >
                        <Typography variant="subtitle2" color="textSecondary">
                          {time.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <img
                          src={`https:${hourData.condition.icon}`}
                          alt={hourData.condition.text}
                          style={{ width: 40 }}
                        />
                        <Typography variant="h6">
                          {hourData.temp_c}°C
                        </Typography>
                        <Typography variant="caption">
                          {hourData.condition.text}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Paper>
            </Box>
          )}

          {/* 3-Day Forecast */}
          {forcasts?.forecast?.forecastday && (
            <Box mt={2}>
              <Grid container spacing={2}>
                {forcasts.forecast.forecastday.map((day) => (
                  <Grid item xs={12} sm={6} md={4} key={day.date}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        textAlign: "center",
                        backgroundColor: "#ffffffdd",
                      }}
                    >
                      <Typography variant="subtitle2" color="textSecondary">
                        {new Date(day.date).toLocaleDateString(undefined, {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                      <img
                        src={`https:${day.day.condition.icon}`}
                        alt={day.day.condition.text}
                        style={{ width: 50 }}
                      />
                      <Typography variant="h6">
                        {day.day.maxtemp_c}° / {day.day.mintemp_c}°C
                      </Typography>
                      <Typography variant="body2">
                        {day.day.condition.text}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
