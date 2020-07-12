
$(document).ready(function () {
    if ($('title').text().match(/^Blogs/)) {
        $('.navbar-nav > li:eq(2)').addClass('active')
    }

    //delete exist blog
    $('.btn-blog-group button:last-child').click(function (e) {
        e.preventDefault()
        let blog_id = $(this).closest('form').next().find('.blog-link').attr('href').match(/\d+/)
        axios({
            url: '/blog/individual/' + parseInt(blog_id),
            method: 'delete'
        })
            .then((res) => {
                location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    })

    //update exist blog + categories + images
    $('.btn-blog-group button:first-child').click(function (e) {
        e.preventDefault()
        let title = $(this).closest('form').find('.blog-title').val()
        let body = $(this).closest('form').find(".blog-body").val()
        let main_picture_URL = $(this).closest('form').find('.blog-main-pic').attr('src')
        let blog_id = parseInt($(this).closest('form').next().find('.blog-link').attr('href').match(/\d+/))

        //list all cate belong to that blog
        axios({
            url: '/blog/category/list/' + blog_id,
            method: 'get'
        })
            .then((res) => {
                //if checkbox is modified, delete the original cate in db
                if ($('input[name="category"]:checked').val()) {
                    for (let category of res.data) {
                        axios({
                            url: '/blog/category/' + category.id,
                            method: 'delete'
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    }
                }
            })
            .then(() => {
                // for each checked category item append them to db
                $.each($('input[name="category"]:checked'), function (e) {
                    axios({
                        url: '/blog/category',
                        method: 'post',
                        data: {
                            category: $(this).val(),
                            blog_id
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                })
            })
            .then(() => {
                //update blog details
                return axios({
                    url: '/blog/individual/' + blog_id,
                    method: 'put',
                    data: {
                        title,
                        body,
                        user_id,
                        main_picture_URL
                    }
                })
            })
            .then((res) => {
                //for each pictures update their url
                $.each($('.blog-imgs'), function (e) {
                    let picture_id = parseInt($(this).find('.blog-picture').attr('alt').match(/\d+/))
                    $(this).find('.blog-picture').prev().change(function (e) {

                        axios({
                            url: '/blog/picture/' + picture_id,
                            method: 'put',
                            data: {
                                picture_URL: $(this).attr('src'),
                                blog_id
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    })
                })
            })
            .then(() => {
                location.reload()
            })
            .catch((error) => {
                console.log(error);
            })
    })


    //add new blog + categories + images
    $('#new-blog-submit-btn').click(function (e) {
        e.preventDefault()
        let blog_id
        let title = $('#new-blog-title').val()
        let body = $('#new-blog-body').val()
        let main_picture_URL = $('#new-main-img').next().attr('src')
        let new_pictures = []
        $('#new-picture').children('img').each(function () {
            new_pictures.push(this.src)
        })
        axios({
            url: '/blog/individual',
            method: 'post',
            data: {
                title,
                body,
                user_id,
                main_picture_URL
            }
        })
            .then((res) => {
                blog_id = res.data[0].id
                // post new category
                $.each($("input[name='category']:checked"), function () {
                    axios({
                        url: '/blog/category',
                        method: 'post',
                        data: {
                            category: $(this).val(),
                            blog_id
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                })
            })
            .then(() => {
                //post every new pictures
                for (let picture_URL of new_pictures) {
                    axios({
                        url: '/blog/picture',
                        method: 'post',
                        data: {
                            picture_URL,
                            blog_id
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
            })
            .then(() => {
                location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    })

    //control add blog favourite button
    $('.add-favourite-blog').on('click', function (e) {
        let blog_id = window.location.href.split('/').splice(-1)[0]

        if (e.currentTarget.innerHTML.match('☆')) {
            axios({
                url: '/user/favourite/blog',
                method: 'post',
                data: {
                    user_id,
                    blog_id
                }
            })
                .then((res) => {
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
                    e.currentTarget.innerHTML = '☆ Add to favourite'
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    })
})