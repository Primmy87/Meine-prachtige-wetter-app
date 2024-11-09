const apiKey = "f38eefo48bt62b0f4f4597fdbecfda4d";
const apiBaseUrl = "https://api.shecodes.io/weather/v1/forecast?lon={lon}&lat={lat}&key={key}";
 
async function fetchWeather(city) {
  try {
    const response = await fetch(`${apiBaseUrl}/current?query=${city}&key=${apiKey}&units=metric`);
 
    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
 
    const data = await response.json();
 
    // Check if data is valid
    if (data && data.temperature && data.condition) {
      updateWeatherDisplay(data);
    } else {
      console.error("Invalid data structure:", data);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
 
function updateWeatherDisplay(data) {
  const cityElement = document.querySelector(".weather-app-city");
  const temperatureElement = document.querySelector(".weather-app-temperature");
  const humidityElement = document.querySelector(".humidity strong");
  const windElement = document.querySelector(".wind strong");
  const iconElement = document.querySelector(".icon");
  const dateTimeElement = document.querySelector(".date-time");
 
  // Ensure elements exist before updating
  if (cityElement) cityElement.textContent = data.city || "Unknown City";
  if (temperatureElement) temperatureElement.textContent = Math.round(data.temperature.current) + "°C";
  if (humidityElement) humidityElement.textContent = `${data.temperature.humidity}%`;
  if (windElement) windElement.textContent = `${data.wind.speed} km/h`;
  if (iconElement) iconElement.src = data.condition.icon_url || "";
  if (dateTimeElement) dateTimeElement.textContent = formatDate(data.time * 1000);
}
 
function formatDate(timestamp) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(timestamp);
  const day = days[date.getDay()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${hours}:${minutes}`;
}
 
document.querySelector(".search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.querySelector(".search-form-input").value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    console.error("City input is empty.");
  }
});
 
// Initial call for a default city (e.g., "Harare")
fetchWeather("Harare");
