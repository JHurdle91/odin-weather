const weatherContainer = document.querySelector('#response-container');
const img = document.querySelector('img');

const API_KEY_WEATHER = '5ca6719ea060fa3f56d3789dfb9461b8';
const API_KEY_GIF = 'CLCyDXF4J6YLPnlBS3LSi6MXVv9qAugg';
const city = 'atlanta';

const getWeather = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}`,
    { mode: 'cors' },
  );
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
};

const kelvinToFahrenheit = (K) => K * 1.8 - 459.67;

const processWeatherData = async () => {
  const rawData = await getWeather();
  const weatherObject = {
    cityId: rawData.id,
    cityName: rawData.name,
    description: rawData.weather[0].description,
    icon: rawData.weather[0].icon,
    temp: kelvinToFahrenheit(rawData.main.temp),
    tempMin: kelvinToFahrenheit(rawData.main.temp_min),
    tempMax: kelvinToFahrenheit(rawData.main.temp_max),
    sunrise: rawData.sys.sunrise,
    sunset: rawData.sys.sunset,
  };
  return weatherObject;
};

const getGif = async (description) => {
  console.log(description);
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY_GIF}&s=${description}&weirdness=10`,
    { mode: 'cors' },
  );
  const result = await response.json();
  return result;
};

const displayGif = async (description) => {
  const gif = await getGif(description);
  img.src = gif.data.images.original.url;
};

const displayWeather = async () => {
  const weather = await processWeatherData();
  weatherContainer.textContent = JSON.stringify(weather);
  displayGif(weather.description);
};

displayWeather();
