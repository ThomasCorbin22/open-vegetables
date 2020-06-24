let user_id
let filter = 'none'
let direction = 'ascending'
let area = 'all'
let user_answer

$(document).ready(function () {

  // Change active navbar link
  if ($('title').text().match('Home')) {
    $('.navbar-nav > li:eq(0)').addClass('active')
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
  $('#create-new-btn').click(function (e) {
    if ($(this).text().match('Create')) {
      $('#create-new').show()
      $(this).text('Cancel Creation')
    } else {
      $('#create-new').hide()
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

  // render the category list & district list to front end
  if ($('.restaurant-link')) {

    axios({
      url: '/restaurant/category/list/all',
      method: 'get'
    })
      .then((res) => {
        let categories = []

        for (let item of res.data) {
          categories.push(item.category)
        }

        categories = new Set(categories)
        categories.delete('Not available')
        categories = Array.from(categories)

        categories.sort()

        for (let item of categories) {
          $('.restaCate').append(`<option value=${item}>${item}</option>`)
        }
      })
      .catch((error) => {
        console.log(error);
      })

    axios({
      url: '/location/district/list/all',
      method: 'get'
    })
      .then((res) => {
        let districts = []

        for (let item of res.data) {
          districts.push(item.district)
        }

        districts = new Set(districts)
        districts.delete('Not available')
        districts = Array.from(districts)

        districts.sort()
        for (let [i, item] of districts.entries()) {
          $('.restaurant-district').append(`<option value=${i} ${item}>${item}</option>`)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //control button - edit existing Blog, existing resta, existing comment, existing review

  $('.edit-btn').click(function (e) {
    if ($(this).children().text().match('Edit')) {
      $(this).parent().next().find('.update-existing').show()
      $(this).children().text('X')
      $(this).parent().next().find('.exist-content').hide()
    } else {
      $(this).children().text('Edit')
      $(this).parent().next().find('.update-existing').hide()
      $(this).parent().next().find('.exist-content').show()
    }
  })

  $('#exist-blog-delete-btn').click(function (e) {
    e.preventDefault()
  })

  //control add to favourite button
  $('.add-favourite').on('click', function (e) {
    let restaurant_id = e.currentTarget.parentNode.previousElementSibling.firstChild.getAttribute("href").split('/').splice(-1)[0]
    if (e.currentTarget.innerHTML.match('☆')) {
      console.log(user_id)
      console.log(restaurant_id)
      axios({
        url: '/user/favourite/restaurant',
        method: 'post',
        data: {
          user_id,
          restaurant_id
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
      let restaurant_favourite = e.currentTarget.getAttribute("id").split('-').splice(-1)[0]
      axios({
        url: `/user/favourite/restaurant/${restaurant_favourite}`,
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

  $('#userImageUpload').on('change', function (e) {
    renderImg(e, $('#userImage'))
  })
  $('.uploadImg').on('change', function (e) {
    renderImg(e, $(this).next())
  })
  $('.uploadImgMore').on('change', function (e) {
    renderImg(e, $(this).next())
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
})



// control image upload, decode image buffer to render 
function renderImg(e, targetDOM) {
  let file = e.target.files[0]

  let reader = new FileReader()

  reader.readAsDataURL(file)

  reader.onload = function () {
    console.log(targetDOM)

    if (targetDOM.attr('src')) {
      targetDOM.attr('src', reader.result)
    }
    else {
      targetDOM.append(`<img class='custom-area-sm mb-1' title='${file.name}' src='${reader.result}'>`)
    }
  }
}