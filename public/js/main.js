let user_id = 3

$(document).ready(function () {
  // Change active navbar link
  if ($('title').text().match('Home')) {
    $('.navbar-nav > li:eq(0)').addClass('active')
  }
  if ($('title').text().match(/^Restaurants/)) {
    $('.navbar-nav > li:eq(1)').addClass('active')
  }
  if ($('title').text().match(/^Blogs/)) {
    $('.navbar-nav > li:eq(2)').addClass('active')
  }
  if ($('title').text().match(/^Map/)) {
    $('.navbar-nav > li:eq(3)').addClass('active')
  }

  // On search submission send get request
  $('#form-search').on('submit', (e) => {
    e.preventDefault();

    let filter = $('#form-filter').val()
    let input = $('#form-input').val()
    let url

    if (filter === 'restaurants') url = '/' + filter + '/search/?name=' + input
    else if (filter === 'blogs') url = '/' + filter + '/search/?title=' + input
    else if (filter === 'users') url = '/' + filter + '/search/?display_name=' + input

    window.location.replace(url);
  })

  // Add a favourite restaurant to a user
  // $('.my-2').click(() => {
  //   $('.my-2').text('★ Favourite restaurants')
  // })

  // Adds active class to homepage carousel
  $('.carousel-item:first').addClass('active')

  // On load, check if the user is logged in or not
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
        $('#profile').show()
        $('#logout').show()
      }
    })
    .catch((error) => {
      console.log(error);
    })

  // On log out, refresh the page
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

  // Update user image
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

  // Update users information via put request
  $('#updateuserbtn').click((e) => {
    e.preventDefault()
    let firstName = $('#nameFirst').val()
    let lastName = $('#nameLast').val()
    let displayName = $('#nameDisplay').val()
    let email = $('#email').val()
    let password = $('#password').val()
    let description = $('#description').val()
    let userImageURL = $('#userImage').attr('src')

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
