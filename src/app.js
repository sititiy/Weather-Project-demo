function tellDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();
  let today = days[day];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${today} ${hours}:${minutes}`;
}
let now = new Date();
let date = document.querySelector("#date");
date.innerHTML = tellDate(now);

//////
function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute("class", "fa-solid fa-cloud main");

  //iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchingCity(city) {
  let apiKey = "3f99b1c138ce64911a1ec3ceb16fc81d";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchingCity(city);
}

function searchingPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchingPosition);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", submitCity);
//doesnt work while clicking but works with enter, why ??

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchingCity("New York");
