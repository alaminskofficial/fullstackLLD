import { connect } from "react-redux";

export const getWeatherDataByCity = async (city) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=29a7ee8ac73a448cb3d111602251805&q=${city}&aqi=yes`;
    const response = await fetch(url);
    return await response.json();
  };
  
  export const getWeatherDataByLatLong = async (lat, lon) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=29a7ee8ac73a448cb3d111602251805&q=${lat},${lon}&aqi=yes`;
    const response = await fetch(url);
    return await response.json();
  };

  export const getWeatherWithForecast = async (q) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=29a7ee8ac73a448cb3d111602251805&q=${q}&days=3&aqi=yes&alerts=no`;
    const res = await fetch(url);
    return res.json();
  };
  
  export const getCurrentUserLocationData = () => {
    if ('geolocation' in navigator) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          async () => {
            alert("Geolocation failed, using IP fallback.");
            const res = await fetch("https://ipapi.co/json/");
            const data = await res.json();
            resolve({
              latitude: data.latitude,
              longitude: data.longitude,
            });
          }
        );
      });
    } else {
      throw new Error("Geolocation not supported.");
    }
  };
  