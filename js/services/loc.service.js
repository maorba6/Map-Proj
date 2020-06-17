export const locService = {
    getLocs,
    getPosition,
    getAPI
}
var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


function getAPI(location) {
    var prm = axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDi1IRiUpFMSYvxgVdafkHSXeCE5e4TfCk`)
    return prm.then(res => res.data)
}


