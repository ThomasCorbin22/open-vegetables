$(document).ready(function () {
    // control image upload, decode image buffer to render 
    function renderImg(e, targetDOM) {
        let file = e.target.files[0]

        let reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = function () {
            targetDOM.attr('src', reader.result)
        }
    }

    $('#user-img-upload').on('change', function (e) {
        renderImg(e, $('#user-img'))
    })
    $('.upload-img').on('change', function (e) {
        renderImg(e, $(this).next())
    })

    // Update password
    $('#update-password-btn').click((e) => {
        e.preventDefault()
        let original_password = $('#old-password').val()
        let new_password = $('#new-password').val()

        axios({
            url: `/user/password/${user_id}`,
            method: 'put',
            data: {
                original_password,
                new_password,
            }
        })
            .then((res) => {
                $("#form-change-password").append('<p>Password changed successfully.</p>')
            })
            .catch((error) => {
                console.log(error);
                $("#form-change-password").append('<p>Something went wrong.</p>')
            })
    })

    // Update users information via put request
    $('#update-user-btn').click((e) => {
        e.preventDefault()
        let firstName = $('#name-first').val()
        let lastName = $('#name-last').val()
        let email = $('#email').val()
        let displayName = $('#name-display').val()
        let description = $('#description').val()
        let profile_picture_URL = $('#user-img').attr('src')

        axios({
            url: `/user/individual/${user_id}`,
            method: 'put',
            data: {
                displayName,
                firstName,
                lastName,
                email,
                description,
                profile_picture_URL
            }
        })
            .then((res) => {
                console.log(res)
                $('#name-first').attr('placeholder', first_name)
                $('#name-last').attr('placeholder', last_name)
                $('#email').attr('placeholder', email)
                $('#name-display').attr('placeholder', display_name)
                $('#description').attr('placeholder', description)
                $('#user-img').attr('src', profile_picture_URL)
            })

            .catch((error) => {
                console.log(error);
            })
    })

    $('#submit-security').click((e) => {
        e.preventDefault()
        let email = $('#security-email').val()
        let answer = $('#security-answer').val()

        axios({
            url: `/user/security`,
            method: 'put',
            data: {
                email,
                answer,
            }
        })
            .then((res) => {
                if (typeof res.data == 'object') {
                    user_answer = res.data
                    $('#security-page').hide()
                    $('#reset-password-page').show()
                }
            })
            .catch((error) => {
                console.log(error);
            })
    })

    $('#submit-new-password').click((e) => {
        e.preventDefault()
        let password_01 = $('#reset-password').val()
        let password_02 = $('#reset-password-2').val()

        if (password_01 === password_02 && password_01 !== null) {
            axios({
                url: `/user/lost`,
                method: 'put',
                data: {
                    id: user_answer.id,
                    answer: user_answer.answer,
                    password: password_01,
                }
            })
                .then((res) => {
                    return axios({
                        url: `/auth/login`,
                        method: 'post',
                        data: {
                            username: user_answer.email,
                            password: password_01,
                        }
                    })
                })
                .then((res) => {
                    location.reload();
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else if (password_01 !== password_02) {
            $('#reset-password-page').append('<p>The passwords do not match.</p>')
        }
        else if (password_01 === null && password_02 === null) {
            $('#reset-password-page').append('<p>You need to put entries in both fields.</p>')
        }
    })
})