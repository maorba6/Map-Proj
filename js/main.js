import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

locService.getLocs()
    .then(locs => console.log('locs', locs))
window.onload = () => {
    mapService.initMap()
        .then(() => {
            mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));
}

function moveToMyLocation() {

    locService.getPosition()
        .then(pos => {

            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            console.log('User position is:', pos.coords.latitude, pos.coords.longitude);
            var lan = pos.coords.latitude;
            var lon = pos.coords.longitude;
            return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lan}&lon=${lon}&units=metric&APPID=44cff25b0576bac36050dceb212986e1`)
                .then(res => {
                    var currLocation = document.querySelector('.curr-location');
                    currLocation.innerText = `Location : ${res.data.name} , Temp : ${res.data.main.temp}`
                })
        })
        .catch(err => {
            console.log('err!!!', err);
        })

}

document.querySelector('.btn-my-location').addEventListener('click', () => {

    moveToMyLocation()

})

document.querySelector('.btn-go').addEventListener('click', () => {
    getLocation()
    var loc = document.querySelector('.location').value;
    var prm = locService.changeWeaterBox(loc);
    prm.then(res => {
        var currLocation = document.querySelector('.curr-location');
        currLocation.innerText = `Location : ${loc} , Temp : ${res.main.temp}`
    })
})










document.querySelector('.copy').addEventListener('click', () => {

    var lat = document.querySelector('.lat').innerText
    var lng = document.querySelector('.lng').innerText
    const myUrl = new URL(`https://maorba6.github.io/Map-Proj/index.html`);
    myUrl.searchParams.append('lat', `${lat}`)
    myUrl.searchParams.append('lng', `${lng}`)

    console.log(lat, lng);
    console.log(myUrl);


})
document.querySelector('body').addEventListener('load', () => {
    var lat = +location.search.split('lat=')[1]
    var lng = +location.search.split('lng=')[1]
    panTo(lat, lng)
})




function getLocation() {
    var locationName = getInput()
    console.log(locationName)
    var prm = locService.getAPI(locationName) //getAPI(locationName)
    console.log(prm)
    return prm.then(location => {
        document.querySelector('.lat').innerText = location.results[0].geometry.location.lat
        document.querySelector('.lng').innerText = location.results[0].geometry.location.lng
        mapService.moveLocation(location.results[0].geometry.location)
    })
}



function getInput() {
    return document.querySelector('.location').value
}