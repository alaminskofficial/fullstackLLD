const isGeolocationsSupported = "geolocation" in navigator;

const app = async () => {
  try {
    const locationData = await getCurrentUserLocationData();
    const weatherData = await getWeatherData(locationData.latitude, locationData.longitude);
    renderWeather(weatherData);
  } catch (error) {
    console.error("Something went wrong", error);
    alert("Something went wrong. Please check your internet or permissions.");
  }
};

const getCurrentUserLocationData = () => {
  if (!isGeolocationsSupported) throw new Error("Geolocation not supported on your device");
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => reject(error)
    );
  });
};

const getWeatherData = async (lat, lon) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=29a7ee8ac73a448cb3d111602251805&q=${lat},${lon}&aqi=yes`;
  const response = await fetch(url);
  return await response.json();
};

const renderWeather = (data) => {
  const {
    location,
    current: {
      temp_c,
      feelslike_c,
      condition,
      wind_kph,
      humidity,
      uv,
      vis_km,
      air_quality,
    },
  } = data;

  document.getElementById("location-name").textContent = `${location.name}, ${location.country}`;
  document.getElementById("local-time").textContent = `Local time: ${location.localtime}`;
  document.getElementById("condition").textContent = condition.text;
  document.getElementById("weather-icon").src = "https:" + condition.icon;

  document.getElementById("temperature").textContent = `${temp_c}°C`;
  document.getElementById("feelslike").textContent = `Feels like: ${feelslike_c}°C`;
  document.getElementById("humidity").textContent = `${humidity}%`;
  document.getElementById("wind").textContent = `${wind_kph} km/h`;
  document.getElementById("uv").textContent = uv;
  document.getElementById("visibility").textContent = `${vis_km} km`;

  // Air Quality
  document.getElementById("co").textContent = `${air_quality.co.toFixed(1)} µg/m³`;
  document.getElementById("no2").textContent = `${air_quality.no2.toFixed(1)} µg/m³`;
  document.getElementById("o3").textContent = `${air_quality.o3.toFixed(1)} µg/m³`;
  document.getElementById("pm25").textContent = `${air_quality["pm2_5"].toFixed(1)} µg/m³`;
  document.getElementById("pm10").textContent = `${air_quality.pm10.toFixed(1)} µg/m³`;
};

app();
