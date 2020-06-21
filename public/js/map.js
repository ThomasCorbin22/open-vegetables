let districts = {
    // hk island coords
    central: { lat: 22.28, lng: 114.1588 },
    wanchai: { lat: 22.276, lng: 114.1751 },
    causewaybay: { lat: 22.2860, lng: 114.1915 },
    northpoint: { lat: 22.2885, lng: 114.1928 },
    // kowloon coords
    tsimshatsui: { lat: 22.2988, lng: 114.1722 },
    mongkok: { lat: 22.3204, lng: 114.1698 },
    kwuntong: { lat: 22.3104, lng: 114.2227 },
    tsuenwan: { lat: 22.3699, lng: 114.1144 },
    // new territories coords
    shatin: { lat: 22.3771, lng: 114.1974 },
    taipo: { lat: 22.4423, lng: 114.1655 },
    tuenmun: { lat: 22.3908, lng: 113.9725 },
    yuenlong: { lat: 22.4445, lng: 114.0222 },
    // outlying island coords
    lantauisland: { lat: 22.2665, lng: 113.9418 },
    lammaisland: { lat: 22.2000, lng: 114.1350 },
    cheungchau: { lat: 22.2016, lng: 114.0265 },
}

function extractsDistrict() {
    let url = window.location.href
    let spliturl = url.split('/')[6]
    return spliturl
}

function extractsLatLng() {
    let url = window.location.href
    let spliturl = url.split('/')[6]
    return districts[spliturl]
}

async function initMap() {
    let latlng

    if ($('title').text().match('restaurant-detail')) {
        latlng = await getRestaurantLatLng()
    }

    // Map options
    var options = {
        zoom: 15,
        center: extractsLatLng() || latlng || { lat: 22.3193, lng: 114.1694 }
    }
    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    if (latlng) {
        let marker = new google.maps.Marker({ position: latlng, map: map });
    }
    if (extractsLatLng()) {
        putMarkers(map)
    }
}

function putMarkers(map) {
    // Search all restaurants
    axios({
        url: '/restaurant/search?district=' + extractsDistrict(),
        method: 'get'
    })
        .then((res) => {
            // res.data will have all of the corresponding restaurants that have correct area and district
            console.log(res.data)

            for (let restaurant of res.data) {
                console.log(restaurant)
                let lat = restaurant.latitude
                let lng = restaurant.longitude

                console.log(lat, lng)
                // Add a marker to the google map
                console.log(restaurant)
                let restoName = restaurant.name
                let restoAddress = restaurant.street_address
                let restoDescription = restaurant.description
                let restoPrice = restaurant.price
                let restoLogo = restaurant.logo
                let restoTel = restaurant.telephone_number
                let restoTime = restaurant.monday
                let restoWeb = restaurant.website_URL
                console.log(restoName, restoAddress, restoDescription, restoPrice, restoLogo, restoTel, restoTime, restoWeb)

                const contentString = '<h5>' + restoName + '</h5>' +
                    '<div id="bodyContent">' +
                    restoDescription + '<image>' + restoLogo + '</image>' + '<h6>Address</h6>' + '<p>' +  restoAddress + '</p>' +
                    '<h6>Telephone</h6>' + '<p>' + restoTel + '</p>' + '<h6>Time</h6>' + '<p>' + restoTime + '<h6>Website</h6>' + '</p>' + '<a href="restoWeb">' + restoWeb + '</a>'
                    '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });


                let marker = new google.maps.Marker({
                    position: { lat, lng },
                    map: map
                });
                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

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
