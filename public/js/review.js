$(document).ready(function () {


  //user update reviews (edit button available)
  if ($('#restaLink').text()) {
    axios({
      url: '/auth/login',
      method: 'get'
    })
      .then((res) => {
        if (res.data !== 'Not Logged In') user_id = res.data.id

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
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // Add new review
  $('#newReviewSubmitBtn').click(function (e) {
    e.preventDefault()
    let title = $('#newTitle').val()
    let body = $('#newBody').val()

    // Check that there is an image
    let image = $(`#newImg`).next().attr('src')
    if (image == '/pictures/image.png') image = null

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
        else location.reload();
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

    // Check that there is an image
    let image = $(`#existImg-${id}`).next().attr('src')
    if (image == '/pictures/image.png') image = null

    let rating

    if ($(`#existRating-1-${id}`).prop('checked')) rating = 1
    if ($(`#existRating-2-${id}`).prop('checked')) rating = 2
    if ($(`#existRating-3-${id}`).prop('checked')) rating = 3
    if ($(`#existRating-4-${id}`).prop('checked')) rating = 4
    if ($(`#existRating-5-${id}`).prop('checked')) rating = 5

    let restaurant_id = window.location.href.split('/').splice(-1)[0].split('?')[0]

    axios({
      url: '/review/' + id,
      method: 'put',
      data: {
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
                url: '/review/picture/' + picture_id,
                method: 'put',
                data: {
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

  // Delete existing review
  $('.existReviewDelete').click(function (e) {
    e.preventDefault()

    let id = $(e.target).attr('id').split('-').splice(-1)[0]

    axios({
      url: '/review/' + id,
      method: 'delete',
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