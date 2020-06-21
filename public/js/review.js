$(document).ready(function () {

  // shows edit button for user to update reviews (edit button available)
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