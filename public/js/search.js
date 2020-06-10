$(() => {
    // List all blogs
    axios({
        url: '/blog/search?title=Some cool post',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // List all restaurants
    axios({
        url: '/restaurant/search?name=Our awesome restaurant',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Search all users
    axios({
        url: '/user/search?first_name=Thomas&last_name=Corbin',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })
})