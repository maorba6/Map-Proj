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
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.btn-my-location').addEventListener('click', moveToMyLocation)


document.querySelector('.btn-go').addEventListener('click', () => {
    getLocation()
    var loc = document.querySelector('.location').value;
    var prm = locService.changeWeaterBox(loc);
    prm.then(res => {
        var currLocation = document.querySelector('.curr-location');
        currLocation.innerText = `Location : ${loc} , Temp : ${res.main.temp}`
    })
})


function getLocation() {
    var locationName = getInput()
    console.log(locationName)
    var prm = locService.getAPI(locationName) //getAPI(locationName)
    console.log(prm)
    prm.then(location => mapService.moveLocation(location.results[0].geometry.location))
}

function getInput() {
    return document.querySelector('.location').value
}