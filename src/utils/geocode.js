const request = require('request');

const geocode = (address, callback) => {
    const accessTokenGeo = "pk.eyJ1IjoibmlraXRhMDcxIiwiYSI6ImNrcTN4dGY5MDB3c2Eyd3BmdzgzMDRleWgifQ.vqJbiER0SoTA5lgNxO3COA"
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + accessTokenGeo;

    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.message || body.features.length == 0) {
            callback('Unable to find location. Try again with different place.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;