var countries = require('i18n-iso-countries');
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

let city = 'Cebu';
const apiKey = '9a11773e29c804c87a91ed347a5f94c0';

const searchButton = document.querySelector('.search button');

searchButton.addEventListener('click', () => {
  const city = document.querySelector('#search').value;
  refresh(city);
});

refresh(city);

function refresh(city) {
  getWeatherData(city).then((data) => {
    const dataString = JSON.stringify(data, null, 4);
    const city = data.name;
    const country = countries.getName(data.sys.country, 'en', {
      select: 'official',
    });
    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const humidity = data.main.humidity;
    console.log(dataString);
    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    const cloudiness = data.clouds.all;

    displayWeather(data);

    setWeatherData(
      city,
      country,
      temp,
      feelsLike,
      humidity,
      weatherDescription,
      weatherIcon,
      cloudiness
    );
  });
}

async function getWeatherData(cityInput) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`,
    { mode: 'cors' }
  );
  const weatherData = await response.json();

  return weatherData;
}

function setWeatherData(
  city,
  country,
  temperature,
  feelsLike,
  humidityVal,
  weatherDescription,
  weatherIcon,
  cloudinessVal
) {
  const weatherDesc = document.querySelector('.weather-desc');
  const name = document.querySelector('.name');
  const temp = document.querySelector('.data__temp');
  const tempFeelsLike = document.querySelector('.data__misc__feels-like');
  const humidity = document.querySelector('.data__misc__humidity');
  const cloudiness = document.querySelector('.data__misc__cloudiness');

  /* assign the passed in values to the webpage display */
  weatherDesc.innerHTML =
    `<img class="weather-desc__img" src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="cloudy">` +
    weatherDescription
      .split(' ')
      .map((e) => e.toUpperCase()[0] + e.toLowerCase().slice(1))
      .join(' ');
  name.textContent = `${city}, ${country}`;
  temp.textContent = temperature;
  tempFeelsLike.innerHTML =
    '<img src="./res/icons/thermometer.svg" alt="Thermometer" class="feels-like--icon">' +
    `Feels Like: ${feelsLike}`;
  humidity.innerHTML =
    '<img src="./res/icons/water-percent.svg" alt="Water Percent" class="humidity--icon">' +
    `Humidity: ${humidityVal}%`;
  cloudiness.innerHTML =
    '<img src="./res/icons/clouds.svg" alt="Cloudiness" class="cloudiness--icon">' +
    `Cloudiness: ${cloudinessVal}%`;
}

function displayWeather(data) {
  /* Set background depending on weather*/
  switch (data.weather[0].main) {
    case 'Clear':
      document.body.style.backgroundImage = 'url(../res/backgrounds/clear.jpg)';
      break;
    case 'Clouds':
      document.body.style.backgroundImage =
        'url(../res/backgrounds/cloudy.jpg)';
      break;
    case 'Rain':
    case 'Drizzle':
    case 'Mist':
      document.body.style.backgroundImage = 'url(../res/backgrounds/rain.jpg)';
      break;
    case 'Thunderstorm':
      document.body.style.backgroundImage =
        'url(../res/backgrounds/thunder.jpg)';
      break;
    case 'Snow':
      document.body.style.backgroundImage = 'url(../res/backgrounds/snow.jpg)';
      break;
    default:
      break;
  }
}
