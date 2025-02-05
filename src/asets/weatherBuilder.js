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
        this._units = value;
        this.init(this.json);
    }

    init(json) {
        if (!json) return null;
        this.json = json;
        this.deleteInfoBlock();
        const weatherConditions = this.buildInfoBlock();
        this.parent.appendChild(weatherConditions);
    }

    changeUnits(value) {
        this.units = value;
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
        const capitalizedCity = `${this.json.address[0].toUpperCase()} ${this.json.address.slice(
            1
        )}`;
        const h3 = CreateTextElement("h3", capitalizedCity);

        weatherConditions.classList.add("weather-info");

        weatherConditions.appendChild(h3);
        weatherConditions.appendChild(this.createTemperatureRow());
        weatherConditions.appendChild(this.addUnitNumbers(feelsLike));
        weatherConditions.appendChild(condition);
        weatherConditions.appendChild(descriptions);
        return weatherConditions;
    }

    createTemperatureRow() {
        const row = document.createElement("div");
        const temperature = document.createElement("h2");
        temperature.textContent = this.json["currentConditions"]["temp"];
        row.appendChild(this.addUnitNumbers(temperature));
        row.appendChild(this.createIcon());
        return row;
    }

    addUnitNumbers(element) {
        switch (this.units) {
            case "metric":
                element.textContent += "℃";
                break;
            case "base":
                element.textContent += "K";
                break;
            default:
                element.textContent += "℉";
                break;
        }
        return element;
    }

    deleteInfoBlock() {
        const infoBlock = document.querySelector(".weather-info");
        if (infoBlock) {
            this.parent.removeChild(infoBlock);
        }
    }

    createIcon() {
        const icon = document.createElement("img");
        icon.src = this.getConditionIcons(
            this.json["currentConditions"]["icon"]
        );
        icon.alt = this.json["currentConditions"]["icon"];
        return icon;
    }
}

function CreateTextElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

export default WeatherBuilder;
