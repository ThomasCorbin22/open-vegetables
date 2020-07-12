$(document).ready(function () {

  //user update comment (edit button available)
  if ($('#blog-link').text()) {
    axios({
      url: '/auth/login',
      method: 'get'
    })
      .then((res) => {
        if (res.data !== 'Not Logged In') user_id = res.data.id

        return axios({
          url: '/comment/list/' + parseInt($('#blog-link').attr('href').match(/\d+/)),
          method: 'get'
        })
      })
      .then((res) => {
        if (user_id) {
          $('#create-new-btn').show()
          for (let comment of res.data) {
            if (comment.user_id == user_id) {
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


  // Add new comment
  $('#new-comment-submit-btn').click(function (e) {
    e.preventDefault()
    let title = $('#new-title').val()
    let body = $('#new-body').val()

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
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      })
  })

  // Update existing comment
  $('.exist-comment-submit').click(function (e) {
    e.preventDefault()

    let id = $(e.target).attr('id').split('-').splice(-1)[0]
    let title = $(`#exist-title-${id}`).val()
    let body = $(`#exist-body-${id}`).val()

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
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      })
  })

  // Delete existing comment
  $('.exist-comment-delete').click(function (e) {
    e.preventDefault()

    let id = $(e.target).attr('id').split('-').splice(-1)[0]

    axios({
      url: '/comment/' + id,
      method: 'delete',
    })
      .then((res) => {
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      })
  })

  // Check for existing like
  if ($('title').text().match('blog-details')) {
    // Ensure that you have the user_id if the main axios request has not yet completed
    axios({
      url: '/auth/login',
      method: 'get'
    })
      .then((res) => {
        if (res.data.id) {
          user_id = res.data.id
          let url = window.location.href
          let blog_id = url.split('/').splice(-1)[0]

          // Get list of comments for blog
          return axios({
            url: '/comment/list/' + blog_id,
            method: 'get',
          })
        }
      })
      .then((res) => {
        // Check the likes for every comment, if the user has liked something than change the color of the like
        for (let comment of res.data) {
          axios({
            url: '/comment/like/user/' + user_id + '/' + comment.id,
            method: 'get',
          })
            .then((res) => {
              // Update the color of the like buttons depending on if the user has liked them
              if (res.data[0]) {
                if (res.data[0].like === true) {
                  $(`#like-${res.data[0].comment_id}`).attr('fill', 'blue')
                  $(`#dislike-${res.data[0].comment_id}`).attr('fill', 'currentColor')
                }
                else if (res.data[0].like === false) {
                  $(`#dislike-${res.data[0].comment_id}`).attr('fill', 'red')
                  $(`#dlike-${res.data[0].comment_id}`).attr('fill', 'currentColor')
                }
              }
            })
            .catch((error) => {
              console.log(error);
            })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // Alter whether or not a comment has been liked by a user
  $('.like').click((e) => {
    e.preventDefault()

    if (user_id) {
      let liked
      let disliked

      let comment_id = $(e.target).attr('id').split('-').splice(-1)[0]

      if ($(e.target).attr('fill') === 'currentColor') liked = false
      else liked = true
      if ($(`#dislike-${comment_id}`).attr('fill') === 'currentColor') disliked = false
      else disliked = true

      // If the comment is not liked or disliked we post a new like to the likes-dislikes table
      if (liked === false && disliked === false) {
        axios({
          url: '/comment/like/',
          method: 'post',
          data: {
            like: true,
            user_id,
            comment_id,
          }
        })
          .then((res) => {
            $(e.target).attr('fill', 'blue')

            let number = Number($(`#number-likes-${comment_id}`).html()) + 1
            $(`#number-likes-${comment_id}`).html(number)
          })
          .catch((error) => {
            console.log(error);
          })
      }
      // If the comment is disliked then we update it to be liked
      if (liked === false && disliked === true) {
        axios({
          url: '/comment/like/user/' + user_id + '/' + comment_id,
          method: 'get',
        })
          .then((res) => {
            return axios({
              url: '/comment/like/' + res.data[0].id,
              method: 'put',
              data: {
                like: true,
                user_id,
                comment_id,
              }
            })
          })
          .then((res) => {
            $(e.target).attr('fill', 'blue')
            $(`#dislike-${comment_id}`).attr('fill', 'currentColor')

            let number_likes = Number($(`#number-likes-${comment_id}`).html()) + 1
            $(`#number-likes-${comment_id}`).html(number_likes)
            let number_dislikes = Number($(`#number-dislikes-${comment_id}`).html()) - 1
            $(`#number-dislikes-${comment_id}`).html(number_dislikes)
          })
          .catch((error) => {
            console.log(error);
          })
      }
      // If the comment is already liked then we unlike it
      else if (liked === true) {
        axios({
          url: '/comment/like/user/' + user_id + '/' + comment_id,
          method: 'get',
        })
          .then((res) => {
            return axios({
              url: '/comment/like/' + res.data[0].id,
              method: 'delete',
            })
          })
          .then((res) => {
            $(e.target).attr('fill', 'currentColor')

            let number = Number($(`#number-likes-${comment_id}`).html()) - 1
            $(`#number-likes-${comment_id}`).html(number)
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  })

  // Alter whether or not a comment has been disliked by a user
  $('.dislike').click((e) => {
    e.preventDefault()

    if (user_id) {
      let liked
      let disliked

      let comment_id = $(e.target).attr('id').split('-').splice(-1)[0]

      if ($(e.target).attr('fill') === 'currentColor') disliked = false
      else disliked = true
      if ($(`#like-${comment_id}`).attr('fill') === 'currentColor') liked = false
      else liked = true

      // If the comment is not liked or disliked we post a new dislike to the likes-dislikes table
      if (liked === false && disliked === false) {
        axios({
          url: '/comment/like/',
          method: 'post',
          data: {
            like: false,
            user_id,
            comment_id,
          }
        })
          .then((res) => {
            $(e.target).attr('fill', 'red')
            let number = Number($(`#number-dislikes-${comment_id}`).html()) + 1
            $(`#number-dislikes-${comment_id}`).html(number)
          })
          .catch((error) => {
            console.log(error);
          })
      }
      // If the comment is liked then we update it to be disliked
      if (liked === true && disliked === false) {
        axios({
          url: '/comment/like/user/' + user_id + '/' + comment_id,
          method: 'get',
        })
          .then((res) => {
            return axios({
              url: '/comment/like/' + res.data[0].id,
              method: 'put',
              data: {
                like: false,
                user_id,
                comment_id,
              }
            })
          })
          .then((res) => {
            $(e.target).attr('fill', 'red')
            $(`#like-${comment_id}`).attr('fill', 'currentColor')
            $(`#dislike-${comment_id}`).attr('fill', 'red')

            let number_likes = Number($(`#number-likes-${comment_id}`).html()) - 1
            $(`#number-likes-${comment_id}`).html(number_likes)
            let number_dislikes = Number($(`#number-dislikes-${comment_id}`).html()) + 1
            $(`#number-dislikes-${comment_id}`).html(number_dislikes)
          })
          .catch((error) => {
            console.log(error);
          })
      }
      // If the comment is already disliked then we unlike it
      else if (disliked === true) {
        axios({
          url: '/comment/like/user/' + user_id + '/' + comment_id,
          method: 'get',
        })
          .then((res) => {
            return axios({
              url: '/comment/like/' + res.data[0].id,
              method: 'delete',
            })
          })
          .then((res) => {
            $(e.target).attr('fill', 'currentColor')
            let number = Number($(`#number-dislikes-${comment_id}`).html()) - 1
            $(`#number-dislikes-${comment_id}`).html(number)
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  })
})