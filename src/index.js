import "./style.css";
import getConditionImage from "./asets/setConditionImage.js";

const weatherConditions = document.querySelector(".weather-info");
const API = "HDDUWHXU3LRBLBP2TD8WGNNJV";
const address = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`;
const input = document.querySelector("input");
const button = document.querySelector("button");
let units = "metric";
const unitChanger = document.querySelector("#units");

button.addEventListener("click", () => {
    input.setCustomValidity("");
    GetWeather(input.value)
        .then((response) => BuildInfoBlock(response))
        .catch((error) => {
            console.error(error);
            input.setCustomValidity("Invalid input. Please enter real city.");
            input.reportValidity();
        });
});
unitChanger.addEventListener("change", (e) => {
    units = e.target.value;
});

async function GetWeather(city) {
    const response = await fetch(
        `${address}/${city}?iconSet=icons2&unitGroup=${units}&key=${API}`
    );
    const json = await response.json();
    return json;
}

function BuildInfoBlock(json) {
    weatherConditions.innerHTML = "";
    console.log(json);
    const condition = document.createElement("div");
    condition.textContent = json["currentConditions"]["conditions"];
    const descriptions = document.createElement("div");
    descriptions.textContent = json["description"];
    const icon = document.createElement("img");
    icon.src = getConditionImage(json["currentConditions"]["icon"]);
    icon.alt = json["currentConditions"]["icon"];
    const temperature = document.createElement("h2");
    temperature.textContent = json["currentConditions"]["temp"];
    const h3 = document.createElement("h3");
    h3.textContent =
        json["address"][0].toUpperCase() + json["address"].slice(1);
    if (units === "metric") {
        temperature.textContent += "℃";
    } else {
        temperature.textContent += "℉";
    }
    const feelsLike = document.createElement("div");
    feelsLike.textContent =
        "feels like" + json["currentConditions"]["feelslike"];
    const row = document.createElement("div");
    row.appendChild(temperature);
    row.appendChild(icon);
    weatherConditions.appendChild(h3);
    weatherConditions.appendChild(row);
    weatherConditions.appendChild(feelsLike);
    weatherConditions.appendChild(condition);
    weatherConditions.appendChild(descriptions);
}
