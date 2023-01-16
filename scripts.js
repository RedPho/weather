var cityNow = "Ankara";
var unitNow = "metric";
let unitsBtn = document.getElementById("inputUnits");
let windSpeedNode = document.getElementById("wind_speed");
let windSpeedUnit = document.getElementById("windSpeedUnit");

const processData = function(jsonData) {
  let name = jsonData.name;
  let temp = jsonData.main.temp;
  let feels_like = jsonData.main.feels_like;
  let humidity = jsonData.main.humidity;
  let temp_max = jsonData.main.temp_max;
  let temp_min = jsonData.main.temp_min;
  let country = jsonData.sys.country;
  let weather_main = jsonData.weather[0].main;
  let wind_speed = jsonData.wind.speed;
  let information = {
    name: name,
    temp: temp,
    feels_like: feels_like,
    humidity: humidity,
    temp_max: temp_max,
    temp_min: temp_min,
    country: country,
    weather_main: weather_main,
    wind_speed: wind_speed,
  }
  return information;
}

async function getAndProcessData(city, units) {
  let response = await fetch("https://api.openweathermap.org/data/2.5/weather?APPID=0c0060768f08926af0aeabe5a07a7597&units=" + units + "&q=" + city);
  data = await response.json();
  let myObject = processData(data);
  return myObject;
}

async function showData(city, units) {
  let cityObject = await getAndProcessData(city, units);
  for (let [key, value] of Object.entries(cityObject)) {
    let htmlNode = document.getElementById(key);
    htmlNode.innerText = value;
  }
  if (unitNow == "metric") {
    windSpeedNode.innerText = (windSpeedNode.innerText *= 3.6).toFixed(2); 
  }
}

showData(cityNow, unitNow);

let searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", () => {
  cityNow = document.getElementById("inputCity").value;
  showData(cityNow, unitNow);
  document.getElementById("inputCity").value = ""
})

let inputPlace = document.getElementById("inputCity");
inputPlace.addEventListener("keypress", (e) => {
  if (e.key =="Enter") {
    searchBtn.click();
  }
})

unitsBtn.addEventListener("click", () => {
  let unitsInDOM = document.querySelectorAll(".units");
  if (unitsBtn.innerText == "°C") {
    unitsBtn.innerText = "°F";
    unitNow = "imperial";
    windSpeedUnit.innerText = "mph";
  }
  else {
    unitsBtn.innerText = "°C";
    unitNow = "metric";
    windSpeedUnit.innerText = "km/h"
  }
  unitsInDOM.forEach((unit) => {
    unit.innerText = unitsBtn.innerText;
  })
  showData(cityNow, unitNow);
})
