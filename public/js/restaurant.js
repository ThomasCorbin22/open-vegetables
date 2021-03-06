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

    // Adds categories to dropdown menu
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
            axios({
                url: '/user/favourite/restaurant',
                method: 'post',
                data: {
                    user_id,
                    restaurant_id
                }
            })
                .then((res) => {
                    e.currentTarget.innerHTML = '★ Favourite Restaurant'
                    $(e.currentTarget).attr('id', 'favourite-' + res.data[0].id)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else if (e.currentTarget.innerHTML.match('★')) {
            let favourite = e.currentTarget.getAttribute("id").split('-').splice(-1)[0]
            axios({
                url: `/user/favourite/restaurant/${favourite}`,
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

    // update existing restaurant 
    $('.btn-restaurant-group button:first-child').click(function (e) {
        e.preventDefault()
        let name = $(this).closest('form').find('.restaName').val()
        let street_address = $(this).closest('form').find('.restaAddress').val()
        let district_id = parseInt($(this).closest('form').find('.restaDist').val().match(/\d+/)) + 1
        let description = $(this).closest('form').find('.restaDescri').val()
        let logo = $(this).closest('form').find('.restaLogo').attr('src')
        let price = $(this).closest('form').find('.restaPrice').val()
        let telephone_number = $(this).closest('form').find('.restaTele').val()
        let social_media_URL = $(this).closest('form').find('.restaSocial').val()
        let website_URL = $(this).closest('form').find('.restaWeb').val()
        let main_picture_URL = $(this).closest('form').find('.restaPic').attr('src')
        let restaurant_id = parseInt($(this).closest('form').next().find('.restaLink').attr('href').match(/\d+/))
        let main_category = $(this).closest('form').find('.restaCate').val()
        let latitude = parseFloat($(this).closest('form').find('.restaLat').val())
        let longitude = parseFloat($(this).closest('form').find('.restaLng').val())
        let opening_hours = $(this).closest('form').find('.restaOp').val()
        let closing_hours = $(this).closest('form').find('.restaCl').val()

        let existing_pictures = []
        $.each($(this).closest('form').find('.restaurant-picture'), function () {
            existing_pictures.push({ id: $(this).attr('title'), url: $(this).attr('src') })
        })

        let new_pictures = []
        $.each($(this).closest('form').find('.new-picture').children(), function () {
            new_pictures.push($(this).attr('src'))
        })

        if (price == '$50-100' || price == '$101-150') price = 1
        else if (price == '$151-200' || price == '$201-250') price = 2
        else if (price == '$250') price = 3

        axios({
            url: '/restaurant/individual/' + restaurant_id,
            method: 'put',
            data: {
                name,
                street_address,
                district_id,
                description,
                logo,
                price,
                main_category,
                telephone_number,
                social_media_URL,
                main_picture_URL,
                website_URL,
                latitude,
                longitude,
                monday: `${opening_hours}-${closing_hours}`,
                tuesday: `${opening_hours}-${closing_hours}`,
                wednesday: `${opening_hours}-${closing_hours}`,
                thursday: `${opening_hours}-${closing_hours}`,
                friday: `${opening_hours}-${closing_hours}`,
                saturday: `${opening_hours}-${closing_hours}`,
                sunday: `${opening_hours}-${closing_hours}`,
            }
        })
            .then((res) => {
                //delete every category when update
                return axios({
                    url: '/restaurant/category/list/' + restaurant_id,
                    method: 'get'
                })
            })
            .then((res) => {
                for (let category of res.data) {
                    axios({
                        url: '/restaurant/category/' + category.id,
                        method: 'delete'
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
                        category: main_category,
                        restaurant_id
                    }
                })
            })
            .then(() => {
                //update old pictures
                return axios({
                    url: '/restaurant/picture/list/' + restaurant_id,
                    method: 'get'
                })
            })
            .then((res) => {
                for (let original of res.data) {
                    for (let update of existing_pictures) {
                        if (update.id == original.id) {
                            axios({
                                url: '/restaurant/picture/' + original.id,
                                method: 'put',
                                data: {
                                    picture_URL: update.url,
                                    restaurant_id
                                }
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
                for (let picture_URL of new_pictures) {
                    axios({
                        url: '/restaurant/picture',
                        method: 'post',
                        data: {
                            picture_URL,
                            restaurant_id
                        }
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
    $('#new-restaurant-submit-btn').click(function (e) {
        e.preventDefault()

        let restaurant_id

        let name = $('#new-restaurant-name').val()
        let street_address = $('#new-restaurant-address').val()
        let district_id = parseInt($('#new-restaurant-district').val().match(/\d+/)) + 1
        let description = $('#new-restaurant-description').val()
        let logo = $('#new-logo').next().attr('src')
        let price = $('#new-restaurant-price').val()
        let telephone_number = $('#new-restaurant-phone').val()
        let social_media_URL = $('#new-restaurant-social').val()
        let website_URL = $('#new-restaurant-url').val()
        let main_picture_URL = $('#new-main-img').next().attr('src')
        let category = $('#new-restaurant-categories').val()
        let pictures = []
        let latitude = parseFloat($('#new-restaurant-latitude').val())
        let longitude = parseFloat($('#new-restaurant-longitude').val())
        let opening_hours = $('#new-restaurant-opening-hours').val()
        let closing_hours = $('#new-restaurant-closing-hours').val()

        $('#new-pictures').children('img').each(function () {
            pictures.push(this.src)
        })
        
        if (price == '$50-100' || price == '$101-150') price = 1
        else if (price == '$151-200' || price == '$201-250') price = 2
        else if (price == '$250') price = 3

        //post new restaurant
        axios({
            url: '/restaurant/individual',
            method: 'post',
            data: {
                name,
                street_address,
                district_id,
                description,
                logo,
                price,
                telephone_number,
                social_media_URL,
                main_picture_URL,
                website_URL,
                latitude,
                longitude,
                monday: `${opening_hours}-${closing_hours}`,
                tuesday: `${opening_hours}-${closing_hours}`,
                wednesday: `${opening_hours}-${closing_hours}`,
                thursday: `${opening_hours}-${closing_hours}`,
                friday: `${opening_hours}-${closing_hours}`,
                saturday: `${opening_hours}-${closing_hours}`,
                sunday: `${opening_hours}-${closing_hours}`,
            }
        })
            .then((res) => {
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
                // post new pictures
                for (let picture_URL of pictures) {
                    axios({
                        url: '/restaurant/picture',
                        method: 'post',
                        data: {
                            picture_URL,
                            restaurant_id
                        }
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
                        category,
                        restaurant_id
                    }
                })
            })
            .then(() => {
                location.reload()
            })
            .catch((error) => {
                console.log(error);
            })
    })


    //Delete restaurant
    $('.btn-restaurant-group button:last-child').click(function (e) {
        e.preventDefault()
        let restaurant_id = parseInt($(this).closest('form').next().find('.restaurant-link').attr('href').match(/\d+/))
        axios({
            url: '/restaurant/individual/' + restaurant_id,
            method: 'delete'
        })
            .then((res) => {
                location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    })
})