// make a lat / lng for the disticts key value pairs 
    console.log(window.location.href)


// do a conditional statement to check the href returned thn give the correct lng&lat to the intiMAp func   
//22.234243,114.124947
//22.230786,114.118238
function initMap(currentLocation) {
    // Map options
    var options = {
        zoom: 12,
        center: { lat: 22.3193, lng: 114.1694 },
        // center:{ lat: 22.2800, lng: 114.1588 }
        // center:{lat:22.3193,lng:114.1694}
    }
    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);
};
    
    /*
    // Add marker
    var marker = new google.maps.Marker({
        position:{lat:22.2679,lng:114.1291},
        map:map
    })

     var infoWindow = new google.maps.InfoWindow({
         content: '<h1>Pokfulam HK</h1>'
    });

    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
    */

    // addMarker({ coords: { lat: 22.2679, lng: 114.1291 } });
    // addMarker({ coords: { lat: 22.4277, lng: 114.2403 } });
    // addMarker({ coords: { lat: 22.2800, lng: 114.1588 } });

    // // Add marker function
    // function addMarker(props) {
    //     var marker = new google.maps.Marker({
    //         position: props.coords,
    //         map: map,
    //     })
    // }



//     // Map options
//     // var central = {
//     //     zoom: 18,
//     //     center: { lat: 22.2800, lng: 114.1588 }
//     // }
//     // var wanChai = {
//     //     zoom: 18,
//     //     center: { lat: 22.2760, lng: 14.1751 }
//     // }



//     // New map

// //     return hkiCentral, hkiWanChai;
// // }
// }
const districts = {
    central:{ lat: 22.2800, lng: 114.1588 }, 
    wanChai:{ lat: 22.2760, lng: 114.1751 }
};

let currentLocation = function findURLLocation() {

    const url = 'https://localhost:8080/map/hong-kong-island/central'
    const splitData = url.split('/')
    console.log(splitData);

    let hkiCentral = splitData[splitData.length - 1]
    console.log(hkiCentral)

};

// var central = new google.maps.Central(document.getElementById('central'), currentLocation.central);

// const url = 'https://localhost:8080/map/hong-kong-island/north-point'
// const splitData = url.split('/')
// console.log(splitData);

// let district = splitData[splitData.length - 1]
// console.log(district)

// commit
// push
// git merge branch
// origin/development
// conflict save incoming change


// ajax request
