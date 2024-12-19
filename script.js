const apiKey = "80b9dd38e5504efef0ed6c719d83956e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const unit = document.querySelector(".unit"); // Reference to the unit selection dropdown
const desc = document.querySelector(".desc"); // Reference to the weather description element

async function getWeatherData(city, unit) {
    try {
        const response = await fetch(`${apiUrl}q=${city}&units=${unit}&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            console.log(data);

            document.querySelector(".city").innerText = data.name;
          document.querySelector(".temp").innerText = Math.round(data.main.temp) + (unit === "metric" ? "°C" : "°F");

            document.querySelector(".humidity").innerText = data.main.humidity + "%";
            document.querySelector(".wind").innerText = data.wind.speed + "km/h";
            document.querySelector(".desc").innerText = data.weather[0].description;

            if (data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main == "Snow") {
                weatherIcon.src = "images/snow.png";
            }

            document.querySelector(".weather").style.display = "block"; // show weather
            document.querySelector(".error").style.display = "none"; // hide error
        } else {
            const errorMessage = data.message || "City not found.";
            showError(errorMessage);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        showError("An error occurred while fetching data.");
    }
}

function showError(message) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").innerText = message;
}

searchButton.addEventListener("click", () => {
    const selectedUnit = unit.value; // Get the selected unit (metric or imperial)
    console.log(searchInput.value);
    getWeatherData(searchInput.value, selectedUnit);
});
