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

//control button - create new Blog, new resta, new comment, new review
  $('#createNewbtn').click(function (e) {
    if ($(this).text().match('Create')) {
      $('#createNew').show()
      $(this).text('Cancel Creation')
    } else {
      $('#createNew').hide()
      if($(this).next().children().find('label').text().match('Title')){
        $(this).text('Create a new blog')
      }
      if($(this).next().children().find('label').text().match('Name')){
        $(this).text('Create a new restaurant')
      }
      if($(this).next().hasClass('newComment')){
        $(this).text('Create a new comment')
      }
      if($(this).next().hasClass('newReview')){
        $(this).text('Create a new review')
      }
    }
  })

  $('#newBlogSubmitBtn').submit(function (e) {
    e.preventDefault()
    let title = $('#newBlogTitle').val()
    let body = $('#newBlogBody').val()

    // axios({
    //   url: '/blog',
    //   method: 'post',
    //   data: {
    //     "title": title,
    //     "body": body,
    //     "user_id": 2
    //   }
    // })
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

  })

//control button - edit existing Blog, existing resta, existing comment, existing review

  $('#editBtn').click(function (e) {
    if ($(this).children().text().match('Edit')) {
      $('#updateExisting').show()
      $(this).children().text('X')
      $(this).parent().next().children('.card').hide()
    } else{
      $(this).children().text('Edit')
      $('#updateExisting').hide()
      $(this).parent().next().children('.card').show()
    }
  })

  $('#existBlogDeleteBtn').click(function(e){
    e.preventDefault()
    
  })

  //control add to favourite button
  $('.add-favourite').on('click',function(e) {
    let resta_id = e.currentTarget.parentNode.previousElementSibling.firstChild.getAttribute("href").slice(-1)
    if (e.currentTarget.innerHTML.match('☆')) {
      e.currentTarget.innerHTML = '★ Favourite Restaurant'
    } else if (e.currentTarget.innerHTML.match('★')) {
      e.currentTarget.innerHTML = '☆ Add to favourite'
    }
    // axios({
    //   url: '/user/restaurant',
    //   method: 'post',
    //   data: {
    //     "user_id": 1,
    //     "restaurant_id": 2
    //   }
    // })
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

  })

  // control image upload, decode image buffer to render 
  function renderImg(e,targetDOM){
    let file = e.target.files[0]
    console.log(file)

    let reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = function () {
      targetDOM.attr('src', reader.result)
    }
  }

  $('#userImageUpload').on('change', function(e) {
    renderImg(e,$('#userImage'))
  })
  $('.uploadImg').on('change',function(e) {
    renderImg(e,$(this).next())
  })

 //control login modal - click forget pwd to hide the original page
$('#forgetPwdBtn').on('click',function(e){
  $('.close').click()
})
$('#submitSecurity').on('click',function(e){
  e.preventDefault()
  $('#securityPage').hide()
  $('#resetPwdPage').show()
})


  // Update users information via put request
  $('#updateuserbtn').click((e) => {
    e.preventDefault()
    let firstName = $('#nameFirst').val()
    let lastName = $('#nameLast').val()
    let email = $('#email').val()
    let displayName = $('#nameDisplay').val()
    let password = $('#password').val()
    let description = $('#description').val()
    let profile_picture_URL = $('#userImage').attr('src')


    // axios({
    //   url: `/${user_id}`,
    //   method: 'put',
    //   data: {
    //     "display_name": displayName,
    //     "first_name": firstName,
    //     "last_name": lastName,
    //     "email": email,
    //     "password": password,
    //     "description": description,
    //     'profile_picture_URL': profile_picture_URL
    //   }
    // })
    //   .then((res) => {

    //     $('#nameFirst').attr('placeholder', res.data)
    //     $('#nameLast').attr('placeholder', res.data)
    //     $('#email').attr('placeholder', res.data)
    //     $('#nameDisplay').attr('placeholder', res.data)
    //     $('#password').attr('placeholder', res.data)
    //     $('#description').attr('placeholder', res.data)
    //     $('#userImage').attr('src')
    //   })

    //   .catch((error) => {
    //     console.log(error);
    //   })


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
