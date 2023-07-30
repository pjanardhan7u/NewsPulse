const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const weatherContainer = document.getElementById("weatherContainer");

const apiKey = "fdf43363b4c291d49524c9ed352e0903";
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const dailyForecastUrl = "https://api.openweathermap.org/data/2.5/forecast/daily";

function fetchCurrentWeather(location) {
    const currentWeatherUrlWithParams = `${currentWeatherUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrlWithParams)
        .then((response) => response.json())
        .then((data) => {
            fetchDailyForecast(data.coord.lat, data.coord.lon);
            displayCurrentWeather(data);
        })
        .catch((error) => console.error("Error fetching current weather data:", error));
}

function fetchDailyForecast(latitude, longitude) {
    const dailyForecastUrlWithParams = `${dailyForecastUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&cnt=1`;

    fetch(dailyForecastUrlWithParams)
        .then((response) => response.json())
        .then((data) => displayDailyForecast(data))
        .catch((error) => console.error("Error fetching daily forecast data:", error));
}

function displayCurrentWeather(weatherData) {
    weatherContainer.innerHTML = '';

    const locationName = weatherData.name;
    const description = weatherData.weather[0].description;
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;

    const weatherInfo = document.createElement('div');
    weatherInfo.classList.add('weather-info');

    const locationNameElement = document.createElement('h2');
    locationNameElement.textContent = locationName;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Weather: ${description}`;

    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperature: ${temperature}°C`;

    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${humidity}%`;

    weatherInfo.appendChild(locationNameElement);
    weatherInfo.appendChild(descriptionElement);
    weatherInfo.appendChild(temperatureElement);
    weatherInfo.appendChild(humidityElement);

    weatherContainer.appendChild(weatherInfo);
}

function displayDailyForecast(dailyForecastData) {
    const highTemp = dailyForecastData.list[0].temp.max;
    const lowTemp = dailyForecastData.list[0].temp.min;
    const chanceOfRain = dailyForecastData.list[0].pop * 100;

    const dailyForecastInfo = document.createElement('div');
    dailyForecastInfo.classList.add('daily-forecast-info');

    const highTempElement = document.createElement('p');
    highTempElement.textContent = `High Temperature: ${highTemp}°C`;

    const lowTempElement = document.createElement('p');
    lowTempElement.textContent = `Low Temperature: ${lowTemp}°C`;

    const chanceOfRainElement = document.createElement('p');
    chanceOfRainElement.textContent = `Chance of Rain: ${chanceOfRain}%`;

    dailyForecastInfo.appendChild(highTempElement);
    dailyForecastInfo.appendChild(lowTempElement);
    dailyForecastInfo.appendChild(chanceOfRainElement);

    weatherContainer.appendChild(dailyForecastInfo);
}

searchButton.addEventListener("click", () => {
    const location = locationInput.value.trim();

    // //if location is empty
    if (!location) {
        alert("Please enter a location");
        return;
    }

    if (location) {
        fetchCurrentWeather(location);
        displayDailyForecast(location);
    }
});
