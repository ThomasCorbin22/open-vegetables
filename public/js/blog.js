
$(document).ready(function () {
    if ($('title').text().match(/^Blogs/)) {
        $('.navbar-nav > li:eq(2)').addClass('active')
    }


    //delete exist blog
    $('.btnBlogGroup button:last-child').click(function (e) {
        e.preventDefault()
        let blogId = $(this).closest('form').next().find('.blogLink').attr('href').match(/\d+/)
        console.log(blogId)
        axios({
            url: '/blog/' + parseInt(blogId),
            method: 'delete'
        })
            .then((res) => {
                console.log(res.data)
                location.reload();

            })
            .catch((error) => {
                console.log(error);
            })
    })

    //update exist blog + categories + images
    $('.btnBlogGroup button:first-child').click(function (e) {
        e.preventDefault()
        let title = $(this).closest('form').find('.blogTitle').val()
        let body = $(this).closest('form').find(".blogBody").val()
        let image_url = $(this).closest('form').find('.blogPic').attr('src')
        let blog_ID = parseInt($(this).closest('form').next().find('.blogLink').attr('href').match(/\d+/))
        console.log(title, body, image_url, blog_ID)

        axios({
            url: '/blog/category/list/' + blog_ID,
            method: 'get'
        })
            .then((res) => {
                console.log(res.data)
                if ($('input[name="category"]:checked').val()) {
                    for (let blogCate of res.data)
                        axios({
                            url: '/blog/category/' + blogCate.id,
                            method: 'delete'
                        })
                            .then((res) => {
                                console.log(res.data)
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                }
            })
            .catch((error) => {
                console.log(error);
            })

        $.each($('input[name="category"]:checked'), function (e) {
            axios({
                url: '/blog/category',
                method: 'post',
                data: {
                    "category": $(this).val(),
                    "blog_id": blog_ID
                }
            })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        })
        axios({
            url: '/blog/' + blog_ID,
            method: 'put',
            data: {
                "title": title,
                "body": body,
                "user_id": user_id
            }
        })
            .then((res) => {
                axios({
                    url: '/blog/picture/' + blog_ID,
                    method: 'put',
                    data: {
                        "picture_URL": image_url,
                        "blog_id": blog_ID
                    }
                })
                    .then((res) => {
                        console.log(res.data)
                        location.reload()
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })
    })


    //add new blog + categories + images
    $('#newBlogSubmitBtn').click(function (e) {
        e.preventDefault()
        let title = $('#newBlogTitle').val()
        let body = $('#newBlogBody').val()
        let image_url = $('#newImg').next().attr('src')
        axios({
            url: '/blog',
            method: 'post',
            data: {
                "title": title,
                "body": body,
                "user_id": user_id
            }
        })
            .then((res) => {
                console.log(res.data)
                $.each($("input[name='category']:checked"), function () {
                    axios({
                        url: '/blog/category',
                        method: 'post',
                        data: {
                            "category": $(this).val(),
                            "blog_id": res.data[0].id
                        }
                    })
                        .then((res) => {
                            console.log(res.data)

                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
                axios({
                    url: '/blog/picture',
                    method: 'post',
                    data: {
                        "picture_URL": image_url,
                        "blog_id": res.data[0].id
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
            .catch((error) => {
                console.log(error);
            })
    })


    $('#existBlogDeleteBtn').click(function (e) {
        e.preventDefault()
    })
})