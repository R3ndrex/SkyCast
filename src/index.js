import "./style.css";
import getConditionImage from "./asets/getConditionImage.js";
import WeatherBuilder from "./asets/weatherBuilder.js";
import WeatherWidget from "./asets/weatherWidget.js";
import mediator from "./asets/mediator.js";

const input = document.querySelector("input");
const Seearchbutton = document.querySelector(".search-button");
let units = "metric";
const unitChanger = document.querySelector("#units");
const locationButton = document.querySelector(".location-button");
const main = document.querySelector("main");

const weatherBuilder = new WeatherBuilder(main, getConditionImage);
const weatherWidget = new WeatherWidget("HDDUWHXU3LRBLBP2TD8WGNNJV");
weatherBuilder.setMediator(mediator);
mediator.subscribe("ChangedUnits", () => {
    weatherWidget
        .getWeather(`/${input.value}?iconSet=icons2&unitGroup=${units}`)
        .then((json) => weatherBuilder.init(json));
});

Seearchbutton.addEventListener("click", () => {
    input.setCustomValidity("");
    weatherWidget
        .getWeather(`/${input.value}?iconSet=icons2&unitGroup=${units}`)
        .then((json) => weatherBuilder.init(json))
        .catch((error) => CheckValidity(input, error));
});

locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position["coords"]["longitude"]);
            console.log(position["coords"]["latitude"]);
        });
    }
});

unitChanger.addEventListener("change", (e) => {
    units = e.target.value;
    weatherBuilder.units = e.target.value;
});

function CheckValidity(element, error) {
    if (element.validity.valueMissing) {
        input.setCustomValidity("Please enter city name.");
    } else {
        console.error(error);
        input.setCustomValidity("Please enter correct city.");
    }
    input.reportValidity();
}
