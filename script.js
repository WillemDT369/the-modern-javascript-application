let unit = "metric";
let appId = "973c1e93dca799be6bfb0246ebbab1b3";
let url = "api.openweathermap.org/data/2.5/weather?q="
    //TODO: add forecast

function searchWeather(cityName) {
    // also check `${}`syntax
    fetch("https://" + url + cityName + "&appid=" + appId + "&units=" + unit)
        // Convert data to json    
        .then(function(result) {
            return result.json()
        })
        .then(function(result) {
            displayWeatherInfo(result);
        })
        .catch(function() {
            // catch any errors
        });
}

function displayWeatherInfo(apiData) {
    console.log(apiData);
    // changing the background depending on which info it gets from the api
    let weather = apiData.weather[0].main;
    switch (weather) {
        case "Clear":
            document.body.style.backgroundImage = "url('./images/clear.jpg')";
            break;
        case "Clouds":
            document.body.style.backgroundImage = "url('./images/clouds.jpg')";
            break;
        case "Rain":
        case "Drizzle":
            document.body.style.backgroundImage = "url('./images/rain.jpg')";
        case "Mist":
            document.body.style.backgroundImage = "url('./images/mist.jpg')";
            break;
        case "Thunderstorm":
            document.body.style.backgroundImage = "url('./images/thunderstorm.jpg')";
            break;
        case "Snow":
            document.body.style.backgroundImage = "url('./images/snow.jpg')";
            break;

        default:
            break;
    }
    // assigning and inserting per element
    let forecastHeader = document.getElementById("forecastHeader");
    forecastHeader.innerText = apiData.name;

    let description = document.getElementById("description");
    description.innerHTML = apiData.weather[0].description;

    let weatherIcon = document.getElementById("weatherIcon");
    weatherIcon.src = "http://openweathermap.org/img/wn/" + apiData.weather[0].icon + ".png";

    let temperature = document.getElementById("temperature");
    temperature.innerHTML = "Todays temperature is " + Math.floor(apiData.main.temp) + "°C,";

    let temperatureFeel = document.getElementById("temperatureFeel");
    temperatureFeel.innerHTML = "but it feels like " + Math.floor(apiData.main.feels_like) + "°C"

    let windSpeed = document.getElementById("windSpeed");
    windSpeed.innerHTML = "Winds blows at " + apiData.wind.speed + "m/s";

    let windDirection = document.getElementById("windDirection");
    windDirection.innerHTML = "Wind direction is " + apiData.wind.deg + " degrees";

    let humidity = document.getElementById("humidity");
    humidity.innerHTML = "Humidity levels at " + apiData.main.humidity + "%";

    // making the weatherforecast visible when clicked
    weatherForecast.style.visibility = "visible";

}

document.getElementById("run").addEventListener("click", (event) => {
    // city has to be inside here otherwise it gets stuck in the first chosen city
    let city = document.getElementById("city").value;
    // cancels the default action (here: of the form action attribute) 
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    event.preventDefault();
    if (searchWeather(city))
        console.log(searchWeather(city));
})