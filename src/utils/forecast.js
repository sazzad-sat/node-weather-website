const request = require('request');

/**
 * Sends a forecast message
 * @param {number} latitude 
 * @param {number} longitude 
 * @param {fn} callback
 */
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f045d0f1ef9aed3a9c4f1ae776dbf431&query=${latitude},${longitude}&units=m`;

    request({ url, json: true }, (error, response) => {
        const fcData = response.body.current;

        if (error) {
            callback('Unable to connect to weather services', undefined);
        } else if (response.body.error) {
            callback('Invalid location. Try again.', undefined);
        } else {
            callback(undefined, `${fcData.weather_descriptions[0]}. It is currently ${fcData.temperature} degrees out. Feels like ${fcData.feelslike} degrees out. The humidity is ${fcData.humidity}%.`);
        }
    })
}

/**
 * @callback fn
 * @param {*} error
 * @param {*} forecast
 */

module.exports = forecast;

