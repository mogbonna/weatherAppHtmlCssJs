const apiKey = "9c97ec982a8706295d3b43263537043e";
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

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

      // Update weather icon
      switch (data.weather[0].main) {
        case "Clouds":
          weatherIcon.src = "images/clouds.png";
          break;
        case "Clear":
          weatherIcon.src = "images/clear.png";
          break;
        case "Drizzle":
          weatherIcon.src = "images/drizzle.png";
          break;
        case "Mist":
          weatherIcon.src = "images/mist.png";
          break;
        case "Snow":
          weatherIcon.src = "images/snow.png";
          break;
        case "Rain":
          weatherIcon.src = "images/rain.png";
          break;
        default:
          weatherIcon.src = "images/default.png"; // Fallback for unknown weather
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
      searchBox.value = ""; // Clear search box
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Unable to fetch weather data. Please try again later.");
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
