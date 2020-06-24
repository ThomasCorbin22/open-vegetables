$(document).ready(function () {


  //user update reviews (edit button available)
  if ($('#restaurant-link').text()) {
    axios({
      url: '/auth/login',
      method: 'get'
    })
      .then((res) => {
        if (res.data !== 'Not Logged In') user_id = res.data.id

        return axios({
          url: '/review/list/' + parseInt($('#restaurant-link').attr('href').match(/\d+/)),
          method: 'get'
        })
      })
      .then((res) => {
        if (user_id) {
          console.log(res.data)
          console.log(user_id)
          $('#create-new-btn').show()
          for (let review of res.data) {
            if (review.user_id == user_id) {
              $(`.user-id-${user_id}-edit`).show()
              $(`.user-id-${user_id}-edit`).next().addClass('col-sm-10').removeClass('col-sm-12')
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // Add new review
  $('#new-review-submit-btn').click(function (e) {
    e.preventDefault()
    let title = $('#new-title').val()
    let body = $('#new-body').val()

    // Check that there is an image
    let picture_URL = $(`#new-img`).next().attr('src')
    if (picture_URL == '/pictures/image.png') picture_URL = null

    let rating

    if ($('#new-rating-1').prop('checked')) rating = 1
    if ($('#new-rating-2').prop('checked')) rating = 2
    if ($('#new-rating-3').prop('checked')) rating = 3
    if ($('#new-rating-4').prop('checked')) rating = 3
    if ($('#new-rating-5').prop('checked')) rating = 5

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
        if (picture_URL) {
          axios({
            url: '/review/picture',
            method: 'post',
            data: {
              picture_URL,
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
  $('.exist-review-submit').click(function (e) {
    e.preventDefault()

    let id = $(e.target).attr('id').split('-').splice(-1)[0]
    let title = $(`#exist-title-${id}`).val()
    let body = $(`#exist-body-${id}`).val()

    // Check that there is an image
    let image = $(`#exist-img-${id}`).next().attr('src')
    if (image == '/pictures/image.png') image = null

    let rating

    if ($(`#exist-rating-1-${id}`).prop('checked')) rating = 1
    if ($(`#exist-rating-2-${id}`).prop('checked')) rating = 2
    if ($(`#exist-rating-3-${id}`).prop('checked')) rating = 3
    if ($(`#exist-rating-4-${id}`).prop('checked')) rating = 4
    if ($(`#exist-rating-5-${id}`).prop('checked')) rating = 5

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
              return axios({
                url: '/review/picture/' + picture_id,
                method: 'put',
                data: {
                  "picture_URL": image,
                  review_id
                }
              })
            })
            .then(() => {
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

  // Delete existing review
  $('.exist-review-delete').click(function (e) {
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