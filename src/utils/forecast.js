const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const access_key = "378a3b0bd0878264f25538cc09464dee";

    const url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            const res = body.current.weather_descriptions[0] + ' It is currently '
                + body.current.temperature + ' degrees. It feels like '
                + body.current.feelslike + ' degrees outside';
            callback(undefined, res)
        }
    })
}

module.exports = forecast;
