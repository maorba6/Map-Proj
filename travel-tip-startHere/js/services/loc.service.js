export const locService = {
    getLocs,
    getPosition,
    changeWeaterBox
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


function changeWeaterBox(loc) {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&APPID=44cff25b0576bac36050dceb212986e1`)
        .then(res => res.data)
}