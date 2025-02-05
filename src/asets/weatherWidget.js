class WeatherWidget {
    #address = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline`;
    constructor(API) {
        this.API = API;
    }
    async getWeather(parameters) {
        const response = await fetch(
            `${this.#address}${parameters}&key=${this.API}`
        );
        const json = await response.json();
        return json;
    }
}

export default WeatherWidget;
