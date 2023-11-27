const input = document.querySelector("#city");
const btn = document.querySelector("#btn");
const img = document.querySelector(".pict");

const city = document.querySelector(".city");
const tempText = document.querySelector(".temp");
const time = document.querySelector(".time");

const snow_pict = "https://gefest.b-cdn.net/marketing/snow.png";
const rain_pict = "https://gefest.b-cdn.net/marketing/rain.png";
const clouds_pict = "https://gefest.b-cdn.net/marketing/clouds.png";
const sunny_pict = "https://gefest.b-cdn.net/marketing/sunny.png";

console.log(input);
console.log(btn);
console.log(city);
console.log(tempText);
const API_KEY = "cc2d757656721c7838f819f150c7f7e6";
btn.addEventListener("click", async function () {
  console.log("Функция сработала");
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}`;

  const res = await fetch(API_URL);
  const data = await res.json();
  if ("main" in data) {
    console.log(data);
    city.textContent = `В городе: ${input.value}`;

    if ("snow" in data) {
      img.src = snow_pict;
    } else if ("rain" in data) {
      img.src = rain_pict;
    } else if (data.clouds.all > 30) {
      img.src = clouds_pict;
    } else {
      img.src = sunny_pict;
    }
    tempText.textContent = `Температура:  ${Math.round(
      data.main.temp - 273.15
    )} ℃`; //Переводим из Кельвинов в ℃
  } else {
    alert("Такой город не найден!");
  }
});
