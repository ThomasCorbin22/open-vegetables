let hongkong = { lat: 22.3193, lng: 114.1694 }
let map
let markers = []
let currentWindow
let districts

$(document).ready(function () {
    if ($('title').text().match(/^Map/)) {
        $('.navbar-nav > li:eq(3)').addClass('active')
    }

    $('.map-link').click((e) => {
        e.preventDefault()

        let lat = parseFloat($(e.target).attr("data-lat"))
        let lng = parseFloat($(e.target).attr("data-lng"))

        let latlng = {lat, lng}

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

// Initialise google maps
async function initMap() {
    let restaurant

    if ($('title').text().match('Restaurant-Details')) {
        restaurant = await getRestaurantLatLng()
    }

    // Map options
    let options = {
        zoom: 15,
        center: restaurant || hongkong
    }
    // New map
    map = new google.maps.Map(document.getElementById('map'), options);

    if (restaurant) {
        let marker = new google.maps.Marker({ position: restaurant, map: map });
        markers.push(marker)
    }
    else {
        putRestaurantMarkers(map, hongkong, 50)
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
                    if (currentWindow) {
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
            lat = res.data[0].latitude
            lng = res.data[0].longitude
            return { lat, lng }
        })
        .catch((error) => {
            console.log(error);
        })
}
