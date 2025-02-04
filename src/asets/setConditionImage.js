import ClodyImage from "../images/cloudy.png";
import ClearNightImage from "../images/clear-night.png";
import ClearDayImage from "../images/clear-day.png";
import FogImage from "../images/fog.png";
import PartlyCloudyDay from "../images/partly-cloudy-day.png";
import PartlyCloudyNight from "../images/partly-cloudy-night.png";
import RainImage from "../images/rain.png";
import WindImage from "../images/wind.png";
import SnowImage from "../images/snow.png";
import ShowersNightImage from "../images/showers-night.png";
import ShowersDayImage from "../images/showers-day.png";
import ThunderRainImage from "../images/thunder-rain.png";
import SnowShowersDayImage from "../images/snow-showers-day.png";
import SnowShowersNightImage from "../images/snow-showers-night.png";

const conditions = {
    cloudy: ClodyImage,
    "clear-night": ClearNightImage,
    "clear-day": ClearDayImage,
    fog: FogImage,
    "partly-cloudy-day": PartlyCloudyDay,
    "partly-cloudy-night": PartlyCloudyNight,
    rain: RainImage,
    wind: WindImage,
    snow: SnowImage,
    "showers-night": ShowersNightImage,
    "showers-day": ShowersDayImage,
    "thunder-rain": ThunderRainImage,
    "snow-showers-day": SnowShowersDayImage,
    "snow-showers-night": SnowShowersNightImage,
    "thunder-showers-night": ThunderRainImage,
    "thunder-showers-day": ThunderRainImage,
};
// what does rain-snow-showers-day and night are for? idk
function getConditionImage(condition) {
    if (condition in conditions) {
        return conditions[condition];
    }
}
export default getConditionImage;
