let districts = {
    central: {lat: 22.28, lng:114.1588},
    wanchai: {lat: 22.276, lng:114.1751},
}

function extractsDistrict(){
    let url = window.location.href
    let spliturl = url.split('/')[6]
    return spliturl
}

function extractsLatLng(){
    let url = window.location.href
    let spliturl = url.split('/')[6]
    return districts[spliturl]
}

function initMap() {
    // Map options
    var options = {
        zoom: 15,
        center: extractsLatLng() || {lat: 22.3193, lng: 114.1694}
    }
    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);
}

// Search all restaurants
axios({
    url: '/restaurant/search?district=' + extractsDistrict(),
    method: 'get'
})
.then((res) => {
    // res.data will have all of the corresponding restaurants that have correct area and district
    // console.log(res.data)

    for (let restaurant in res.data){
        let lat = restaurant.latitude
        let lng = restaurant.longitude

        // Add a marker to the google map
    }
})
.catch((error) => {
    console.log(error);
})
