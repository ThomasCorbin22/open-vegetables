// make a lat / lng for the disticts key value pairs 
    console.log(window.location.href)


// do a conditional statement to check the href returned thn give the correct lng&lat to the intiMAp func   
//22.234243,114.124947
//22.230786,114.118238
function initMap() {
    // Map options
    var options = {
        zoom: 8,
        center: { lat: 22.230786, lng: 114.118238 }
        // center:{lat:22.3193,lng:114.1694}
    }
    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    var hkIsland = document.getElementById('hki')

    

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

    addMarker({ coords: { lat: 22.2679, lng: 114.1291 } });
    addMarker({ coords: { lat: 22.4277, lng: 114.2403 } });
    addMarker({ coords: { lat: 22.2800, lng: 114.1588 } });

    // Add marker function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map,
            hkIsland: hkIsland
        })
    }


}

