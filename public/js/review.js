$(document).ready(function () {

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
})