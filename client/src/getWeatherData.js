import fetch from "node-fetch";

export const getWeatherData = ({ lat, lon, key }) => {
	fetch(
		`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`,
	).then((res) => {
		return res.json();
	}).then((data) => console.log(data.main , data.weather))
}
