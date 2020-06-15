let user_id = 3

$(document).ready(function () {
  if ($('title').text().match('Home')) {
    $('.navbar-nav > li:eq(0)').addClass('active')
  }
  if ($('title').text().match(/^Restaurants/)) {
    $('.navbar-nav > li:eq(2)').addClass('active')
  }
  $('.my-2').click(() => {
    $('.my-2').text('★ Favourite restaurants')
  })
  // function initMap() {
  //   var uluru = { lat: -25.363, lng: 131.044 };
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 4,
  //     center: uluru
  //   });
  //   var marker = new google.maps.Marker({
  //     position: uluru,
  //     map: map
  //   });
  // }

  axios({
    url: '/auth/login',
    method: 'get'
  })
    .then((res) => {
      if (res.data === 'Not Logged In') {
        $('#login').show()
        $('#signup').show()
      }
      else {
        user = res.data
        $('#logout').show()
      }
    })
    .catch((error) => {
      console.log(error);
    })

  $('#logout').click(e => {
    e.preventDefault();

    axios({
      url: '/auth/logout',
      method: 'get'
    })
      .then(() => {
        location.reload()
      })
      .catch((error) => {
        console.log(error);
      })
  })


  $('#userImageUpload').on('change', (e) => {
    let file = e.target.files[0]
    console.log(file)

    let reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = function () {
      console.log(reader.result)
      $('#userImage').attr('src', reader.result)

    }
  })


  $('#updateuserbtn').click((e) => {
    e.preventDefault()
    let firstName = $('#nameFirst').val()
    let lastName = $('#nameLast').val()
    let displayName = $('#nameDisplay').val()
    let email = $('#email').val()
    let password = $('#password').val()
    let description = $('#description').val()
    let userImageURL = $('#userImage').attr('src')

    console.log()
    // Update review


    axios({
      url: `/${user_id}`,
      method: 'put',
      data: {
        "display_name": displayName,
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password,
        "description": description,
        'profile_picture_URL': userImageURL
      }
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      })


  })
});
