let unit = "metric";
let apiKey = "973c1e93dca799be6bfb0246ebbab1b3";
let urlToday = "api.openweathermap.org/data/2.5/weather?q=";
let urlForecast = "api.openweathermap.org/data/2.5/onecall?";
let city = document.getElementById("city").value;
let longitude = 50.98;
let latitude = 3.87;

//TODO: fix stuck value of city
document.getElementById("run").addEventListener("click", (event) => {
    // city has to be inside here otherwise it gets stuck in the first chosen city
    // cancels the default action (here: of the form action attribute) 
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    event.preventDefault();
    if (searchWeather(city)) {
        searchWeather(city);
    }
    if (forecastInfo(city)) {
        forecastInfo(city)
    }
})

function searchWeather(cityName) {
    console.log(cityName);
    // also check `${}`syntax
    fetch("https://" + urlToday + cityName + "&appid=" + apiKey + "&units=" + unit)
        // Convert data to json    
        .then(function(result) {
            return result.json()
        })
        .then(function(result) {
            displayWeatherInfo(result);
            getLongitude(result);
        })
        .catch(function() {
            // catch any errors
        });
}
//TODO: get long and latit out of the function or find other way to make it work
function getLongitude(data) {
    let long = data.coord.lon;
    let latit = data.coord.lat;
    console.log(long, latit);
    // return long;
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
    windSpeed.innerHTML = "Wind blows at " + apiData.wind.speed + "m/s";

    let windDirection = document.getElementById("windDirection");
    windDirection.innerHTML = "Wind direction is " + apiData.wind.deg + " degrees";

    let humidity = document.getElementById("humidity");
    humidity.innerHTML = "Humidity levels at " + apiData.main.humidity + "%";

    // making the weatherforecast visible when clicked
    weatherForecast.style.visibility = "visible";
}

function forecastInfo() {
    // also check `${}`
    // Using a default setting from api to test, needs to get coordinates50.98
    //

    fetch("https://" + urlForecast + "lat=" + longitude + "&lon=" + latitude + "&units=" + unit + "&appid=" + apiKey)
        // Convert data to json    
        .then(function(result) {
            return result.json()
        })
        .then(function(result) {
            getForecast(result);
        })
        .catch(function() {
            // catch any errors
        });
}
//TODO: create days of the week for forecast
function getForecast(forecastData) {
    console.log(forecastData);
    // Assigning the days to the corresponding html element
    let day1Day = document.getElementById("day-1-day");
    day1Day.innerHTML;

    let day2Day = document.getElementById("day-2-day");
    day2Day.innerHTML;

    let day3Day = document.getElementById("day-3-day");
    day3Day.innerHTML;

    let day4Day = document.getElementById("day-4-day");
    day4Day.innerHTML;

    let day5Day = document.getElementById("day-5-day");
    day5Day.innerHTML;
    //TODO: try making for-loops
    //// Assigning the temperatures to the corresponding html element
    for (i = 1; i < 6; i++) {}

    let day1Temp = document.getElementById("day-1-temperature");
    day1Temp.innerHTML = Math.floor(forecastData.daily[1].temp.day) + "°c";

    let day2Temp = document.getElementById("day-2-temperature");
    day2Temp.innerHTML = Math.floor(forecastData.daily[2].temp.day) + "°c";

    let day3Temp = document.getElementById("day-3-temperature");
    day3Temp.innerHTML = Math.floor(forecastData.daily[3].temp.day) + "°c";

    let day4Temp = document.getElementById("day-4-temperature");
    day4Temp.innerHTML = Math.floor(forecastData.daily[4].temp.day) + "°c";

    let day5Temp = document.getElementById("day-5-temperature");
    day5Temp.innerHTML = Math.floor(forecastData.daily[5].temp.day) + "°c";

    // Assigning a small description to the corresponding html element
    let day1Description = document.getElementById("day-1-description");
    day1Description.innerHTML = forecastData.daily[1].weather[0].main;

    let day2Description = document.getElementById("day-2-description");
    day2Description.innerHTML = forecastData.daily[2].weather[0].main;

    let day3Description = document.getElementById("day-3-description");
    day3Description.innerHTML = forecastData.daily[3].weather[0].main;

    let day4Description = document.getElementById("day-4-description");
    day4Description.innerHTML = forecastData.daily[4].weather[0].main;

    let day5Description = document.getElementById("day-5-description");
    day5Description.innerHTML = forecastData.daily[5].weather[0].main;

}