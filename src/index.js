import "./style.css";
import getConditionImage from "./asets/setConditionImage.js";

const weatherConditions = document.querySelector(".weather-info");
const API = "HDDUWHXU3LRBLBP2TD8WGNNJV";
const address = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`;
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", () => {
    input.setCustomValidity("");
    GetWeather(input.value)
        .then((response) => BuildInfoBlock(response))
        .catch((reject) => {
            console.error(reject.message);
            input.setCustomValidity("Invalid input. Please enter real city.");
            input.reportValidity();
        });
});

async function GetWeather(city) {
    const response = await fetch(
        `${address}/${city}?iconSet=icons2&key=${API}`
    );
    const json = await response.json();
    return json;
}

function BuildInfoBlock(json) {
    weatherConditions.innerHTML = "";
    console.log(json);
    weatherConditions.textContent = json["currentConditions"]["conditions"];
    const icon = document.createElement("img");
    icon.src = getConditionImage(json["currentConditions"]["icon"]);
    icon.alt = json["currentConditions"]["icon"];
    weatherConditions.appendChild(icon);
}
