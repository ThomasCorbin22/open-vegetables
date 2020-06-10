$(() => {
    // List specific blog comments
    axios({
        url: '/comment/list/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Get first comment
    axios({
        url: '/comment/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Add new comment
    axios({
        url: '/comment',
        method: 'post',
        data: {
            "title": 'Time for a great comment',
            "body": 'We should support this post more',
            "user_id": 3,
            "blog_id": 1
          }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Update comment
    axios({
        url: '/comment/2',
        method: 'put',
        data: {
            "title": 'And great times were had by all',
            "body": '^ Such inspirational titles',
            "user_id": 1,
            "blog_id": 2
          }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Delete comment
    axios({
        url: '/comment/4',
        method: 'delete'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })
})