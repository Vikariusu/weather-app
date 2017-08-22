var city;
var temperature;
var wind;
var weatherCondition;
var isRaining;
var cloudCoverage;
var temperatureType;

function renderPage() {
  $(".convert-btn").removeClass("hidden");

  $(".text").html(`<p class="weather-p">You're in <span class="city"></span>. The temperature is <span class="temperature"></span>, with <span class="description"></span> and a wind speed of <span class="wind"></span>.</p>
`);
  $(".city").html(city);
  $(".temperature").html(`${Math.round(temperature)} ${temperatureType}`);
  $(".description").html(weatherCondition);
  $(".wind").html(`${wind} m/s`);
  $(".container").css(`background-image`, `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.2)), url(${changeBackground()})`);
}

function changeBackground() {

  if (isRaining) {
    return "https://images.unsplash.com/photo-1485797460056-2310c82d1213?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=";
  } else if (weatherCondition == "scattered clouds" || weatherCondition == "broken clouds") {
    return "https://images.unsplash.com/photo-1455735459330-969b65c65b1c?dpr=2&auto=format&fit=crop&w=1080&h=718&q=80&cs=tinysrgb&crop=";
  } else if (weatherCondition == "few clouds") {
    return "https://images.unsplash.com/photo-1432879697443-4ab411c5962d?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=";
  } else if (cloudCoverage > 70) {
    return "https://images.unsplash.com/photo-1468268182561-2967b44d231e?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=";
  } else if (weatherCondition == "clear sky") {
    return "https://images.unsplash.com/photo-1455243732493-b877e31e0fae?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=";
  } else {
    return "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?dpr=2&auto=format&fit=crop&w=1080&h=715&q=80&cs=tinysrgb&crop=";
  }
}

function convertTemp() {
  console.log(this);
  if(temperatureType == "C") {
    temperatureType = "F";
    temperature = (temperature * 9/5) + 32;
  } else {
    temperatureType = "C";
    temperature = (temperature - 32) * 5/9;
  }
}

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = Math.round(position.coords.latitude * 10) / 10;
      let lon = Math.round(position.coords.longitude * 10) / 10;

      $.getJSON(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`, function(json) {
        // console.log(json);
        temperature = json.main.temp;
        city = json.name;
        weatherCondition = json.weather[0].description;
        wind = json.wind.speed;
        if (json.rain == undefined) {
          isRaining = false;
        } else {
          isRaining = true;
        }
        cloudCoverage = json.clouds.all;
        temperatureType = "C";

        renderPage();

        $(".convert-btn").click(function() {
          convertTemp();
          renderPage();
        });
      });
    });
  };
})
