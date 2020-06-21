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

  // Check for existing like
  axios({
    url: '/auth/login',
    method: 'get'
  })
    .then((res) => {
      if ($('title').text().match('blog-details') && user_id) {
        let url = window.location.href
        let blog_id = url.split('/').splice(-1)[0]
        
        // Get list of comments for blog
        axios({
          url: '/comment/list/' + blog_id,
          method: 'get',
        })
          .then((res) => {
            console.log(res.data)
            // Check the likes for every comment, if the user has liked something than change the color of the like
            for (let comment of res.data){
              axios({
                url: '/comment/like/user/' + user_id + '/' + comment.id,
                method: 'get',
              })
                .then((res) => {
                  console.log(res.data)
                  // Update the color of the like buttons depending on if the user has liked them
                  if (res.data[0]){
                    if (res.data[0].like === true){
                      $(`#like-${res.data[0].comment_id}`).attr('fill', 'blue')
                      $(`#dislike-${res.data[0].comment_id}`).attr('fill', 'currentColor')
                    }
                    else if (res.data[0].like === false){
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
    })

  // Alter whether or not a comment has been liked by a user
  $('.like').click((e) =>{
    e.preventDefault()

    if (user_id){
      let liked
      let disliked
  
      let comment_id = $(e.target).attr('id').split('-').splice(-1)[0]
  
      if ($(e.target).attr('fill') === 'currentColor') liked = false
      else liked = true
      if ($(`#dislike-${comment_id}`).attr('fill') === 'currentColor') disliked = false
      else disliked = true
  
      console.log(comment_id)
      console.log(liked)
      console.log(disliked)
  
      // If the comment is not liked or disliked we post a new like to the likes-dislikes table
      if (liked === false && disliked === false){
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
            console.log(res.data)
            $(e.target).attr('fill', 'blue')

            let number = Number($(`#number-likes-${comment_id}`).html()) + 1
            $(`#number-likes-${comment_id}`).html(number)
          })
          .catch((error) => {
            console.log(error);
          })
      }
      // If the comment is disliked then we update it to be liked
      if (liked === false && disliked === true){
        axios({
          url: '/comment/user/' + user_id + '/' + comment_id,
          method: 'get',
        })
          .then((res) => {
            console.log(res.data)
            axios({
              url: '/comment/like/' + res.data[0].id,
              method: 'put',
              data: {
                like: true,
                user_id,
                comment_id,
              }
            })
              .then((res) => {
                console.log(res.data)
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
          })
          .catch((error) => {
            console.log(error);
          })
      }
      // If the comment is already liked then we unlike it
      else if (liked === true){
        axios({
          url: '/comment/like/user/' + user_id + '/' + comment_id,
          method: 'get',
        })
          .then((res) => {
            console.log(res.data)
            axios({
              url: '/comment/like/' + res.data[0].id,
              method: 'delete',
            })
              .then((res) => {
                console.log(res.data)
                $(e.target).attr('fill', 'currentColor')

                let number = Number($(`#number-likes-${comment_id}`).html()) - 1
                $(`#number-likes-${comment_id}`).html(number)
              })
              .catch((error) => {
                console.log(error);
              })
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  })

  // Alter whether or not a comment has been disliked by a user
  $('.dislike').click((e) =>{
    e.preventDefault()

    if (user_id){
      let liked
      let disliked
  
      let comment_id = $(e.target).attr('id').split('-').splice(-1)[0]
  
      if ($(e.target).attr('fill') === 'currentColor') disliked = false
      else disliked = true
      if ($(`#like-${comment_id}`).attr('fill') === 'currentColor') liked = false
      else liked = true
  
      console.log(comment_id)
      console.log(liked)
      console.log(disliked)
  
      // If the comment is not liked or disliked we post a new dislike to the likes-dislikes table
      if (liked === false && disliked === false){
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
            console.log(res.data)
            $(e.target).attr('fill', 'red')
            let number = Number($(`#number-dislikes-${comment_id}`).html()) + 1
            $(`#number-dislikes-${comment_id}`).html(number)
          })
          .catch((error) => {
            console.log(error);
          })
      }
      // If the comment is liked then we update it to be disliked
      if (liked === true && disliked === false){
        axios({
          url: '/comment/user/' + user_id + '/' + comment_id,
          method: 'get',
        })
          .then((res) => {
            console.log(res.data)
            axios({
              url: '/comment/like/' + res.data[0].id,
              method: 'put',
              data: {
                like: false,
                user_id,
                comment_id,
              }
            })
              .then((res) => {
                console.log(res.data)
                $(e.target).attr('fill', 'red')
                $(`#like-${comment_id}`).attr('fill', 'currentColor')
                $(`#dislike-${comment_id}`).attr('fill', 'currentColor')

                let number_likes = Number($(`#number-likes-${comment_id}`).html()) - 1
                $(`#number-likes-${comment_id}`).html(number_likes)
                let number_dislikes = Number($(`#number-dislikes-${comment_id}`).html()) + 1
                $(`#number-dislikes-${comment_id}`).html(number_dislikes)
              })
              .catch((error) => {
                console.log(error);
              })
          })
          .catch((error) => {
            console.log(error);
          })
      }
      // If the comment is already disliked then we unlike it
      else if (liked === true){
        axios({
          url: '/comment/user/' + user_id + '/' + comment_id,
          method: 'get',
        })
          .then((res) => {
            console.log(res.data)
            axios({
              url: '/comment/like/' + res.data[0].id,
              method: 'delete',
            })
              .then((res) => {
                console.log(res.data)
                $(e.target).attr('fill', 'currentColor')
                let number = Number($(`#number-dislikes-${comment_id}`).html()) - 1
                $(`#number-dislikes-${comment_id}`).html(number)
              })
              .catch((error) => {
                console.log(error);
              })
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  })
})