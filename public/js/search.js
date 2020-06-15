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
        url: '/restaurant/search?longitude=118.3&latitude=20.2&range=1',
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