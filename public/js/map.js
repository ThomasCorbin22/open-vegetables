let districts = {
    central: {lat: 22.28, lng:114.1588},
    wanchai: {lat: 22.276, lng:114.1751},
}

function extractsDistrictFromURL(){
    let url = window.location.href
    let spliturl = url.split('/')[6]
    console.log(spliturl)
    return districts[spliturl]
}

function initMap() {
    // Map options
    var options = {
        zoom: 15,
        center: extractsDistrictFromURL()
    }
    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);
}