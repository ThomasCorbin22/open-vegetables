$(document).ready(function () {
  // On search submission send get request
  $('#main-search').on('submit', (e) => {
    e.preventDefault();

    let route = $('#main-filter').val()
    let input = $('#main-input').val()
    let url

    if (route === 'restaurants') url = '/restaurant/' + area + '/alpha/descending?name=' + input
    else if (route === 'blogs') url = '/blog/alpha/descending?title=' + input

    window.location.replace(url);
  })
})