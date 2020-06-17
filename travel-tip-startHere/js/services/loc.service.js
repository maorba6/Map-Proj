export const locService = {
    getLocs,
    getPosition
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


export function changeWeaterBox() {
    var elVal = document.querySelector('.go');
    console.log(elVal + 'elval');

    var loc = elVal.value;
    console.log(loc, "loc");

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&APPID=44cff25b0576bac36050dceb212986e1`)
        .then(res => console.log(res))
}