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


document.querySelector('form').addEventListener('click', () => {
    event.preventDefault()
})

document.querySelector('.go').addEventListener('click', () => {

    var loc = document.querySelector('.loc').value;
    var prm = locService.changeWeaterBox(loc);
    prm.then(res => {
        var currLocation = document.querySelector('.curr-location');
        currLocation.innerText = `Location : ${loc} , Temp : ${res.main.temp}`
    })


})