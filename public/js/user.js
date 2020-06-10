$(() => {
    // List all users
    axios({
        url: '/user',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Get first user
    axios({
        url: '/user/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Add new review
    axios({
        url: '/user',
        method: 'post',
        data: {
            "first_name": 'Hollie',
            "last_name": 'Collins',
            "email": 'hollie@hollie.com',
            "password": 'password',
            "description": 'It’s not the mountain we conquer, but ourselves',
            'profile_picture_URL': 'https://scontent-hkg4-1.xx.fbcdn.net/v/t1.0-9/95344172_10156915557110064_2596378485723234304_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_ohc=zHORTMnUlQoAX87U_z5&_nc_ht=scontent-hkg4-1.xx&oh=61a760d68323bb7eeb87778b8eef8b11&oe=5F05DF32'
        }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Update review
    axios({
        url: '/user/2',
        method: 'put',
        data: {
            "first_name": 'Alex',
            "last_name": 'Wong',
            "email": 'alex@alex.com',
            "password": 'password',
            "description": 'Something has changed about Alex',
            'profile_picture_URL': 'https://avatars0.githubusercontent.com/u/40209618?s=460&u=2a86e8fa0d42014551e1f81ff24a1720185d66da&v=4'
        }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Delete review
    axios({
        url: '/user/4',
        method: 'delete'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // User Access

    // List first users access
    axios({
        url: '/user/access/list/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Get first access
    axios({
        url: '/user/access/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Add new user access
    axios({
        url: '/user/access',
        method: 'post',
        data: {
            "user_id": 1,
            "restaurant_id": 2
          }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Update user access
    axios({
        url: '/user/access/2',
        method: 'put',
        data: {
            "user_id": 2,
            "restaurant_id": 1
        }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Delete review picture
    axios({
        url: '/user/access/3',
        method: 'delete'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // User Favourite Restaurant

    // List first users favourite restaurants
    axios({
        url: '/user/restaurant/list/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Get first favourite restaurant
    axios({
        url: '/user/restaurant/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Add new favourite restaurant
    axios({
        url: '/user/restaurant',
        method: 'post',
        data: {
            "user_id": 1,
            "restaurant_id": 2
          }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Update favourite restaurant
    axios({
        url: '/user/restaurant/2',
        method: 'put',
        data: {
            "user_id": 3,
            "restaurant_id": 2
          }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Delete favourite restaurant
    axios({
        url: '/user/restaurant/3',
        method: 'delete'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // User Favourite Blog

    // List first users favourite blogs
    axios({
        url: '/user/blog/list/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Get first favourite blog
    axios({
        url: '/user/blog/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Add new favourite blog
    axios({
        url: '/user/blog',
        method: 'post',
        data: {
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

    // Update favourite blog
    axios({
        url: '/user/blog/2',
        method: 'put',
        data: {
            "user_id": 3,
            "blog_id": 2
          }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Delete favourite blog
    axios({
        url: '/user/blog/3',
        method: 'delete'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })
})