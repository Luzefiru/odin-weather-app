# odin-weather-app

A weather forecast app that uses OpenWeatherMap's API to practice asynchronous JavaScript &amp; API data fetching.

This project allowed me to practice using the browser's `fetch()` command to do Cross-Origin Resource Sharing with an external API -- specifically the [OpenWeatherMap API](https://openweathermap.org/api). I used Promises and `async/await` to parse the data asynchronously utilizing the JavaScript Event Loop.

```JavaScript
async function getWeatherData(cityInput) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`,
    { mode: 'cors' }
  );
  const weatherData = await response.json();

  return weatherData;
}
```

I need to improve on:

- writing clean code
- planning out projects before doing them
- writing code with browser load speeds in mind

# Output

### [Visit the Website Here](https://luzefiru.github.io/odin-weather-app/)

<img src="./requirements/website-screenshot.png">

# Requirements

These were the requirements in The Odin Project's [Project: Weather App](https://www.theodinproject.com/lessons/node-path-javascript-weather-app) site to serve as project specifications. Website aesthetic choices and implementation solely depended on me, the programmer.
