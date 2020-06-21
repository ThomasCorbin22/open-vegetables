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
    $('.add-favourite').on('click', function (e) {
        let resta_id = e.currentTarget.parentNode.previousElementSibling.firstChild.getAttribute("href").split('/').splice(-1)[0]
        if (e.currentTarget.innerHTML.match('☆')) {
            console.log(user_id)
            console.log(resta_id)
            axios({
                url: '/user/favourite/restaurant',
                method: 'post',
                data: {
                    "user_id": user_id,
                    "restaurant_id": resta_id
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
        let restaDistrict
        let restaDescri = $(this).closest('form').find('.restaDescri').val()
        let restaLogo = $(this).closest('form').find('.restaLogo').attr('src')
        let restaPrice = $(this).closest('form').find('.restaPrice').val()
        let restaPhone = $(this).closest('form').find('.restaTele').val()
        let restaSocial = $(this).closest('form').find('.restaSocial').val()
        let restaURL = $(this).closest('form').find('.restaWeb').val()
        let restaImg = $(this).closest('form').find('.restaPic').attr('src')


        let restaOp = $(this).closest('form').find('.restaOp').val()
        let restaCl = $(this).closest('form').find('.restaCl').val()
        axios({
            url: '/restaurant/2',
            method: 'put',
            data: {
                "name": restaName,
                "street_address": restaAddress,
                "district_id": 4,
                "description": restaDescri,
                "logo": restaLogo,
                "price": restaPrice,
                "telephone_number": restaPhone,
                "social_media_URL": restaSocial,
                "main_picture_URL": restaImg,
                "website_URL": restaURL,
                "latitude": 23.0,
                "longitude": 113.6,
                "opening_time": restaOp,
                "closing_time": restaCl
            }
        })
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    })

    // Add new restaurant + corresponding user can access it=
    $('#newRestaSubmitBtn').click(function (e) {
        e.preventDefault()
        let restaName = $('#newRestaName').val()
        let restaAddress = $('#newRestaAddress').val()
        let restaDistrict
        let restaDescri = $('#newRestaDescri').val()
        let newLogo = $('#newLogo').next().attr('src')
        let restaPrice = $('#newRestaPrice').val()
        let restaPhone = $('#newRestaPhone').val()
        let restaSocial = $('#newRestaSocial').val()
        let restaURL = $('#newRestaURL').val()
        let newImg = $('#newImg').next().attr('src')


        let restaOp = $('#newRestaOp').val()
        let restaCl = $('#newRestaCl').val()

        axios({
            url: '/restaurant',
            method: 'post',
            data: {
                "name": restaName,
                "street_address": restaAddress,
                "district_id": 1,
                "description": restaDescri,
                "logo": newLogo,
                "price": restaPrice,
                "telephone_number": restaPhone,
                "social_media_URL": restaSocial,
                "main_picture_URL": newImg,
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
                axios({
                    url: '/user/access',
                    method: 'post',
                    data: {
                        "user_id": user_id,
                        "restaurant_id": res.data[0].id
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


    //Delete restaurant
    $('.btnRestaGroup button:last-child').click(function (e) {
        e.preventDefault()
        let resta_id = $(this).closest('form').next().find('.restaLink').attr('href').match(/\d+/)
        console.log(resta_id)
        axios({
            url: '/restaurant/' + parseInt(resta_id),
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


    // $('.btnGroup button:eq(1)').click(function (e) {
    //   let resta_id = $(this).closest('form').next().find('.restaLink').attr('href').match(/\d+/)
    //   axios({
    //     url: '/restaurant/' + parseInt(resta_id),
    //     method: 'put',
    //     data: {
    //       "name": 'Our cool restaurant: V2',
    //       "street_address": 'GreenLand',
    //       "district_id": 4,
    //       "description": 'Nicer food',
    //       "logo": 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.6iu2HE0CMnwIpGvu66bMaAHaFj%26pid%3DApi&f=1',
    //       "price": 2,
    //       "telephone_number": '999',
    //       "social_media_URL": 'www.google.com',
    //       "main_picture_URL": 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    //       "website_URL": 'www.cool.com',
    //       "latitude": 23.0,
    //       "longitude": 113.6,
    //       "opening_time": '09:30',
    //       "closing_time": '21:50'
    //     }
    //   })
    //     .then((res) => {
    //       console.log(res.data)
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // })

})