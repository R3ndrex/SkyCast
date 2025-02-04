import "./style.css";
import setConditionImage from "./asets/setConditionImage.js";
const weatherConditions = document.querySelector(".weather-info");
const API = "HDDUWHXU3LRBLBP2TD8WGNNJV";
const address = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`; // + [location]/[date1]/[date2]?key=YOUR_API_KEY
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", () => {
    if (input.value.trim() === "") {
        return;
    }
    GetWeather(input.value).then((response) => BuildInfoBlock(response));
});

async function GetWeather(city) {
    try {
        const response = await fetch(
            `${address}/${city}?iconSet=icons2&key=${API}`
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
    }
}

function BuildInfoBlock(json) {
    weatherConditions.innerHTML = "";
    console.log(json);
    weatherConditions.textContent = json["currentConditions"]["conditions"];
    const icon = document.createElement("img");
    icon.src = setConditionImage(json["currentConditions"]["icon"]);
    icon.alt = json["currentConditions"]["icon"];
    weatherConditions.appendChild(icon);
}
