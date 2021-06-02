const iconContainer = document.querySelector('#icon');
const inputField = document.querySelector('#city-input');

const API_KEY_WEATHER = '5ca6719ea060fa3f56d3789dfb9461b8';
const API_KEY_GIF = 'CLCyDXF4J6YLPnlBS3LSi6MXVv9qAugg';
let city = 'atlanta';

const getWeather = async () => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}`,
    { mode: 'cors' },
  );
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
};

const kelvinToFahrenheit = (K) => Math.round(K * 1.8 - 459.67);

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
  // gifContainer.src = gif.data.images.original.url;
  const gifUrl = gif.data.images.original.url;
  const body = document.querySelector('body');
  body.style.cssText = `background-image:url(${gifUrl});background-size:cover;`;
};

const displayIcon = async (iconId) => {
  const Url = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  iconContainer.src = Url;
};

const displayWeather = async () => {
  const weather = await processWeatherData();
  console.log(weather);
  const cityTag = document.querySelector('#city');
  const currentTemp = document.querySelector('#current-temp');
  const minTemp = document.querySelector('#min-temp');
  const maxTemp = document.querySelector('#max-temp');
  const descriptionTag = document.querySelector('#description');

  cityTag.textContent = weather.cityName;
  currentTemp.textContent = `${weather.temp}°F`;
  minTemp.textContent = `${weather.tempMin}°`;
  maxTemp.textContent = `${weather.tempMax}°`;
  descriptionTag.textContent = weather.description;

  displayGif(weather.description);
  displayIcon(weather.icon);
};

const updateCity = () => {
  city = inputField.value;
  displayWeather();
};

displayWeather();
