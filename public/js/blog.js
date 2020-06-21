
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
            url: '/blog/individual/' + parseInt(blogId),
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
        let mainPic = $(this).closest('form').find('.blogMainPic').attr('src')
        let pic = $(this).closest('form').find('.blogPic').attr('src')
        let blog_ID = parseInt($(this).closest('form').next().find('.blogLink').attr('href').match(/\d+/))
        console.log(title, body, pic, blog_ID)

        //list all cate belong to that blog
        axios({
            url: '/blog/category/list/' + blog_ID,
            method: 'get'
        })
            .then((res) => {
                console.log(res.data)

                //if checkbox is modified, delete the original cate in db
                if ($('input[name="category"]:checked').val()) {
                    for (let blogCate of res.data) {
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
                }
            })
            .catch((error) => {
                console.log(error);
            })

        // for each checked category item append them to db
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
        //update blog details
        axios({
            url: '/blog/individual/' + blog_ID,
            method: 'put',
            data: {
                "title": title,
                "body": body,
                "user_id": user_id,
                "main_picture_URL": mainPic
            }
        })
            .then((res) => {
                //for each pictures update their url
                location.reload()

                $.each($('.blogImgs'), function (e) {
                    let picID = parseInt($(this).find('.blogPic').attr('alt').match(/\d+/))
                    $(this).find('.blogPic').prev().change(function (e) {

                        axios({
                            url: '/blog/picture/' + picID,
                            method: 'put',
                            data: {
                                "picture_URL": $(this).attr('src'),
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
        let mainPic = $('#newMainImg').next().attr('src')
        let newPic = []
        $('#newPic').children('img').each(function () {
            newPic.push(this.src)
        })
        axios({
            url: '/blog/individual',
            method: 'post',
            data: {
                title,
                body,
                user_id,
                "main_picture_URL": mainPic
            }
        })
            .then((res) => {
                console.log(res.data)
                // post new category
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
                //post every new pictures
                for (let pic of newPic) {
                    axios({
                        url: '/blog/picture',
                        method: 'post',
                        data: {
                            "picture_URL": pic,
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
                }


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