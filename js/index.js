let searchInp = document.getElementById("searchInp");
let weatherArea=document.getElementById("weatherArea")
let data =[] ;

function getWeatherForUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showWeather, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getCityByCoordinates(lat, lon);
}

function showError(error) {
    if (error.code === error.PERMISSION_DENIED) {
      getWeather("cairo");
    } else {
      alert("Error getting location.");
    }
}

async function getCityByCoordinates(lat, lon) {
    try {
     
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3a50e20aeb514ff9b5a132853241012&q=${lat},${lon}&days=3`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        let finalResponse = await response.json();  
        data = finalResponse; 
        console.log(data);
         
        displayWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);   
      }
  }

async function getWeather(city) {
    try {
     
      let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3a50e20aeb514ff9b5a132853241012&q=${city}&days=3`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      let finalResponse = await response.json();  
      data = finalResponse; 
      displayWeather(data);
    } 
    catch (error) {
      console.error('Error fetching weather data:', error);   
    }
  }

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


  function getDay(){
    const today = new Date();
    const dayNameToday = daysOfWeek[today.getDay()];
    return dayNameToday
  }
  function getNextDay(){
    const today = new Date();
    const dayNameToday = daysOfWeek[today.getDay()+1];
    return dayNameToday
  }
  function getNextNextDay(){
    const today = new Date();
    const dayNameToday = daysOfWeek[today.getDay()+2];
    return dayNameToday
  }
  function getTheMonth(){
    const today = new Date();
    const dayDateToday = today.getDate();
    const monthNameToday = months[today.getMonth()];
    return `${dayDateToday} ${monthNameToday}`;
  }
 function displayWeather(data){
    cartona=`
    <div class="col-md-4">
              <div class="myCard rounded-4 text-white overflow-hidden">
                <div class="headCard d-flex align-items-center justify-content-between text-center px-4  fw-medium">
                  <p class="day mt-2">${getDay()}</p>
                  <p class="date  mt-2">${getTheMonth()}</p>
                </div>
                <div class="contentCard px-4">
                  <h2 class="city mt-5 fs-4 ">${data.location.name}</h2>
                  <p class="display-2 fw-bold">${
                    data.current.temp_c
                  }<sup>o</sup>C</p>
                  <img src="https:${data.current.condition.icon}" alt="status weather" class="w-25">
                  <p class="statu mt-3 fs-6 text-info">${data.current.condition.text}</p>
                </div>
                <div class="footerCard">
                  <div class="wind px-4 mt-5 mb-3">
                    <span class="me-4"><i class="fa-solid fa-umbrella me-2 sceondColor"></i> ${data.current.feelslike_c}%</span>
                    <span class="me-4"><i class="fa-solid fa-wind me-2 sceondColor"></i> ${data.current.wind_kph} km/h</span>
                    <span><i class="fa-solid fa-compass me-2 sceondColor"></i>${data.current.wind_dir}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="mySecCard rounded-4 text-white overflow-hidden h-100">
                <div class="headCard date color5 fw-medium d-flex justify-content-center px-4 ">
                  <p class="nextDay mt-2">${getNextDay()}</p>
                </div>
                <div class="contentCard px-4 text-center mt-4">
                  <img src="https:${data.forecast.forecastday[1].day.condition.icon}"alt="status weather" class="w-25">
                  <p class="fs-2 fw-semibold mb-0 mt-4">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</p>
                  <small class="fs-5 opacity-75">${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
                  <p class="statu mt-4 fs-6 text-info">${data.forecast.forecastday[1].day.condition.text}</p>
                </div>
                
              </div>
            </div>
            <div class="col-md-4">
              <div class="myCard rounded-4 text-white overflow-hidden h-100">
                <div class="headCard date color5 fw-medium d-flex justify-content-center px-4 ">
                  <p class="nextDay mt-2">${getNextNextDay()}</p>
                </div>
                <div class="contentCard px-4 text-center mt-4">
                  <img src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="status weather" class="w-25">
                  <p class="fs-2 fw-semibold mb-0 mt-4">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</p>
                  <small class="fs-5 opacity-75">${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
                  <p class="statu mt-4 fs-6 text-info">${data.forecast.forecastday[2].day.condition.text}</p>
                </div>
                
              </div>
            </div>
    `;
    weatherArea.innerHTML=cartona;
   
 }
 getWeatherForUserLocation();

 searchInp.addEventListener('input',function(){
    getWeather(searchInp.value) 
 })

