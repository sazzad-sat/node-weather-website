const request = require('request');

/**
 * Sends the latitude, longitude and location name of the given address
 * @param {string} address 
 * @param {fn} callback 
 */
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2F6emFkMjI2IiwiYSI6ImNrZWZxaGVrODBvMG4zMmp5MGU0MWp6ZzMifQ.v8-N8piZxz5m6ngotctldw`

    request({ url, json: true }, (error, response) => {
        const locations = response.body.features;
        
        if (error) {
            callback('Unable to connect to location services! ＞﹏＜', undefined);
        } else if (locations.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: locations[0].center[1],
                longitude: locations[0].center[0],
                location: locations[0].place_name,
            })
        }
    });
}

/**
 * @callback fn
 * @param {*} error
 * @param {*} geoData
 */

module.exports = geocode;