import fetch from "node-fetch";

export const getWeatherData = ({ lat, lon, key }, callback) => {
	fetch(
		`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`,
	)
		.then((res) => {
		res.json();
		})
		.then((weatherData) => {
			callback(weatherData);
		});
};
