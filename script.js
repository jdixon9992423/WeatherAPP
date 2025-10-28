document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeather = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");

  const cityNameDisp = document.getElementById("city-name");
  const tempDisplay = document.getElementById("temperature");
  const description = document.getElementById("description");

  const errorMessage = document.getElementById("error-message");

  const API_KEY = "b4b21fdb9ef074f482a34c589e1a302f"; //env variables

  getWeather.addEventListener("click", async () => {
    console.log("clicked");
    errorMessage.classList.add("hidden"); //hide error message from past query when get weather is clicked
    weatherInfo.classList.add("hidden"); // hide weather info from past query when get weather is clicked

    const city = cityInput.value.trim();
    console.log(city);

    if (!city) return; //if there is not city (empty string in javscript treated as false) do nothing

    //it may throw and error so use try catch
    //server/database may be in another continent- take time to responsd, needs to be async

    try {
      const weatherData = await fetchWeatherData(city); //have to add an async on the parent function to use await i.e. beside the click above
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    // add async to the function to use with await or it throw error
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    //console.log(url);

    const response = await fetch(url);
    //console.log(typeof response);
    //console.log("RESPONSE:", response);

    //console.log("OK State: ", response.ok);

    if (!response.ok) {
      throw new Error("City Not Found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(weatherData) {
    //display
    console.log(weatherData);
    const { name, main, weather } = weatherData;
    cityNameDisp.textContent = "City Name: " + String(name);
    tempDisplay.textContent = "Temperature: " + String(main.temp);
    description.textContent = "Description: " + String(weather[0].description);

    weatherInfo.classList.remove("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
