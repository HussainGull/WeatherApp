let inputBox = document.querySelector('.js-input-box');
let searchButton = document.querySelector('.js-search-button');
let displayResult = document.querySelector('.result-sec-info');


let address;

inputBox.addEventListener("keydown", (e) => {

    if (e.key === 'Enter') {
        address = inputBox.value;

        const geocodingCity = async () => {
            let geocodingApi = `https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=672df8d0d83c3858856211cym223fb8`;
            const geocodedApi = await fetch(geocodingApi);
            let result = await geocodedApi.json();
            longitude = result[0].lon;
            latitude = result[0].lat;
        };

        geocodingCity().then(() => {
            console.log('Success');
        })
            .catch(() => {
                alert(('Check Spelling of City'))
            })
    }

    inputBox.addEventListener("click", (e) => {

        if (e.target === inputBox) {
            inputBox.value = '';
            displayResult.innerHTML = '';
        }

    })
});

function displayWeatherData() {
    let weatherDataParsed = JSON.parse(localStorage.getItem('weatherDataLS'));
    if (weatherDataParsed) {
        displayResult.innerHTML = '';
        Object.values(weatherDataParsed).forEach((value) => {
            displayResult.innerHTML += value + '<br>';
        });
    }
}

window.addEventListener('load', displayWeatherData);

searchButton.addEventListener('click', (e) => {

    const getWeather = async () => {
        const weatherApi = `http://api.weatherapi.com/v1/current.json?key=6c8c1c8203344b6789a140540240811&q=${latitude},${longitude}&aqi=no`;
        const response = await fetch(weatherApi);
        const data = await response.json();

        let weatherData = {
            time: `Time & Date: ${data.location.localtime}`,
            temperature: `Temperature: ${data.current.temp_c} °C`,
            feelsLike: `Feels Like: ${data.current.feelslike_c} °C`,
            wind: `Wind: ${data.current.wind_kph} kph`
        };

        localStorage.setItem('weatherDataLS', JSON.stringify(weatherData));

        displayResult.innerHTML = '';
        Object.values(weatherData).forEach((value) => {
            displayResult.innerHTML += value + '<br>';
        });
    };

    getWeather().then(() => {
        console.log("Weather data successfully retrieved and saved.");
    }).catch(() => {
        console.log("Error retrieving weather data.");
    });
});












