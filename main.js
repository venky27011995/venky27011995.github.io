const api = {
    key : "76c640da191baa9c37f416c278bf3807",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchBox.value)
        console.log(searchBox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);

    let city= document.querySelector('.city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    //date
    let today = new Date();
    let date = document.querySelector('.date');
    date.innerHTML = dateBuilder(today);

    let temp =document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp).toFixed(1)}<span>°c</span>`;

    let feelslike = document.querySelector('.weather');
    feelslike.innerHTML = weather.weather[0].main;

    let temp_min_max = document.querySelector('.high-low');
    temp_min_max.innerHTML = `${weather.main.temp_min}<span>°c</span> <span>/</span> ${weather.main.temp_max}<span>°c</span> `;

    if(feelslike == 'Clouds'){
        alert("seems like cloudy weather");}
}

function dateBuilder (d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    

    return `${day} ${date} ${month} ${year}`;
}