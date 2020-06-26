let districts = {
    // hk island coords
    central: { lat: 22.28, lng: 114.1588 },
    'wan-chai': { lat: 22.276, lng: 114.1751 },
    'causeway-bay': { lat: 22.2860, lng: 114.1915 },
    'north-point': { lat: 22.2885, lng: 114.1928 },
    // kowloon coords
    'tsim-sha-tsui': { lat: 22.2988, lng: 114.1722 },
    'mong-kok': { lat: 22.3204, lng: 114.1698 },
    'kwun-tong': { lat: 22.3104, lng: 114.2227 },
    'tsuen-wan': { lat: 22.3699, lng: 114.1144 },
    // new territories coords
    'sha-tin': { lat: 22.381543, lng: 114.187728 },
    'tai-po': { lat: 22.4423, lng: 114.1655 },
    'tuen-mun': { lat: 22.3908, lng: 113.9725 },
    'yuen-long': { lat: 22.4445, lng: 114.0222 },
    // outlying island coords
    'lantau-island': { lat: 22.293608, lng: 114.015598 },
    'lamma-island': { lat: 22.225928, lng: 114.112478 },
    'cheung-chau': { lat: 22.2016, lng: 114.0265 },
}

let hongkong = { lat: 22.3193, lng: 114.1694 }
let map
let markers = []
let currentWindow

$(document).ready(function () {
    if ($('title').text().match(/^Map/)) {
        $('.navbar-nav > li:eq(3)').addClass('active')
    }

    $('.map-link').click((e) => {
        e.preventDefault()

        let location = $(e.target).html()
        location = location.toLowerCase().replace(/\s+/g, '-')
        let latlng = districts[location]

        console.log(location)

        // Moves center of map to new location
        map.setCenter(latlng)

        // Clears the markers
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = []

        putRestaurantMarkers(map, latlng, 1)
    })
})

// Extracts district from URL
function extractsDistrict() {
    let url = window.location.href
    let spliturl = url.split('/')[6].replace('-', ' ')
    return spliturl
}

// Extracts LatLng from hard-coded object and URL
function extractsLatLng() {
    let url = window.location.href
    let spliturl = url.split('/')[6]
    return districts[spliturl]
}

// Initialise google maps
async function initMap() {
    let restaurant
    let district = extractsLatLng()

    if ($('title').text().match('restaurant-detail')) {
        restaurant = await getRestaurantLatLng()
    }

    // Map options
    let options = {
        zoom: 15,
        center: district || restaurant || hongkong
    }
    // New map
    map = new google.maps.Map(document.getElementById('map'), options);

    if (restaurant) {
        let marker = new google.maps.Marker({ position: restaurant, map: map });
        markers.push(marker)
    }
    else if (district) {
        putRestaurantMarkers(map, district, 1)
    }
    else {
        putRestaurantMarkers(map, hongkong, 20)
    }
}

// Put restaurant markers down on the map
function putRestaurantMarkers(map, latlng, range) {
    // Search all restaurants
    axios({
        url: `/restaurant/search?longitude=${latlng.lng}&latitude=${latlng.lat}&range=${range}`,
        method: 'get'
    })
        .then((res) => {
            // res.data will have all of the corresponding restaurants that have correct area and district

            for (let restaurant of res.data) {
                let lat = restaurant.latitude
                let lng = restaurant.longitude

                // Add a marker to the google map
                let id = restaurant.id
                let name = restaurant.name
                let street_address = restaurant.street_address
                let district = restaurant.district
                let area = restaurant.area
                let description = restaurant.description
                let telephone_number = restaurant.telephone_number
                let website_URL = restaurant.website_URL

                const contentString =
                    '<h5><a href="/restaurant/details/' + id + '">' + name + '</a></h5>' +
                    '<div id="bodyContent">' +
                    '<p>' + description + '</p>' +
                    '<h6>Address</h6>' +
                    '<p>' + street_address + ', ' + district + ', ' + area + '</p>' +
                    '<h6>Telephone</h6>' +
                    '<p>' + telephone_number + '</p>' +
                    '<h6>Website</h6>' +
                    '</p>' + '<a href="' + website_URL + '">' + website_URL + '</a>' + '</p>'
                '</div>';

                let infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                let marker = new google.maps.Marker({
                    position: { lat, lng },
                    map: map
                });

                markers.push(marker)

                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                    if (currentWindow){
                        currentWindow.close()
                    }
                    currentWindow = infowindow
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

// Get a restaurant's latitude and longitude
function getRestaurantLatLng() {
    let url = window.location.href
    let restaurant_id = url.split('/').splice(-1)[0]
    let lat
    let lng

    // Get restaurant information
    return axios({
        url: '/restaurant/individual/' + restaurant_id,
        method: 'get'
    })
        .then((res) => {
            console.log(res.data)
            lat = res.data[0].latitude
            lng = res.data[0].longitude
            console.log(lat, lng)
            return { lat, lng }
        })
        .catch((error) => {
            console.log(error);
        })
}
