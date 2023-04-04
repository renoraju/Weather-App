var getButton= document.getElementById("fetch-button")
var nameInputEl= document.getElementById("search-input")
var weatherList = document.getElementById("weather-info")
var searchBox = document.getElementById("search-form")
var citiesList = JSON.parse(localStorage.getItem('cities')) || []




const apiKey = '39b4b93d32191f9f02083f6acaa630f6';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=39b4b93d32191f9f02083f6acaa630f6&units=imperial&q=";

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = nameInputEl.value.trim();
  
    if (cityName) {
      getWeatherData(cityName);
      citiesList.push(cityName)
      localStorage.setItem('cities', JSON.stringify(citiesList))
  
      
      nameInputEl.value = '';
    } else {
      alert('Please enter a city name');
    }
  };

  

function getWeatherData(cityName){


 fetch(apiUrl + cityName)

  .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        document.querySelector(".city").innerHTML=  data.name 
        document.querySelector("#city-temp").innerHTML="Temp:" + data.main.temp + "°F"
        document.querySelector("#city-wind").innerHTML= "Wind:" + data.wind.speed + "MPH"
        document.querySelector("#city-humidity").innerHTML="Humidity:" + data.main.humidity + "%"

        let latitude = data.coord.lat
        let longitude = data.coord.lon
       getfutureForecast(latitude,longitude)
      });
  }

  function getfutureForecast(latitude,longitude){
     fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
     )
     .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      document.querySelector('.day-two').innerHTML = `
      <div class="day">${data.list[0].dt_txt}</div>
      <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"  alt="weather icon" class="w-icon">
      <div class="temp">Temp: ${data.list[0].main.temp}  </div> 
      <div id ="wind"> Wind:${data.list[0].wind.speed}mph    </div>
      <div id = "humidity"> Humidity:${data.list[0].main.humidity}%  </div>
      `

      document.querySelector('.day-three').innerHTML = `
      <div class="day">${data.list[2].dt_txt}</div>
      <img src="https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png"  alt="weather icon" class="w-icon">
      <div class="temp">Temp: ${data.list[2].main.temp}  </div> 
      <div id ="wind"> Wind:${data.list[2].wind.speed}mph    </div>
      <div id = "humidity"> Humidity:${data.list[2].main.humidity}%  </div>
      `
  
      document.querySelector('.day-four').innerHTML = `
      <div class="day">${data.list[11].dt_txt}</div>
      <img src="https://openweathermap.org/img/wn/${data.list[11].weather[0].icon}@2x.png"  alt="weather icon" class="w-icon">
      <div class="temp">Temp: ${data.list[11].main.temp}  </div> 
      <div id ="wind"> Wind:${data.list[11].wind.speed}mph    </div>
      <div id = "humidity"> Humidity:${data.list[11].main.humidity}%  </div>
      `
  
      document.querySelector('.day-five').innerHTML = `
      <div class="day">${data.list[18].dt_txt}</div>
      <img src="https://openweathermap.org/img/wn/${data.list[18].weather[0].icon}@2x.png"  alt="weather icon" class="w-icon">
      <div class="temp">Temp: ${data.list[18].main.temp}  </div> 
      <div id ="wind"> Wind:${data.list[18].wind.speed}mph    </div>
      <div id = "humidity"> Humidity:${data.list[18].main.humidity}%  </div>
      `

  
    })}

  searchBox.addEventListener('submit',formSubmitHandler)
