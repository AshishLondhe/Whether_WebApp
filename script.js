document.getElementById('search-button').addEventListener('click', fetchWeather);
document.getElementById('input-box').addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
        fetchWeather();
    }
});

function fetchWeather() {
    const city = document.getElementById('input-box').value;
    if (city === "") {
        swal("Error", "Please enter a city name", "error");
        return;
    }

    const apiKey = 'efcbec87a6ca9e8f0967bacc5abb0e87'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                swal("Error", "City not found", "error");
                return;
            }

            const weatherBody = document.getElementById('weather-body');
            weatherBody.style.display = 'block';
            weatherBody.innerHTML = `
                <div class="location-deatils">
                    <div class="city">${data.name}, ${data.sys.country}</div>
                    <div class="date">${dateManage(new Date())}</div>
                </div>
                <div class="weather-status">
                    <div class="temp">${Math.round(data.main.temp)}&deg;C</div>
                    <div class="weather">${data.weather[0].main} <i class="${getIconClass(data.weather[0].main)}"></i></div>
                    <div class="min-max">${Math.floor(data.main.temp_min)}&deg;C (min) / ${Math.ceil(data.main.temp_max)}&deg;C (max)</div>
                    <div>Updated as of ${getTime(new Date())}</div>
                </div>
                <hr>
                <div class="day-details">
                    <div class="basic">Feels like ${data.main.feels_like}&deg;C | Humidity ${data.main.humidity}% | Pressure ${data.main.pressure} mb | Wind ${data.wind.speed} KMPH</div>
                </div>
            `;
            changeBg(data.weather[0].main);
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            swal("Error", "An error occurred while fetching the weather data", "error");
        });
}

function getTime(todayDate) {
    let hour = addZero(todayDate.getHours());
    let minute = addZero(todayDate.getMinutes());
    return `${hour}:${minute}`;
}

function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}

function changeBg(status) {
    const backgrounds = {
        'Clouds': 'url(img/clouds.jpg)',
        'Rain': 'url(img/rainy.jpg)',
        'Clear': 'url(img/clear.jpg)',
        'Snow': 'url(img/snow.jpg)',
        'Sunny': 'url(img/sunny.jpg)',
        'Thunderstorm': 'url(img/thunderstorm.jpg)',
        'Drizzle': 'url(img/drizzle.jpg)',
        'Mist': 'url(img/mist.jpg)',
        'Haze': 'url(img/mist.jpg)',
        'Fog': 'url(img/mist.jpg)'
    };
    document.body.style.backgroundImage = backgrounds[status] || 'url(img/bg.jpg)';
}

function getIconClass(weather) {
    const icons = {
        'Rain': 'fas fa-cloud-showers-heavy',
        'Clouds': 'fas fa-cloud',
        'Clear': 'fas fa-sun',
        'Snow': 'fas fa-snowman',
        'Sunny': 'fas fa-sun',
        'Mist': 'fas fa-smog',
        'Thunderstorm': 'fas fa-bolt',
        'Drizzle': 'fas fa-cloud-rain'
    };
    return icons[weather] || 'fas fa-cloud-sun';
}

function addZero(i) {
    return (i < 10) ? "0" + i : i;
}
``
