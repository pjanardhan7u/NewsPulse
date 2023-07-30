const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const weatherContainer = document.getElementById("weatherContainer");

const apiKey = "fdf43363b4c291d49524c9ed352e0903"; // Replace with your valid OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

searchButton.addEventListener("click", () => {
    const location = locationInput.value.trim();

    // //if location is empty
    if (!location) {
        alert("Please enter a location");
        return;
    }

    fetchWeatherData(location);
});

function fetchWeatherData(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch((error) => console.error("Error fetching weather data:", error));
}

function displayWeather(weatherData) {
    weatherContainer.innerHTML = "";

    const locationName = weatherData.name;
    const description = weatherData.weather[0].description;
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const chanceOfRain = weatherData.clouds.all;

    const weatherInfo = document.createElement("div");
    weatherInfo.classList.add("weather-info");

    const locationNameElement = document.createElement("h2");
    locationNameElement.textContent = locationName;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = `Weather: ${description}`;

    const temperatureElement = document.createElement("p");
    temperatureElement.textContent = `Temperature: ${temperature}°C`;

    const humidityElement = document.createElement("p");
    humidityElement.textContent = `Humidity: ${humidity}%`;

    const chanceOfRainElement = document.createElement("p");
    chanceOfRainElement.textContent = `Chance of Rain: ${chanceOfRain}%`;

    weatherInfo.appendChild(locationNameElement);
    weatherInfo.appendChild(descriptionElement);
    weatherInfo.appendChild(temperatureElement);
    weatherInfo.appendChild(humidityElement);
    weatherInfo.appendChild(chanceOfRainElement);

    weatherContainer.appendChild(weatherInfo);
}
