import "./style.css";
import getConditionImage from "./asets/getConditionImage.js";
import WeatherBuilder from "./asets/weatherBuilder.js";
import WeatherWidget from "./asets/weatherWidget.js";
const API = "HDDUWHXU3LRBLBP2TD8WGNNJV";
const input = document.querySelector("input");
const Seearchbutton = document.querySelector(".search-button");
let units = "metric";
const unitChanger = document.querySelector("#units");
const main = document.querySelector("main");

const weatherWidget = new WeatherBuilder(main, getConditionImage);
const weatherBuilder = new WeatherWidget(API);

Seearchbutton.addEventListener("click", () => {
    input.setCustomValidity("");
    weatherBuilder
        .getWeather(`/${input.value}?iconSet=icons2&unitGroup=${units}`)
        .then((json) => {
            weatherWidget.init(json);
        })
        .catch((error) => {
            console.error(error);
            input.setCustomValidity("Invalid input. Please enter real city.");
            input.reportValidity();
        });
});

unitChanger.addEventListener("change", (e) => {
    units = e.target.value;
    weatherWidget.changeUnits(e.target.value);
});
