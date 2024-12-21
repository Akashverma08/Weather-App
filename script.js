const inputBox=document.querySelector(".input-box");
const searchBtn=document.getElementById("searchBtn");
const weather_img=document.querySelector(".weather-img");
const temperature=document.querySelector(".temperature");
const description=document.querySelector(".description");
const humidity=document.getElementById("humidity");
const wind=document.getElementById("wind-speed");
const location_not_found=document.querySelector(".location-not-found");
const weather_body=document.querySelector(".weather-body");

//Event Perform after click
searchBtn.addEventListener('click',()=>{
    checkWeather(inputBox.value);
});

//Function call and fetch city data using api keys
async function checkWeather(city){
    const api_key="5c8f28e4b5ddaa0f3debd289debeb79d";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data=await fetch(`${url}`).then(response => response.json());
//Handle Error
    if(weather_data.cod===`404`){
        location_not_found.style.display="flex";
        weather_body.style.display="none";
        console.log("error");
        return;

    }
    location_not_found.style.display="none";

    weather_body.style.display="flex";
        
    

    console.log(weather_data);
// Fetch temp,description,humidity,wind details from API (use open weather website for API call).

    temperature.innerHTML=`${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML=`${weather_data.weather[0].description}`;
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind.innerHTML=`${weather_data.wind.speed}Km/Hr`;


//switch Image based on Current weather of particular location
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src="images/cloud.png";
            break;
        case 'Clear':
            weather_img.src="images/clear.png";
            break;
        
        case 'Smoke':
            weather_img.src="images/mist.png";
            break;
        
        case 'Drizzle':
            weather_img.src="images/rain.png";
            break;
        
        case 'Snow':
            weather_img.src="images/snow.png";
            break;
    }

}