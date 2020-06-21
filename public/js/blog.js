
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
        let picture_URL = $(this).closest('form').find('.blogPic').attr('src')
        let blog_ID = parseInt($(this).closest('form').next().find('.blogLink').attr('href').match(/\d+/))
        console.log(title, body, picture_URL, blog_ID)

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
                    blog_ID
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
                title,
                body,
                user_id
            }
        })
        .then((res) => {
            axios({
                url: '/blog/picture/' + blog_ID,
                method: 'put',
                data: {
                    picture_URL,
                    blog_ID
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
        let picture_URL = $('#newImg').next().attr('src')
        axios({
            url: '/blog',
            method: 'post',
            data: {
                title,
                body,
                user_id
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
                        picture_URL,
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

    //control add blog favourite button
    $('.add-favourite-blog').on('click', function (e) {
        let blog_id = window.location.href.split('/').splice(-1)[0]

        if (e.currentTarget.innerHTML.match('☆')) {
            console.log(user_id)
            console.log(blog_id)
            axios({
                url: '/user/favourite/blog',
                method: 'post',
                data: {
                    user_id,
                    blog_id
                }
            })
            .then((res) => {
                console.log(res)
                e.currentTarget.innerHTML = '★ Favourite Blog'
                $(e.currentTarget).attr('id', 'favourite-' + res.data[0].id)
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else if (e.currentTarget.innerHTML.match('★')) {
            let blog_favourite = e.currentTarget.getAttribute("id").split('-').splice(-1)[0]
            axios({
                url: `/user/favourite/blog/${blog_favourite}`,
                method: 'delete',
            })
            .then((res) => {
                console.log(res)
                e.currentTarget.innerHTML = '☆ Add to favourite'
            })
            .catch((error) => {
                console.log(error);
            })
        }
    })
})