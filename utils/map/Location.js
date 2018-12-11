

function create(latitue, longitude, name, style) {
    return {
        latitue: latitue,
        longitude: longitude,
        name: name,
        style: style,
    }
}
module.exports = {
    create: create
}