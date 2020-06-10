$(() => {
    // List all reviews
    axios({
        url: '/review/list/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Get first review
    axios({
        url: '/review/1',
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
        url: '/review',
        method: 'post',
        data: {
            "title": 'I wouldnt come back here if my life depended on it',
            "body": 'The food looks like what comes out of my backside',
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

    // Update review
    axios({
        url: '/review/2',
        method: 'put',
        data: {
            "title": 'Best food in Hong Kong',
            "body": 'A must visit for anyone coming to HK',
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

    // Delete review
    axios({
        url: '/review/4',
        method: 'delete'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Review pictures

    // Get first review pictures
    axios({
        url: '/review/picture/list/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Get first picture
    axios({
        url: '/review/picture/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Add new review picture
    axios({
        url: '/review/picture',
        method: 'post',
        data: {
            "picture_URL": 'https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            "review_id": 2
        }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Update review picture
    axios({
        url: '/review/picture/2',
        method: 'put',
        data: {
            "picture_URL": 'https://images.pexels.com/photos/1537635/pexels-photo-1537635.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            "review_id": 1
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
        url: '/review/picture/3',
        method: 'delete'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })
})