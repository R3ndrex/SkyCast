import CloudyImage from "../images/cloudy.png";
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
import ThunderShowersNightImage from "../images/thunder-showers-night.png";
import ThunderShowersDayImage from "../images/thunder-showers-day.png";
import RainSnowShowersDayImage from "../images/rain-snow-showers-day.png";
import RainSnowShowersNightImage from "../images/rain-snow-showers-night.png";
import SleetImage from "../images/sleet.png";
const conditions = {
    cloudy: CloudyImage,
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
    "thunder-showers-night": ThunderShowersNightImage,
    "thunder-showers-day": ThunderShowersDayImage,
    // those maybe not working cus, i didnt see those conditions in documentations, but there was images for it
    "rain-snow-showers-day": RainSnowShowersDayImage,
    "rain-snow-showers-night": RainSnowShowersNightImage,
    sleet: SleetImage,
};
function getConditionImage(condition) {
    if (condition in conditions) {
        return conditions[condition];
    } else {
        return null;
    }
}
export default getConditionImage;
