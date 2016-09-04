$(document).ready(function () {
    var login_bt = $('#login');
    var username;
    login_bt.on('click', function () {
        username = $('#username').val();
        if(username === '') {
            $('.basic.modal .description>p').text('姓名不能为空!');
            $('.basic.modal').modal('show');
        }
        else {
            $.ajax({
                type: 'post',
                url: '/',
                data: username,
                success : function (data) {
                    $('.basic.modal .description>p').text(data);
                    $('.basic.modal').modal('show');
                    $('#username').val('');
                }
            });
        }
    })
})