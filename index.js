const axios = require("axios");
const apiKey = "ef0b0973b783e0614ac87612ec04344b";
const cidade = "Sao Paulo"; // Nome da Cidade Aqui
const units = "metric";
const lang = "pt_BR";
const limit = 1;

const locUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=${limit}&appid=${apiKey}`; // URL para as coordenadas

const coordenadas = axios.get(locUrl).then((res) => res);  // Obtem a latitude e longitude
coordenadas.then((res) => console.log(`Cidade: ${cidade}\n----------------------------\nLatitude: ${res.data[0].lat}\nLongitude: ${res.data[0].lon}\n----------------------------`)); // Informa a latitude e longitude

const localizacao = axios.get(locUrl).then((res) => [res.data[0].lat, res.data[0].lon]);

localizacao.then(([lat, lon]) => {
    const tempUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lang}&units=${units}`;
    const temperatura = axios.get(tempUrl).then((res) => res); // Obtem a sensação térmica e descrição
    temperatura.then((res) => console.log(`Sensação térmica (°C): ${res.data.main.feels_like}\nDescrição: ${res.data.weather[0].description}`)); // Informa a sensação termica e descrição
});

