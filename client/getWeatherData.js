import fetch from "node-fetch";

export const getWeatherData = ({ lat, lon, key }, callback) => {
	fetch(
		`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`
	)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			callback(data);
		});
};
