require("dotenv").config();
const apiKey = process.env.OPENWEATHERMAP_API_KEY;

if (!apiKey) {
  console.error("API key is missing! Please set it in the .env file.");
  process.exit(1);
}

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (!city.trim()) {
    alert("Please enter a city name.");
    return;
  }

  document.querySelector(".loading").style.display = "block"; // Show loading

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch weather data.");
    }

    // Update UI with weather data
    document.querySelector(".city").innerHTML = data.name || "Unknown City";
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML =
      (data.main.humidity || 0) + "%";
    document.querySelector(".wind").innerHTML =
      (data.wind.speed || 0) + " km/hr";

    // Update weather icon
    const weatherType = data.weather[0]?.main || "Unknown";
    const iconMap = {
      Clouds: "images/clouds.png",
      Clear: "images/clear.png",
      Drizzle: "images/drizzle.png",
      Mist: "images/mist.png",
      Snow: "images/snow.png",
      Rain: "images/rain.png",
    };
    weatherIcon.src = iconMap[weatherType] || "images/default.png";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    searchBox.value = ""; // Clear search box
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } finally {
    document.querySelector(".loading").style.display = "none"; // Hide loading
  }
}

// Add event listeners
searchBtn.addEventListener("click", () => checkWeather(searchBox.value));
searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
