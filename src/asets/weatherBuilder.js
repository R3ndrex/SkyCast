const unitTemp = {
    metric: "℃",
    us: "℉",
    base: "K",
    uk: "℃",
};
const unitSpeed = {
    metric: "km/h",
    us: "mph",
    base: "M/s",
    uk: "mph",
};

class WeatherBuilder {
    constructor(parent, getConditionIcons) {
        this.parent = parent;
        this.getConditionIcons = getConditionIcons;
        this._units = "metric";
    }

    get units() {
        return this._units;
    }

    set units(value) {
        if (this.mediator) {
            this.mediator.emit("ChangedUnits");
        }
        this._units = value;
    }
    setMediator(mediator) {
        this.mediator = mediator;
    }

    init(json) {
        if (!json) return null;
        this.json = json;
        this.deleteInfoBlock();
        const weatherConditions = this.buildInfoBlock();
        this.parent.appendChild(weatherConditions);
    }

    buildInfoBlock() {
        const weatherConditions = document.createElement("div");
        const feelsLike = CreateTextElement(
            "div",
            `Feels like: ${this.json.currentConditions.feelslike}`
        );
        const descriptions = CreateTextElement("div", this.json.description);
        const condition = CreateTextElement(
            "div",
            this.json.currentConditions.conditions
        );
        const h2 = CreateTextElement("h2", "Temperature next week");
        const capitalizedCity = Capitalize(this.json.address);
        const h3 = CreateTextElement("h3", capitalizedCity);

        weatherConditions.classList.add("weather-info");
        const wind = document.createElement("div");
        wind.textContent = `Wind Speed: ${this.json["currentConditions"]["windspeed"]}`;
        wind.classList.add("small-text");
        feelsLike.classList.add("small-text");
        [
            h3,
            this.createTemperatureRow(),
            this.addUnitNumbersSpeed(wind),
            this.addUnitNumbersTemp(feelsLike),
            condition,
            descriptions,
            h2,
            this.createMiniForecast(8),
        ].forEach((element) => {
            weatherConditions.appendChild(element);
        });
        return weatherConditions;
    }
    createMiniForecast(days) {
        const weatherDays = document.createElement("div");
        weatherDays.classList.add("weather-forecast");
        for (let i = 1; i < days; i++) {
            weatherDays.appendChild(this.BuildMiniInfoBlock(i));
        }
        return weatherDays;
    }

    createTemperatureRow() {
        const row = document.createElement("div");
        const temperature = document.createElement("h2");

        temperature.textContent = this.json["currentConditions"]["temp"];
        row.appendChild(this.addUnitNumbersTemp(temperature));
        row.appendChild(
            this.createIcon(this.json["currentConditions"]["icon"])
        );

        return row;
    }
    addUnitNumbersTemp(element) {
        element.textContent += unitTemp[this.units];
        return element;
    }
    addUnitNumbersSpeed(element) {
        element.textContent += unitSpeed[this.units];
        return element;
    }

    deleteInfoBlock() {
        const infoBlock = document.querySelector(".weather-info");
        if (infoBlock) {
            this.parent.removeChild(infoBlock);
        }
    }

    createIcon(condition) {
        const icon = document.createElement("img");
        icon.src = this.getConditionIcons(condition);
        icon.alt = condition;
        return icon;
    }
    BuildMiniInfoBlock(index) {
        const block = document.createElement("div");
        const img = this.createIcon(this.json.days[index]["icon"]);
        const tempmin = CreateTextElement(
            "div",
            this.json.days[index]["tempmin"]
        );
        const tempmax = CreateTextElement(
            "div",
            this.json.days[index]["tempmax"]
        );
        const div = document.createElement("div");
        div.appendChild(tempmin);
        div.appendChild(tempmax);
        block.appendChild(img);
        block.appendChild(div);
        return block;
    }
}

function CreateTextElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

function Capitalize(text) {
    return `${text[0].toUpperCase()}${text.slice(1)}`;
}

export default WeatherBuilder;
