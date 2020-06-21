let user_id
let filter = 'none'
let direction = 'ascending'
let area = 'all'

// Initially hide the logged in links
$('#profile').hide()
$('#logout').hide()

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

  // render the category list & district list to front end
  if ($('.restaLink').text()) {

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
          $('.restaDist').append(`<option value=${i} ${item}>${item}</option>`)
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //update exist blog + categories + images
  $('.btnBlogGroup button:first-child').click(function (e) {
    e.preventDefault()
    let title = $(this).closest('form').find('.blogTitle').val()
    let body = $(this).closest('form').find(".blogBody").val()
    let mainPic = $(this).closest('form').find('.blogMainPic').attr('src')
    let pic = $(this).closest('form').find('.blogPic').attr('src')
    let blog_ID = parseInt($(this).closest('form').next().find('.blogLink').attr('href').match(/\d+/))
    console.log(title, body, pic, blog_ID)

    //list all cate belong to that blog
    axios({
      url: '/blog/category/list/' + blog_ID,
      method: 'get'
    })
      .then((res) => {
        console.log(res.data)

        //if checkbox is modified, delete the original cate in db
        if ($('input[name="category"]:checked').val()) {
          for (let blogCate of res.data) {
            axios({
              url: '/blog/category/' + blogCate.id,
              method: 'delete'
            })
              .then((res) => {
                console.log(res.data)
              })
              .catch((error) => {
                console.log(error);
              })
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })

    // for each checked category item append them to db
    $.each($('input[name="category"]:checked'), function (e) {
      axios({
        url: '/blog/category',
        method: 'post',
        data: {
          "category": $(this).val(),
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
    //update blog details
    axios({
      url: '/blog/individual/' + blog_ID,
      method: 'put',
      data: {
        "title": title,
        "body": body,
        "user_id": user_id,
        "main_picture_URL": mainPic
      }
    })
      .then((res) => {
        //for each pictures update their url
        location.reload()

        $.each($('.blogImgs'), function (e) {
          let picID = parseInt($(this).find('.blogPic').attr('alt').match(/\d+/))
          $(this).find('.blogPic').prev().change(function (e) {

            axios({
              url: '/blog/picture/' + picID,
              method: 'put',
              data: {
                "picture_URL": $(this).attr('src'),
                "blog_id": blog_ID
              }
            })
              .then((res) => {
                console.log(res.data)
                location.reload()
              })
              .catch((error) => {
                console.log(error);
              })
          })
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
    let mainPic = $('#newMainImg').next().attr('src')
    let newPic = []
    $('#newPic').children('img').each(function () {
      newPic.push(this.src)
    })
    axios({
      url: '/blog/individual',
      method: 'post',
      data: {
        "title": title,
        "body": body,
        "user_id": user_id,
        "main_picture_URL": mainPic
      }
    })
      .then((res) => {
        console.log(res.data)
        // post new category
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
        //post every new pictures
        for (let pic of newPic) {
          axios({
            url: '/blog/picture',
            method: 'post',
            data: {
              "picture_URL": pic,
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
        }


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
      console.log(targetDOM)

      if (targetDOM.attr('src')) {
        targetDOM.attr('src', reader.result)
      }
      else {
        targetDOM.append(`<img class='custom-area-sm mb-1' title='${file.name}' src='${reader.result}'>`)
      }

    }
  }

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


  // update existing restaurant 
  $('.btnRestaGroup button:first-child').click(function (e) {
    e.preventDefault()
    let restaName = $(this).closest('form').find('.restaName').val()
    let restaAddress = $(this).closest('form').find('.restaAddress').val()
    let restaDistID = $(this).closest('form').find('.restaDist').val()
    let restaDescri = $(this).closest('form').find('.restaDescri').val()
    let restaLogo = $(this).closest('form').find('.restaLogo').attr('src')
    let restaPrice = $(this).closest('form').find('.restaPrice').val()
    let restaPhone = $(this).closest('form').find('.restaTele').val()
    let restaSocial = $(this).closest('form').find('.restaSocial').val()
    let restaURL = $(this).closest('form').find('.restaWeb').val()
    let restaImg = $(this).closest('form').find('.restaPic').attr('src')
    let restaID = parseInt($(this).closest('form').next().find('.restaLink').attr('href').match(/\d+/))
    let restaCate = $(this).closest('form').find('.restaCate').val()
    console.log(restaCate)
    let restaPic = []
    $.each($(this).closest('form').find('.restaPic'), function () {
      restaPic.push({ id: $(this).attr('title'), url: $(this).attr('src') })
    })
    console.log(restaPic)
    let restaNewPic = []
    $.each($(this).closest('form').find('.newPic').children(), function () {
      restaNewPic.push($(this).attr('src'))
    })
    console.log(restaNewPic)
    let restaOp = $(this).closest('form').find('.restaOp').val()
    let restaCl = $(this).closest('form').find('.restaCl').val()
    axios({
      url: '/restaurant/individual/' + restaID,
      method: 'put',
      data: {
        "name": restaName,
        "street_address": restaAddress,
        "district_id": restaDistID,
        "description": restaDescri,
        "logo": restaLogo,
        "price": restaPrice,
        "main_category": restaCate,
        "telephone_number": restaPhone,
        "social_media_URL": restaSocial,
        "main_picture_URL": restaImg,
        "website_URL": restaURL,
        "latitude": 23.0,
        "longitude": 113.6,
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
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      })

    //delete every category when update
    axios({
      url: '/restaurant/category/list/' + restaID,
      method: 'get'
    })
      .then((res) => {
        console.log(res.data)
        for (let cate of res.data) {
          axios({
            url: '/restaurant/category/' + cate.id,
            method: 'delete'
          })
            .then((res) => {
              console.log(res.data)
            })
            .catch((error) => {
              console.log(error);
            })
        }
      })
      .catch((error) => {
        console.log(error);
      })

    //update category
    axios({
      url: '/restaurant/category',
      method: 'post',
      data: {
        "category": restaCate,
        "restaurant_id": restaID
      }
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      })

    //update old pictures
    axios({
      url: '/restaurant/picture/list/' + restaID,
      method: 'get'
    })
      .then((res) => {
        console.log(res.data)

        for (let pic of res.data) {
          for (let picURL of restaPic) {
            if (picURL.id == pic.id) {
              axios({
                url: '/restaurant/picture/' + pic.id,
                method: 'put',
                data: {
                  "picture_URL": picURL.url,
                  "restaurant_id": restaID
                }
              })
                .then((res) => {
                  console.log(res.data)
                })
                .catch((error) => {
                  console.log(error);
                })
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })

    //add new Pictures
    for (let newPic of restaNewPic) {
      axios({
        url: '/restaurant/picture',
        method: 'post',
        data: {
          "picture_URL": newPic,
          "restaurant_id": restaID
        }
      })
        .then((res) => {
          console.log(res.data)
          location.reload()
        })
        .catch((error) => {
          console.log(error);
        })
    }
  })


  // Add new restaurant + corresponding user can access it=
  $('#newRestaSubmitBtn').click(function (e) {
    e.preventDefault()
    let restaName = $('#newRestaName').val()
    let restaAddress = $('#newRestaAddress').val()
    let restaDistID = parseInt($('#newRestaDist').val().match(/\d+/)) + 1
    let restaDescri = $('#newRestaDescri').val()
    let newLogo = $('#newLogo').next().attr('src')
    let restaPrice = $('#newRestaPrice').val()
    let restaPhone = $('#newRestaPhone').val()
    let restaSocial = $('#newRestaSocial').val()
    let restaURL = $('#newRestaURL').val()
    let newImg = $('#newMainImg').next().attr('src')
    let restaCate = $('#newRestaCate').val()
    let restaPic = []
    $('#newPic').children('img').each(function () {
      restaPic.push(this.src)
    })
    console.log(restaPic)

    let restaOp = $('#newRestaOp').val()
    let restaCl = $('#newRestaCl').val()
    //post new restaurant
    axios({
      url: '/restaurant/individual',
      method: 'post',
      data: {
        "name": restaName,
        "street_address": restaAddress,
        "district_id": restaDistID,
        "description": restaDescri,
        "logo": newLogo,
        "price": restaPrice,
        "telephone_number": restaPhone,
        "social_media_URL": restaSocial,
        "main_picture_URL": newImg,
        "main_category": restaCate,
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
        // allowing user access the new restaurant
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
        // post new pictures
        for (let newPic of restaPic) {
          axios({
            url: '/restaurant/picture',
            method: 'post',
            data: {
              "picture_URL": newPic,
              "restaurant_id": res.data[0].id
            }
          })
            .then((res) => {
              console.log(res.data)
            })
            .catch((error) => {
              console.log(error);
            })
        }
        // post new category
        axios({
          url: '/restaurant/category',
          method: 'post',
          data: {
            "category": restaCate,
            "restaurant_id": res.data[0].id
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
        used_id,
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

    let id = e.target.attr('id').split('-').splice(-1)[0]
    let title = $(`#existTitle-${id}`).val()
    let body = $(`#existBody-${id}`).val()
    let image = $(`#existImg-${id}`).next().attr('src')
    let rating

    if ($(`#existRating-1-${id}`).prop('checked')) rating = 1
    if ($(`#existRating-2-${id}`).prop('checked')) rating = 2
    if ($(`#existRating-3-${id}`).prop('checked')) rating = 3
    if ($(`#existRating-4-${id}`).prop('checked')) rating = 3
    if ($(`#existRating-5-${id}`).prop('checked')) rating = 5

    let restaurant_id = window.location.href.split('/').splice(-1)[0]

    console.log(id)

    axios({
      url: '/review',
      method: 'put',
      data: {
        id,
        title,
        body,
        rating,
        user_id,
        restaurant_id
      }
    })
      .then((res) => {
        console.log(res.data)

        // Get review picture
        axios({
          url: '/review/picture/list/' + id,
          method: 'get'
        })
          .then((res) => {
            console.log(res.data)
          })
          .catch((error) => {
            console.log(error);
          })

        // Add new review picture
        if (image) {
          let picture_id
          axios({
            url: '/review/picture',
            method: 'put',
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
    let resta_id = parseInt($(this).closest('form').next().find('.restaLink').attr('href').match(/\d+/))
    console.log(resta_id)
    axios({
      url: '/restaurant/individual/' + resta_id,
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
