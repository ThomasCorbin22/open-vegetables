$(document).ready(function () {

  // show edit button to update comment
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

  
  // Add new comment
  $('#newCommentSubmitBtn').click(function (e) {
    e.preventDefault()
    let title = $('#newTitle').val()
    let body = $('#newBody').val()

    let blog_id = window.location.href.split('/').splice(-1)[0]

    axios({
      url: '/comment',
      method: 'post',
      data: {
        title,
        body,
        user_id,
        blog_id
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

  // Update existing comment
  $('.existCommentSubmit').click(function (e) {
    e.preventDefault()

    let id = $(e.target).attr('id').split('-').splice(-1)[0]
    let title = $(`#existTitle-${id}`).val()
    let body = $(`#existBody-${id}`).val()

    let blog_id = window.location.href.split('/').splice(-1)[0].split('?')[0]

    axios({
      url: '/comment/' + id,
      method: 'put',
      data: {
        title,
        body,
        modified: true,
        user_id,
        blog_id
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

  // Delete existing comment
  $('.existCommentDelete').click(function (e) {
    e.preventDefault()

    let id = $(e.target).attr('id').split('-').splice(-1)[0]

    axios({
      url: '/comment/' + id,
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