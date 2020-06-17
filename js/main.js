console.log('Main!');

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

    locService.getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    mapService.panTo(35.6895, 139.6917);
})

document.querySelector('.btn-go').addEventListener('click', moveLocation)

function moveLocation() {
    var locationName = getInput()
    console.log(locationName)
    var prm = getAPI(locationName)
    console.log(prm)
}

function getInput() {
    return document.querySelector('.location').value
}


function getAPI(location) {
    var prm = axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDi1IRiUpFMSYvxgVdafkHSXeCE5e4TfCk')
    return prm.then(value => value.data)


}










