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


  $('.add-favourite').on('click', (e) => {
    let resta_id = e.currentTarget.parentNode.previousElementSibling.firstChild.getAttribute("href").slice(-1)
    if(e.currentTarget.innerHTML.match('☆')){
      e.currentTarget.innerHTML='★ Favourite Restaurant'
    } else if (e.currentTarget.innerHTML.match('★')){
      e.currentTarget.innerHTML='☆ Add to favourite'
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


  })
});
