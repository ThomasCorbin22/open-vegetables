$(() => {
    // List all restaurants
    axios({
        url: '/restaurant',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Get first restaurant
    axios({
        url: '/restaurant/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Add new restaurant
    axios({
        url: '/restaurant',
        method: 'post',
        data: {
            "name": 'Restaurant 101',
            "street_address": 'My place',
            "district_id": 5,
            "description": 'Home cooked food',
            "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.bYCGq485SZLPBgm-0oj_qAAAAA%26pid%3DApi&f=1',
            "price": 3,
            "telephone_number": '444',
            "social_media_URL": 'www.terrarie.com',
            "main_picture_URL": 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            "website_URL": 'www.place.com',
            "latitude": 19.3,
            "longitude": 105.2,
            "opening_time": '09:30',
            "closing_time": '22:00'
        }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Update restaurant
    axios({
        url: '/restaurant/2',
        method: 'put',
        data: {
            "name": 'Our cool restaurant: V2',
            "street_address": 'GreenLand',
            "district_id": 4,
            "description": 'Nicer food',
            "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.6iu2HE0CMnwIpGvu66bMaAHaFj%26pid%3DApi&f=1',
            "price": 2,
            "telephone_number": '999',
            "social_media_URL": 'www.google.com',
            "main_picture_URL": 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            "website_URL": 'www.cool.com',
            "latitude": 23.0,
            "longitude": 113.6,
            "opening_time": '09:30',
            "closing_time": '21:50'
        }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Delete restaurant
    axios({
        url: '/restaurant/4',
        method: 'delete'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Restaurant pictures

    // Get first restaurant pictures
    axios({
        url: '/restaurant/picture/list/1',
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
        url: '/restaurant/picture/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Add new restaurant picture
    axios({
        url: '/restaurant/picture',
        method: 'post',
        data: {
            "picture_URL": 'https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            "restaurant_id": 4
        }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Update restaurant picture
    axios({
        url: '/restaurant/picture/2',
        method: 'put',
        data: {
            "picture_URL": 'https://images.pexels.com/photos/34650/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            "restaurant_id": 2
        }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Delete restaurant picture
    axios({
        url: '/restaurant/picture/3',
        method: 'delete'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Restaurant categories

    // Get first restaurant categories
    axios({
        url: '/restaurant/category/list/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Get first category
    axios({
        url: '/restaurant/category/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Add new restaurant category
    axios({
        url: '/restaurant/category',
        method: 'post',
        data: {
            "category": 'Spicy',
            "restaurant_id": 1
          }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Update restaurant category
    axios({
        url: '/restaurant/category/2',
        method: 'put',
        data: {
            "category": 'Sushi',
            "restaurant_id": 2
          }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Delete restaurant category
    axios({
        url: '/restaurant/category/3',
        method: 'delete'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })
})