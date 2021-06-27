$(function () {
    $("#join-btn").on("click", function (e) {
        e.preventDefault()
    })

})


function checkMember() {
    const User = {
        id: $("#join-id"),
        name: $("#join-name"),
        password: $("#join-password"),
        password_check: $("#join-password-check"),
        email: $("#join-email"),
        phone_01: $("#mobile1"),
        phone_02: $("#mobile2"),
        phone_03: $("#mobile3"),
    }
    //아이디
    if (User.id.val() == "") {
        return alert("아이디가 입력되지 않았습니다.");
    }


    //이름
    if (User.name.val() == "") {
        return alert("이름이 입력되지 않았습니다.");
    }

    //비밀번호
    if (User.password.val() == "") {
        return alert("비밀번호가 입력되지 않았습니다.");
    }

    if (User.password_check.val() == "") {
        return alert("비밀번호 입력되지 않았습니다.");
    }

    if (User.password_check.val() !== User.password.val()) {
        return alert("비밀번호가 일치하지 않습니다.");
    }


    //이메일
    if (User.email.val() == "") {
        return alert("이메일이 입력되지 않았습니다.");
    }


    //휴대전화
    if (User.phone_02.val() == "" || User.phone_03.val() == "") {
        return alert("휴대전화번호를 입력해주세요.");
    }
    //아이디 체크
    $.ajax({
        url: '/api/user/id/' + User.id.val(),
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            if (data.length > 0) {
                return alert("이미 있는 아이디입니다..");
            }
        },
        fail: function (err) {
            console.log(err);
        }
    });

    $("#join-form").submit()
}