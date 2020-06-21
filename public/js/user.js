$(document).ready(function () {
    // control image upload, decode image buffer to render 
    function renderImg(e, targetDOM) {
        let file = e.target.files[0]
        console.log(file)

        let reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = function () {
            targetDOM.attr('src', reader.result)
        }
    }

    $('#userImageUpload').on('change', function (e) {
        renderImg(e, $('#userImage'))
    })
    $('.uploadImg').on('change', function (e) {
        renderImg(e, $(this).next())
    })


    // Update users information via put request
    $('#updateuserbtn').click((e) => {
        e.preventDefault()
        let firstName = $('#nameFirst').val()
        let lastName = $('#nameLast').val()
        let email = $('#email').val()
        let displayName = $('#nameDisplay').val()
        let password = $('#password').val()
        let description = $('#description').val()
        let profile_picture_URL = $('#userImage').attr('src')

        axios({
            url: `/user/${user_id}`,
            method: 'put',
            data: {
                "display_name": displayName,
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "password": password,
                "description": description,
                'profile_picture_URL': profile_picture_URL
            }
        })
            .then((res) => {
                console.log(res)
                $('#nameFirst').attr('placeholder', res.data)
                $('#nameLast').attr('placeholder', res.data)
                $('#email').attr('placeholder', res.data)
                $('#nameDisplay').attr('placeholder', res.data)
                $('#password').attr('placeholder', res.data)
                $('#description').attr('placeholder', res.data)
                $('#userImage').attr('src')
            })

            .catch((error) => {
                console.log(error);
            })
    })
})