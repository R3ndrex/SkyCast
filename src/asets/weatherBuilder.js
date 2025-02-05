const unitMetrics = {
    metric: "℃",
    us: "℉",
    base: "K",
    uk: "℃",
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
        const capitalizedCity = Capitalize(this.json.address);

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
        element.textContent += unitMetrics[this.units];
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

function Capitalize(text) {
    return `${text[0].toUpperCase()}${text.slice(1)}`;
}

export default WeatherBuilder;
