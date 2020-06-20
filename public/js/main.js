let user_id
let filter = 'none'
let direction = 'ascending'
let area = 'all'

$(document).ready(function () {
  if ($('title').text().match('map')) {
    initMap()
  }
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
  $('#main-search').on('submit', (e) => {
    e.preventDefault();

    let route = $('#main-filter').val()
    let input = $('#main-input').val()
    let url

    if (route === 'restaurants') url = '/restaurant/' + area + '/alpha/descending?name=' + input
    else if (route === 'blogs') url = '/blog/alpha/descending?title=' + input
    else if (route === 'users') url = '/user/all?display_name=' + input

    window.location.replace(url);
  })

  // Adds districts to dropdown menu
  if ($('#restaurant-district')) {
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

        for (let item of districts) {
          $('#restaurant-district').append(`<option value=${item}>${item}</option>`)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // Adds districts to dropdown menu
  if ($('#restaurant-category')) {
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
          $('#restaurant-category').append(`<option value=${item}>${item}</option>`)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // On restaurant search submission send get request
  $('#restaurant-search').on('submit', (e) => {
    e.preventDefault();

    let input = $('#restaurant-input').val()
    let categories = $('#restaurant-category').val()
    let price = $('#restaurant-price').val()
    let district = $('#restaurant-district').val()
    let area = $('#restaurant-area').val()

    let url = '/restaurant/' + area + '/alpha/descending?name=' + input + '&categories=' + categories + '&price=' + price + '&district=' + district

    window.location.replace(url);
  })

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
        user_id = res.data.id
        $('#profile').show()
        $('#logout').show()
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

  //delete exist blog
  $('.btnBlogGroup button:last-child').click(function (e) {
    e.preventDefault()
    let blogId = $(this).closest('form').next().find('.blogLink').attr('href').match(/\d+/)
    console.log(blogId)
    axios({
      url: '/blog/' + parseInt(blogId),
      method: 'delete'
    })
      .then((res) => {
        console.log(res.data)
        location.reload();

      })
      .catch((error) => {
        console.log(error);
      })
  })


  //update exist blog + categories + images
  $('.btnBlogGroup button:first-child').click(function (e) {
    e.preventDefault()
    let title = $(this).closest('form').find('.blogTitle').val()
    let body = $(this).closest('form').find(".blogBody").val()
    let categories = []
    $.each($('input[name="category"]:checked'), function (e) {
      axios({
        url: '/blog/category/' + parseInt($(this).attr('name').match(/\d+/)),
        method: 'put',
        data: {
          "category": $(this).val(),
          "blog_id": blog_ID
        }
      })
        .then((res) => {
          console.log(res.data)
          // location.reload()
        })
        .catch((error) => {
          console.log(error);
        })
      categories.push($(this).val())
    })
    let image_url = $(this).closest('form').find('.blogPic').attr('src')
    let blog_ID = parseInt($(this).closest('form').next().find('.blogLink').attr('href').match(/\d+/))
    console.log(title, body, categories, image_url, blog_ID)
    axios({
      url: '/blog/' + blog_ID,
      method: 'put',
      data: {
        "title": title,
        "body": body,
        "user_id": user_id
      }
    })
      .then((res) => {
        axios({
          url: '/blog/picture/' + blog_ID,
          method: 'put',
          data: {
            "picture_URL": image_url,
            "blog_id": blog_ID
          }
        })
          .then((res) => {
            console.log(res.data)
          })
          .catch((error) => {
            console.log(error);
          })


      })
      .catch((error) => {
        console.log(error);
      })
  })


  //add new blog + categories + images
  $('#newBlogSubmitBtn').click(function (e) {
    e.preventDefault()
    let title = $('#newBlogTitle').val()
    let body = $('#newBlogBody').val()
    let image_url = $('#newImg').next().attr('src')
    axios({
      url: '/blog',
      method: 'post',
      data: {
        "title": title,
        "body": body,
        "user_id": user_id
      }
    })
      .then((res) => {
        console.log(res.data)
        $.each($("input[name='category']:checked"), function () {
          axios({
            url: '/blog/category',
            method: 'post',
            data: {
              "category": $(this).val(),
              "blog_id": res.data[0].id
            }
          })
            .then((res) => {
              console.log(res.data)

            })
            .catch((error) => {
              console.log(error);
            })
        })
        axios({
          url: '/blog/picture',
          method: 'post',
          data: {
            "picture_URL": image_url,
            "blog_id": res.data[0].id
          }
        })
          .then((res) => {
            console.log(res.data)
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          })

      })
      .catch((error) => {
        console.log(error);
      })
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

  $('#existBlogDeleteBtn').click(function (e) {
    e.preventDefault()
  })

  //control add to favourite button
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

  // control image upload, decode image buffer to render 
  function renderImg(e, targetDOM) {
    let file = e.target.files[0]
    console.log(file)

    let reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = function () {
      targetDOM.attr('src', reader.result)
    }
  }

  $('#userImageUpload').on('change', function (e) {
    renderImg(e, $('#userImage'))
  })
  $('.uploadImg').on('change', function (e) {
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

  //user update reviews (edit button available)
  if ($('#restaLink').text()) {
    axios({
      url: '/review/list/' + parseInt($('#restaLink').attr('href').match(/\d+/)),
      method: 'get'
    })
      .then((res) => {
        if (user_id) {
          console.log(res.data)
          console.log(user_id)
          $('#createNewBtn').show()
          for (let review of res.data) {
            if (review.user_id == user_id) {
              $(`.userID${user_id}Edit`).show()
              $(`.userID${user_id}Edit`).next().addClass('col-sm-10').removeClass('col-sm-12')
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //user update comment (edit button available)

  if ($('#blogLink').text()) {
    axios({
      url: '/comment/list/' + parseInt($('#blogLink').attr('href').match(/\d+/)),
      method: 'get'
    })
      .then((res) => {
        if (user_id) {
          console.log(res.data)
          $('#createNewBtn').show()
          for (let comment of res.data) {
            console.log(comment)
            if (comment.user_id == user_id) {
              $(`.userID${user_id}Edit`).show()
              $(`.userID${user_id}Edit`).next().addClass('col-sm-10').removeClass('col-sm-12')
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }


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

    axios({
      url: `/user/${user_id}`,
      method: 'put',
      data: {
        "display_name": displayName,
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password,
        "description": description,
        'profile_picture_URL': profile_picture_URL
      }
    })
      .then((res) => {
        console.log(res)
        $('#nameFirst').attr('placeholder', res.data)
        $('#nameLast').attr('placeholder', res.data)
        $('#email').attr('placeholder', res.data)
        $('#nameDisplay').attr('placeholder', res.data)
        $('#password').attr('placeholder', res.data)
        $('#description').attr('placeholder', res.data)
        $('#userImage').attr('src')
      })

      .catch((error) => {
        console.log(error);
      })
  })

  // Add new restaurant + corresponding user can access it=
  $('#newRestaSubmitBtn').click(function (e) {
    e.preventDefault()
    let restaName = $('#newRestaName').val()
    let restaAddress = $('#newRestaAddress').val()
    let restaDistrict
    let restaDescri = $('#newRestaDescri').val()
    let newLogo = $('#newLogo').next().attr('src')
    let restaPrice = $('#newRestaPrice').val()
    let restaPhone = $('#newRestaPhone').val()
    let restaSocial = $('#newRestaSocial').val()
    let restaURL = $('#newRestaURL').val()
    let newImg = $('#newImg').next().attr('src')


    let restaOp = $('#newRestaOp').val()
    let restaCl = $('#newRestaCl').val()

    axios({
      url: '/restaurant',
      method: 'post',
      data: {
        "name": restaName,
        "street_address": restaAddress,
        "district_id": 1,
        "description": restaDescri,
        "logo": newLogo,
        "price": restaPrice,
        "telephone_number": restaPhone,
        "social_media_URL": restaSocial,
        "main_picture_URL": newImg,
        "website_URL": restaURL,
        "latitude": 19.3,
        "longitude": 105.2,
        "monday": `${restaOp}-${restaCl}`,
        "tuesday": `${restaOp}-${restaCl}`,
        "wednesday": `${restaOp}-${restaCl}`,
        "thursday": `${restaOp}-${restaCl}`,
        "friday": `${restaOp}-${restaCl}`,
        "saturday": `${restaOp}-${restaCl}`,
        "sunday": `${restaOp}-${restaCl}`,
      }
    })
      .then((res) => {
        console.log(res.data[0])
        axios({
          url: '/user/access',
          method: 'post',
          data: {
            "user_id": user_id,
            "restaurant_id": res.data[0].id
          }
        })
          .then((res) => {
            console.log(res.data)
            location.reload();
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        console.log(error);
      })
  })
  // Add new restaurant + corresponding user can access it=
  $('#newReviewSubmitBtn').click(function (e) {
    e.preventDefault()
    let title = $('#newTitle').val()
    let body = $('#newBody').val()
    let rating = $('#newRating').val()
    let newImg = $('#newImg').next().attr('src')

    let restaurant_id = window.location.href.split('/').splice(-1)[0]

    axios({
      url: '/review',
      method: 'post',
      data: {
        "title": title,
        "body": body,
        "rating": rating,
        "user_id": user_id,
        "restaurant_id": restaurant_id
      }
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  })

  // $('.btnGroup button:eq(1)').click(function (e) {
  //   let resta_id = $(this).closest('form').next().find('.restaLink').attr('href').match(/\d+/)
  //   axios({
  //     url: '/restaurant/' + parseInt(resta_id),
  //     method: 'put',
  //     data: {
  //       "name": 'Our cool restaurant: V2',
  //       "street_address": 'GreenLand',
  //       "district_id": 4,
  //       "description": 'Nicer food',
  //       "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.6iu2HE0CMnwIpGvu66bMaAHaFj%26pid%3DApi&f=1',
  //       "price": 2,
  //       "telephone_number": '999',
  //       "social_media_URL": 'www.google.com',
  //       "main_picture_URL": 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //       "website_URL": 'www.cool.com',
  //       "latitude": 23.0,
  //       "longitude": 113.6,
  //       "opening_time": '09:30',
  //       "closing_time": '21:50'
  //     }
  //   })
  //     .then((res) => {
  //       console.log(res.data)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // })
  //Delete restaurant
  $('.btnRestaGroup button:last-child').click(function (e) {
    e.preventDefault()
    let resta_id = $(this).closest('form').next().find('.restaLink').attr('href').match(/\d+/)
    console.log(resta_id)
    axios({
      url: '/restaurant/' + parseInt(resta_id),
      method: 'delete'
    })
      .then((res) => {
        console.log(res.data)
        location.reload();

      })
      .catch((error) => {
        console.log(error);
      })
  })
})

