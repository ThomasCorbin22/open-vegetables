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
    $('#updatePasswordbtn').click((e) => {
        e.preventDefault()
        let original_password = $('#oldPassword').val()
        let new_password = $('#newPassword').val()

        axios({
            url: `/user/password/${user_id}`,
            method: 'put',
            data: {
                original_password,
                new_password,
            }
        })
        .then((res) => {
            console.log(res)
            $("#form-change-password").append('<p>Password changed successfully.</p>')
        })
        .catch((error) => {
            console.log(error);
            $("#form-change-password").append('<p>Something went wrong.</p>')
        })
    })

    // Update users information via put request
    $('#updateuserbtn').click((e) => {
        e.preventDefault()
        let firstName = $('#nameFirst').val()
        let lastName = $('#nameLast').val()
        let email = $('#email').val()
        let displayName = $('#nameDisplay').val()
        let description = $('#description').val()
        let profile_picture_URL = $('#userImage').attr('src')

        axios({
            url: `/user/${user_id}`,
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

    $('#submitSecurity').click((e) => {
        e.preventDefault()
        let email = $('#securityEmail').val()
        let answer = $('#securityAns').val()

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
                console.log(res.data)
                user_answer = res.data
                $('#securityPage').hide()
                $('#resetPwdPage').show()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    })

    $('#submitNewPwd').click((e) => {
        e.preventDefault()
        let password_01 = $('#resetPwd').val()
        let password_02 = $('#resetPwd2').val()

        console.log(user_answer)

        if (password_01 === password_02 && password_01 !== null){
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
                console.log(res)
                axios({
                    url: `/auth/login`,
                    method: 'post',
                    data: {
                        username: user_answer.email,
                        password: password_01,
                    }
                })
                .then((res) => {
                    console.log(res)
                    location.reload();
                })
                .catch((error) => {
                    console.log(error);
                })
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else if (password_01 !== password_02){
            $('#resetPwdPage').append('<p>The passwords do not match.</p>')
        }
        else if (password_01 === null && password_02 === null){
            $('#resetPwdPage').append('<p>You need to put entries in both fields.</p>')
        }
    })
})