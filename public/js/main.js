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
    
  });