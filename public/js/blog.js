$(() => {
    // List all blogs
    axios({
        url: '/blog',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Get first blog
    axios({
        url: '/blog/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Add new blog
    axios({
        url: '/blog',
        method: 'post',
        data: {
            "title": 'Time to shine',
            "body": 'These are some low effort examples right here',
            "user_id": 2
          }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Update blog
    axios({
        url: '/blog/2',
        method: 'put',
        data: {
            "title": 'The world is stuffed',
            "body": 'We should be okay through',
            "user_id": 1
          }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Delete blog
    axios({
        url: '/blog/1',
        method: 'delete'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Restaurant pictures

    // Get first blog pictures
    axios({
        url: '/blog/picture/list/1',
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
        url: '/blog/picture/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Add new blog picture
    axios({
        url: '/blog/picture',
        method: 'post',
        data: {
            "picture_URL": 'https://images.pexels.com/photos/3886285/pexels-photo-3886285.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            "blog_id": 2
        }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Update blog picture
    axios({
        url: '/blog/picture/2',
        method: 'put',
        data: {
            "picture_URL": 'https://images.pexels.com/photos/4115131/pexels-photo-4115131.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            "blog_id": 3
        }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Delete blog picture
    axios({
        url: '/blog/picture/3',
        method: 'delete'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Restaurant categories

    // Get first blog categories
    axios({
        url: '/blog/category/list/1',
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
        url: '/blog/category/1',
        method: 'get'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Add new blog category
    axios({
        url: '/blog/category',
        method: 'post',
        data: {
            "category": 'Speculation',
            "blog_id": 2
          }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Update blog category
    axios({
        url: '/blog/category/2',
        method: 'put',
        data: {
            "category": 'News',
            "blog_id": 2
          }
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })

    // Delete blog category
    axios({
        url: '/blog/category/3',
        method: 'delete'
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((error) => {
        console.log(error);
    })
})