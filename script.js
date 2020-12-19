let unit = "metric";
let apiKey = "973c1e93dca799be6bfb0246ebbab1b3";
let urlToday = "api.openweathermap.org/data/2.5/weather?q=";
let urlForecast = "api.openweathermap.org/data/2.5/onecall?";


document.getElementById("run").addEventListener("click", (event) => {
    // city has to be inside here otherwise it gets stuck in the first chosen city
    // cancels the default action (here: of the form action attribute) 
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    let city = document.getElementById("city").value;
    event.preventDefault();
    if (searchWeather(city)) {
        searchWeather(city);
    }
});

searchWeather = (cityName) => {

    fetch(`https://${urlToday}${cityName}&appid=${apiKey}&units=${unit}`)
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

// Current weather section
displayWeatherInfo = (apiData) => {
    console.log(apiData);

    //TODO: Change background when after sunset and from morning till sunset, local time or according to city with other api

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
    weatherIcon.src = `http://openweathermap.org/img/wn/${apiData.weather[0].icon}.png`;

    //TODO: Adjust temperatures according to part of the day
    let temperature = document.getElementById("temperature");
    temperature.innerHTML = `Thermometer says<br><span>${Math.floor(apiData.main.temp)} °C,</span>`;

    let temperatureFeel = document.getElementById("temperatureFeel");
    if (Math.floor(apiData.main.feels_like) > Math.floor(apiData.main.temp)) {
        temperatureFeel.innerHTML = `Rather feels like<br><span>${Math.floor(apiData.main.feels_like)} °C</span>, nice`;
    } else {
        temperatureFeel.innerHTML = `Rather feels like<br><span>${Math.floor(apiData.main.feels_like)} °C</span>, ahh bummer`;
    };
    let windSpeed = document.getElementById("windSpeed");
    windSpeed.innerHTML = `Wind blows at ${apiData.wind.speed} m/s`;

    let windDegrees = apiData.wind.deg;
    let windDirection = document.getElementById("windDirection");

    windDirection.innerHTML = `Wind direction is ${degreesToCompass(windDegrees)}`

    // Converting degrees to wind direction
    function degreesToCompass(num) {
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    let humidity = document.getElementById("humidity");
    humidity.innerHTML = `Humidity levels at ${apiData.main.humidity} %`;

    // Making the weatherforecast visible when clicked
    weatherForecast.style.visibility = "visible";
}



getLongitude = (data) => {
        long = data.coord.lon;
        lat = data.coord.lat;

        forecastInfo = () => {

            fetch(`https://${urlForecast}lat=${lat}&lon=${long}&units=${unit}&appid=${apiKey}`)
                // Convert data to json    
                .then(function(result) {
                    return result.json()
                })
                .then(function(result) {
                    getForecast(result);
                })
                .catch(function() {
                    // Catch any errors
                });
        }
        forecastInfo();

    }
    // Forecast section

getForecast = (forecastData) => {
    console.log(forecastData);

    // Creating days of week

    // Get date From UNIX Timestamp
    let day1 = new Date(forecastData.daily[1].dt * 1000);
    let day2 = new Date(forecastData.daily[2].dt * 1000);
    let day3 = new Date(forecastData.daily[3].dt * 1000);
    let day4 = new Date(forecastData.daily[4].dt * 1000);
    let day5 = new Date(forecastData.daily[5].dt * 1000);

    // Getting the days in numbers for the forecast
    let dayOfForecast1 = day1.getDay();
    let dayOfForecast2 = day2.getDay();
    let dayOfForecast3 = day3.getDay();
    let dayOfForecast4 = day4.getDay();
    let dayOfForecast5 = day5.getDay();


    let daysOfForecastInNumbers = [

        dayOfForecast1,
        dayOfForecast2,
        dayOfForecast3,
        dayOfForecast4,
        dayOfForecast5,

    ];

    let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Assigning the days to the corresponding html element

    let day1Day = document.getElementById("day-1-day");
    let day2Day = document.getElementById("day-2-day");
    let day3Day = document.getElementById("day-3-day");
    let day4Day = document.getElementById("day-4-day");
    let day5Day = document.getElementById("day-5-day");

    let daysOfForecast = [

        day1Day,
        day2Day,
        day3Day,
        day4Day,
        day5Day,

    ];

    for (i = 0; i < daysOfForecast.length; i++) {

        daysOfForecast[i].innerHTML = daysOfWeek[daysOfForecastInNumbers[i]];

    };

    // Assigning the temperatures to the corresponding html element

    let day1Temp = document.getElementById("day-1-temperature");
    let day2Temp = document.getElementById("day-2-temperature");
    let day3Temp = document.getElementById("day-3-temperature");
    let day4Temp = document.getElementById("day-4-temperature");
    let day5Temp = document.getElementById("day-5-temperature");

    let dayTemperatures = [

        day1Temp,
        day2Temp,
        day3Temp,
        day4Temp,
        day5Temp,
    ];

    for (i = 0; i < dayTemperatures.length; i++) {

        dayTemperatures[i].innerHTML = `${Math.floor(forecastData.daily[i + 1].temp.day)}°c`;
    };


    // Assigning a small description to the corresponding html element

    let day1Description = document.getElementById("day-1-description");
    let day2Description = document.getElementById("day-2-description");
    let day3Description = document.getElementById("day-3-description");
    let day4Description = document.getElementById("day-4-description");
    let day5Description = document.getElementById("day-5-description");

    let dayDescriptions = [

        day1Description,
        day2Description,
        day3Description,
        day4Description,
        day5Description,

    ];

    for (i = 0; i < dayDescriptions.length; i++) {

        dayDescriptions[i].innerHTML = forecastData.daily[i + 1].weather[0].main;;
    };

}