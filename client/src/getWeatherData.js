import fetch from "node-fetch";

export const getWeatherData = ({ lat, lon, key }, callback) => {
	fetch(
		`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}}`,
		{
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}
	)
		.then((res) => {
			res.json();
		})
		.then((weatherData) => {
			callback(weatherData);
		});
};
