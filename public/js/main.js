let user_id
let filter = 'none'
let direction = 'ascending'
let area = 'all'

$(document).ready(function () {

  // Change active navbar link
  if ($('title').text().match('Home')) {
    $('.navbar-nav > li:eq(0)').addClass('active')
  }
  if ($('title').text().match(/^Map/)) {
    $('.navbar-nav > li:eq(3)').addClass('active')
  }

  // Adds active class to homepage carousel
  $('.carousel-item:first').addClass('active')

  // On load, check if the user is logged in or not
  axios({
    url: '/auth/login',
    method: 'get'
  })
    .then((res) => {
      if (res.data === 'Not Logged In') {
        $('#login-dropdown').show()
        $('#login').show()
        $('#signup').show()
        
        $('#profile').hide()
        $('#logout').hide()
      }
      else {
        user_id = res.data.id
        $('#profile').show()
        $('#logout').show()

        $('#login-dropdown').hide()
        $('#login').hide()
        $('#signup').hide()

        $('#profile-link').attr('href', '/user/info/' + user_id)
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
  $('#createNewBtn').click(function (e) {
    if ($(this).text().match('Create')) {
      $('#createNew').show()
      $(this).text('Cancel Creation')
    } else {
      $('#createNew').hide()
      if ($(this).next().children().find('label').text().match('Title')) {
        $(this).text('Create a new blog')
      }
      if ($(this).next().children().find('label').text().match('Name')) {
        $(this).text('Create a new restaurant')
      }
      if ($(this).next().hasClass('newComment')) {
        $(this).text('Create a new comment')
      }
      if ($(this).next().hasClass('newReview')) {
        $(this).text('Create a new review')
      }
    }
  })

  //control button - edit existing Blog, existing resta, existing comment, existing review

  $('.editBtn').click(function (e) {
    if ($(this).children().text().match('Edit')) {
      $(this).parent().next().find('.updateExisting').show()
      $(this).children().text('X')
      $(this).parent().next().find('.existContent').hide()
    } else {
      $(this).children().text('Edit')
      $(this).parent().next().find('.updateExisting').hide()
      $(this).parent().next().find('.existContent').show()
    }
  })

  //control add restaurant favourite button
  $('.add-favourite').on('click', function (e) {
    let resta_id = e.currentTarget.parentNode.previousElementSibling.firstChild.getAttribute("href").split('/').splice(-1)[0]
    if (e.currentTarget.innerHTML.match('☆')) {
      console.log(user_id)
      console.log(resta_id)
      axios({
        url: '/user/favourite/restaurant',
        method: 'post',
        data: {
          "user_id": user_id,
          "restaurant_id": resta_id
        }
      })
        .then((res) => {
          console.log(res)
          e.currentTarget.innerHTML = '★ Favourite Restaurant'
          $(e.currentTarget).attr('id', 'favourite-' + res.data[0].id)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    else if (e.currentTarget.innerHTML.match('★')) {
      let resta_favourite = e.currentTarget.getAttribute("id").split('-').splice(-1)[0]
      axios({
        url: `/user/favourite/restaurant/${resta_favourite}`,
        method: 'delete',
      })
        .then((res) => {
          console.log(res)
          e.currentTarget.innerHTML = '☆ Add to favourite'
        })
        .catch((error) => {
          console.log(error);
        })
    }
  })


  //control login modal - click forget pwd to hide the original page
  $('#forgetPwdBtn').on('click', function (e) {
    $('.close').click()
  })
  $('#submitSecurity').on('click', function (e) {
    e.preventDefault()
    $('#securityPage').hide()
    $('#resetPwdPage').show()
  })

  // Add new review
  $('#newReviewSubmitBtn').click(function (e) {
    e.preventDefault()
    let title = $('#newTitle').val()
    let body = $('#newBody').val()
    let image = $('#newImg').next().attr('src')
    let rating

    if ($('#newRating-1').prop('checked')) rating = 1
    if ($('#newRating-2').prop('checked')) rating = 2
    if ($('#newRating-3').prop('checked')) rating = 3
    if ($('#newRating-4').prop('checked')) rating = 3
    if ($('#newRating-5').prop('checked')) rating = 5

    let restaurant_id = window.location.href.split('/').splice(-1)[0]

    axios({
      url: '/review',
      method: 'post',
      data: {
        title,
        body,
        rating,
        user_id,
        restaurant_id
      }
    })
      .then((res) => {
        console.log(res.data)
        // Add new review picture
        if (image) {
          axios({
            url: '/review/picture',
            method: 'post',
            data: {
              "picture_URL": image,
              "review_id": res.data[0].id
            }
          })
            .then((res) => {
              location.reload();
            })
            .catch((error) => {
              console.log(error);
            })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  })

  // Update existing review
  $('.existReviewSubmit').click(function (e) {
    e.preventDefault()

    let id = $(e.target).attr('id').split('-').splice(-1)[0]
    let title = $(`#existTitle-${id}`).val()
    let body = $(`#existBody-${id}`).val()
    let image = $(`#existImg-${id}`).next().attr('src')
    let rating

    if ($(`#existRating-1-${id}`).prop('checked')) rating = 1
    if ($(`#existRating-2-${id}`).prop('checked')) rating = 2
    if ($(`#existRating-3-${id}`).prop('checked')) rating = 3
    if ($(`#existRating-4-${id}`).prop('checked')) rating = 4
    if ($(`#existRating-5-${id}`).prop('checked')) rating = 5

    let restaurant_id = window.location.href.split('/').splice(-1)[0]

    axios({
      url: '/review/' + id,
      method: 'put',
      data: {
        id,
        title,
        body,
        modified: true,
        rating,
        user_id,
        restaurant_id
      }
    })
    .then((res) => {
      console.log(res.data)
      let review_id = res.data[0].id

      if (image) {
        // Get review pictures
        axios({
          url: '/review/picture/list/' + id,
          method: 'get'
        })
        .then((res) => {
          console.log(res.data)
          let picture_id = res.data[0].id

          // Update new review picture
          axios({
            url: '/review/picture',
            method: 'put',
            data: {
              id: picture_id,
              "picture_URL": image,
              "review_id": review_id
            }
          })
          .then((res) => {
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          })
        })
        .catch((error) => {
          console.log(error);
        })
      }
      else location.reload();
    })
    .catch((error) => {
      console.log(error);
    })
  })
})

