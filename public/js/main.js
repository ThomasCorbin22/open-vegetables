$(document).ready(function(){
    if($('title').text().match('Home')){
        $('.navbar-nav > li:eq(0)').addClass('active')
    }
    if($('title').text().match(/^Restaurants/)){
        $('.navbar-nav > li:eq(2)').addClass('active')
    }
    $('.my-2').click(()=>{
        $('.my-2').text('★ Favourite restaurants')
    })
    function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
  });
