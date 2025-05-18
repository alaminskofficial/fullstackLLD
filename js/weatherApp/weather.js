// Use My Location button logic
document.getElementById("auto-location-btn").addEventListener("click", async () => {
    try {
      const locationData = await getCurrentUserLocationData();
      const weatherData = await getWeatherDataByLatLong(locationData.latitude, locationData.longitude);
      if (!weatherData || !weatherData.location || !weatherData.current) {
        throw new Error("Invalid weather data");
      }
      renderWeather(weatherData);
    } catch (error) {
      console.error("Location-based fetch failed", error);
      alert("Failed to detect location. Try entering a city instead.");
    }
  });
  
  // Manual city input logic
  document.getElementById("search-btn").addEventListener("click", async () => {
    const city = document.getElementById("search-input").value.trim();
    if (!city) return;
  
    try {
      const weatherData = await getWeatherDataByCity(city);
      if (!weatherData || !weatherData.location || !weatherData.current) {
        throw new Error("Invalid city weather data");
      }
      renderWeather(weatherData);
    } catch (error) {
      console.error("City-based fetch failed", error);
      alert("Could not fetch weather for that city. Try again.");
    }
  });
  

const app = async () => {
  try {
    //showSearchUI();
    const locationData = await getCurrentUserLocationData();
    const weatherData = await getWeatherDataByLatLong(locationData.latitude, locationData.longitude);
    renderWeather(weatherData);
  } catch (error) {
    console.error("Something went wrong", error);
    alert("Something went wrong. Please check your internet or permissions.");
    showSearchUI();
  }
};

// Show input UI for manual city search
const showSearchUI = () => {
    const searchBtn = document.getElementById("search-btn");
    searchBtn.addEventListener("click", async () => {
      const city = document.getElementById("search-input").value;
      if (city.trim()) {
        try {
          const weatherData = await getWeatherDataByCity(city);
          renderWeather(weatherData);
        } catch (error) {
          console.error("Manual city fetch failed", error);
          alert("Couldn't fetch weather for that city. Try again.");
        }
      }
    });
  };
  
  // Fetch weather by city name
  const getWeatherDataByCity = async (city) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=29a7ee8ac73a448cb3d111602251805&q=${city}&aqi=yes`;
    const response = await fetch(url);
    return await response.json();
  };
  // Fetch weather by latitude and longitude
  const getWeatherDataByLatLong = async (lat, lon) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=29a7ee8ac73a448cb3d111602251805&q=${lat},${lon}&aqi=yes`;
    const response = await fetch(url);
    return await response.json();
  };

// Get user's current location
const getCurrentUserLocationData = () => {
    if ("geolocation" in navigator) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          async () => {
            alert("Geolocation failed, using IP fallback.")
            console.warn("Geolocation failed, using IP fallback.");
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
  
  // Render weather data
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
// Initial call
app();
