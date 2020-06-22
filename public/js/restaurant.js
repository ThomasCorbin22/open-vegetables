$(document).ready(function () {
    if ($('title').text().match(/^Restaurants/)) {
        $('.navbar-nav > li:eq(1)').addClass('active')
    }

    // Adds districts to dropdown menu
    if ($('#restaurant-district')) {
        axios({
            url: '/location/district/list/all',
            method: 'get'
        })
            .then((res) => {
                let districts = []

                for (let item of res.data) {
                    districts.push(item.district)
                }

                districts = new Set(districts)
                districts.delete('Not available')
                districts = Array.from(districts)

                districts.sort()

                for (let item of districts) {
                    $('#restaurant-district').append(`<option value=${item}>${item}</option>`)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Adds districts to dropdown menu
    if ($('#restaurant-category')) {
        axios({
            url: '/restaurant/category/list/all',
            method: 'get'
        })
            .then((res) => {
                let categories = []

                for (let item of res.data) {
                    categories.push(item.category)
                }

                categories = new Set(categories)
                categories.delete('Not available')
                categories = Array.from(categories)

                categories.sort()

                for (let item of categories) {
                    $('#restaurant-category').append(`<option value=${item}>${item}</option>`)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // On restaurant search submission send get request
    $('#restaurant-search').on('submit', (e) => {
        e.preventDefault();

        let input = $('#restaurant-input').val()
        let categories = $('#restaurant-category').val()
        let price = $('#restaurant-price').val()
        let district = $('#restaurant-district').val()
        let area = $('#restaurant-area').val()

        let url = '/restaurant/' + area + '/alpha/descending?name=' + input + '&categories=' + categories + '&price=' + price + '&district=' + district

        window.location.replace(url);
    })


    //control add restaurant favourite button
    $('.add-favourite-restaurant').on('click', function (e) {
        let restaurant_id = window.location.href.split('/').splice(-1)[0]

        if (e.currentTarget.innerHTML.match('☆')) {
            console.log(user_id)
            console.log(restaurant_id)
            axios({
                url: '/user/favourite/restaurant',
                method: 'post',
                data: {
                    user_id,
                    restaurant_id
                }
            })
                .then((res) => {
                    console.log(res)
                    e.currentTarget.innerHTML = '★ Favourite Restaurant'
                    $(e.currentTarget).attr('id', 'favourite-' + res.data[0].id)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else if (e.currentTarget.innerHTML.match('★')) {
            let resta_favourite = e.currentTarget.getAttribute("id").split('-').splice(-1)[0]
            axios({
                url: `/user/favourite/restaurant/${resta_favourite}`,
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

    // update existing restaurant 
    $('.btnRestaGroup button:first-child').click(function (e) {
        e.preventDefault()
        let restaName = $(this).closest('form').find('.restaName').val()
        let restaAddress = $(this).closest('form').find('.restaAddress').val()
        let restaDistID = $(this).closest('form').find('.restaDist').val()
        let restaDescri = $(this).closest('form').find('.restaDescri').val()
        let restaLogo = $(this).closest('form').find('.restaLogo').attr('src')
        let restaPrice = $(this).closest('form').find('.restaPrice').val()
        let restaPhone = $(this).closest('form').find('.restaTele').val()
        let restaSocial = $(this).closest('form').find('.restaSocial').val()
        let restaURL = $(this).closest('form').find('.restaWeb').val()
        let restaImg = $(this).closest('form').find('.restaPic').attr('src')
        let restaID = parseInt($(this).closest('form').next().find('.restaLink').attr('href').match(/\d+/))
        let restaCate = $(this).closest('form').find('.restaCate').val()
        console.log(restaCate)
        let restaPic = []
        $.each($(this).closest('form').find('.restaPic'), function () {
            restaPic.push({ id: $(this).attr('title'), url: $(this).attr('src') })
        })
        console.log(restaPic)
        let restaNewPic = []
        $.each($(this).closest('form').find('.newPic').children(), function () {
            restaNewPic.push($(this).attr('src'))
        })
        console.log(restaNewPic)
        let restaOp = $(this).closest('form').find('.restaOp').val()
        let restaCl = $(this).closest('form').find('.restaCl').val()
        axios({
            url: '/restaurant/individual/' + restaID,
            method: 'put',
            data: {
                "name": restaName,
                "street_address": restaAddress,
                "district_id": restaDistID,
                "description": restaDescri,
                "logo": restaLogo,
                "price": restaPrice,
                "main_category": restaCate,
                "telephone_number": restaPhone,
                "social_media_URL": restaSocial,
                "main_picture_URL": restaImg,
                "website_URL": restaURL,
                "latitude": 23.0,
                "longitude": 113.6,
                "monday": `${restaOp}-${restaCl}`,
                "tuesday": `${restaOp}-${restaCl}`,
                "wednesday": `${restaOp}-${restaCl}`,
                "thursday": `${restaOp}-${restaCl}`,
                "friday": `${restaOp}-${restaCl}`,
                "saturday": `${restaOp}-${restaCl}`,
                "sunday": `${restaOp}-${restaCl}`,
            }
        })
            .then((res) => {
                console.log(res.data)
                //delete every category when update
                return axios({
                    url: '/restaurant/category/list/' + restaID,
                    method: 'get'
                })
            })
            .then((res) => {
                console.log(res.data)
                for (let cate of res.data) {
                    axios({
                        url: '/restaurant/category/' + cate.id,
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
            .then(() => {
                //update category
                return axios({
                    url: '/restaurant/category',
                    method: 'post',
                    data: {
                        "category": restaCate,
                        "restaurant_id": restaID
                    }
                })
            })
            .then(() => {
                //update old pictures
                return axios({
                    url: '/restaurant/picture/list/' + restaID,
                    method: 'get'
                })
            })
            .then((res) => {
                console.log(res.data)

                for (let pic of res.data) {
                    for (let picURL of restaPic) {
                        if (picURL.id == pic.id) {
                            axios({
                                url: '/restaurant/picture/' + pic.id,
                                method: 'put',
                                data: {
                                    "picture_URL": picURL.url,
                                    "restaurant_id": restaID
                                }
                            })
                                .then((res) => {
                                    console.log(res.data)
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        }
                    }
                }
            })
            .then(() => {
                //add new Pictures
                for (let newPic of restaNewPic) {
                    axios({
                        url: '/restaurant/picture',
                        method: 'post',
                        data: {
                            "picture_URL": newPic,
                            "restaurant_id": restaID
                        }
                    })
                        .then((res) => {
                            console.log(res.data)
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            })
            .then(() => {
                location.reload()
            })
            .catch((error) => {
                console.log(error);
            })
    })

    // Add new restaurant + corresponding user can access it=
    $('#newRestaSubmitBtn').click(function (e) {
        e.preventDefault()

        let restaurant_id

        let restaName = $('#newRestaName').val()
        let restaAddress = $('#newRestaAddress').val()
        let restaDistID = parseInt($('#newRestaDist').val().match(/\d+/)) + 1
        let restaDescri = $('#newRestaDescri').val()
        let newLogo = $('#newLogo').next().attr('src')
        let restaPrice = $('#newRestaPrice').val()
        let restaPhone = $('#newRestaPhone').val()
        let restaSocial = $('#newRestaSocial').val()
        let restaURL = $('#newRestaURL').val()
        let newImg = $('#newMainImg').next().attr('src')
        let restaCate = $('#newRestaCate').val()
        let restaPic = []
        $('#newPic').children('img').each(function () {
            restaPic.push(this.src)
        })
        console.log(restaPic)

        let restaOp = $('#newRestaOp').val()
        let restaCl = $('#newRestaCl').val()
        //post new restaurant
        axios({
            url: '/restaurant/individual',
            method: 'post',
            data: {
                "name": restaName,
                "street_address": restaAddress,
                "district_id": restaDistID,
                "description": restaDescri,
                "logo": newLogo,
                "price": restaPrice,
                "telephone_number": restaPhone,
                "social_media_URL": restaSocial,
                "main_picture_URL": newImg,
                "main_category": restaCate,
                "website_URL": restaURL,
                "latitude": 19.3,
                "longitude": 105.2,
                "monday": `${restaOp}-${restaCl}`,
                "tuesday": `${restaOp}-${restaCl}`,
                "wednesday": `${restaOp}-${restaCl}`,
                "thursday": `${restaOp}-${restaCl}`,
                "friday": `${restaOp}-${restaCl}`,
                "saturday": `${restaOp}-${restaCl}`,
                "sunday": `${restaOp}-${restaCl}`,
            }
        })
            .then((res) => {
                console.log(res.data[0])

                restaurant_id = res.data[0].id

                // allowing user access the new restaurant
                return axios({
                    url: '/user/access',
                    method: 'post',
                    data: {
                        user_id,
                        restaurant_id
                    }
                })
            })
            .then((res) => {
                console.log(res.data)

                // post new pictures
                for (let newPic of restaPic) {
                    axios({
                        url: '/restaurant/picture',
                        method: 'post',
                        data: {
                            "picture_URL": newPic,
                            restaurant_id
                        }
                    })
                        .then((res) => {
                            console.log(res.data)
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
            })
            .then(() => {
                // post new category
                return axios({
                    url: '/restaurant/category',
                    method: 'post',
                    data: {
                        "category": restaCate,
                        restaurant_id
                    }
                })
            })
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    })


    //Delete restaurant
    $('.btnRestaGroup button:last-child').click(function (e) {
        e.preventDefault()
        let resta_id = parseInt($(this).closest('form').next().find('.restaLink').attr('href').match(/\d+/))
        console.log(resta_id)
        axios({
            url: '/restaurant/individual/' + resta_id,
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
})