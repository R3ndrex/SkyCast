import "./style.css";
import getConditionImage from "./assets/getConditionImage.js";
import WeatherBuilder from "./assets/weatherBuilder.js";
import WeatherWidget from "./assets/weatherWidget.js";
import mediator from "./assets/mediator.js";

const input = document.querySelector("input");
const loading = document.querySelector(".loading");
const Seearchbutton = document.querySelector(".search-button");
let units = "metric";
let jsonPrevious;
const unitChanger = document.querySelector("#units");
const locationButton = document.querySelector(".location-button");
const main = document.querySelector("main");

const weatherBuilder = new WeatherBuilder(main, getConditionImage);
const weatherWidget = new WeatherWidget("HDDUWHXU3LRBLBP2TD8WGNNJV");

weatherBuilder.setMediator(mediator);
mediator.subscribe("ChangedUnits", () => {
    weatherBuilder.init(jsonPrevious);
});

Seearchbutton.addEventListener("click", () => {
    input.setCustomValidity("");
    loading.classList.add("visible");
    weatherWidget
        .getWeather(`/${input.value}?iconSet=icons2&unitGroup=${units}`)
        .then((json) => {
            loading.classList.remove("visible");
            jsonPrevious = json;
            weatherBuilder.init(json);
        })
        .catch((error) => {
            loading.classList.remove("visible");
            CheckValidity(input, error);
        });
});

locationButton.addEventListener("click", () => {
    loading.classList.add("visible");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const long = position["coords"]["longitude"];
            const lat = position["coords"]["latitude"];

            weatherWidget
                .getWeather(`/${lat},${long}?iconSet=icons2&unitGroup=${units}`)
                .then((json) => {
                    loading.classList.remove("visible");
                    jsonPrevious = json;
                    weatherBuilder.init(json);
                })
                .catch((error) => {
                    loading.classList.remove("visible");
                    console.error(error);
                });
        });
    }
});

unitChanger.addEventListener("change", (e) => {
    units = e.target.value;

    weatherBuilder.units = e.target.value;
    if (jsonPrevious) {
        loading.classList.add("visible");
        let query = /[a-zA-Z]/.test(jsonPrevious.address)
            ? `/${jsonPrevious.address}?iconSet=icons2&unitGroup=${units}`
            : `/${jsonPrevious.latitude},${jsonPrevious.longitude}?iconSet=icons2&unitGroup=${units}`;
        weatherWidget
            .getWeather(query)
            .then((json) => {
                loading.classList.remove("visible");
                jsonPrevious = json;
                weatherBuilder.init(json);
            })
            .catch((error) => {
                loading.classList.remove("visible");
                console.error(error);
            });
    }
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
