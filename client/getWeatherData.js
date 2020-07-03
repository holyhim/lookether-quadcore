import axios from 'axios';
import { WEATHER_API_KEY } from "./weatherAPI_KEY/WeatherAPI_KEY";


const getWeatherData = ({ lat, lon, key }, callback) => {
	axios.get(
		`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${key}`
	)
		.then((res) => {
			callback(res.data);
		}).catch((err) => {
			console.log(err)
		})
};

const reverseGeo = ({ lat, lon }, callback) => {
	axios.get(
		`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
	)
		.then((res) => {
			callback(res.data)
		}).catch((err) => {
			console.log(err)
		})
};



const getCurrentWeather = (callback) => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			getWeatherData(
				{
					lat: position.coords.latitude,
					lon: position.coords.longitude,
					key: WEATHER_API_KEY,
				},
				(data) => {
					callback(data);
				}
			);
			reverseGeo(
				{
					lat: position.coords.latitude,
					lon: position.coords.longitude,
				},
				(data) => {
					callback(data);
				}
			)
		});
	} else {
		alert("현재 위치 정보가 현재 브라우저에서 지원하지 않습니다.");
	}
}


export { getWeatherData , reverseGeo , getCurrentWeather } 