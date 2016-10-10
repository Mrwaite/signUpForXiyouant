var matchRegExp = {
    name : '^[\\u4e00-\\u9fa5]{0,}$',
    stNumber : '^\d{8}$',
    telNumber : '^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$'
};

var noMatchMsg = {
    name: '请输入中文',
    stNumber: '请输入8位学号',
    telNumber: '请输入规范手机号码'
};

function check(domID, post, bool) {
    $('#'+ domID).on('blur', function (e) {
        var VdomID = $('#' + domID).val();
        var JdomID = {};
        JdomID[domID] = VdomID;
        if(VdomID) {
            if(new RegExp(matchRegExp[domID]).test(VdomID)) {
                $('#' + domID).parent().removeClass('error');
                $('#' + domID +'_lable').hide();
                bool || $.post('/checkNameOrSN', JdomID , function (data) {post(data);});
            } else {
                $('#' + domID).parent().addClass('error');
                $('#' + domID +'_lable').show();
            }
        } else {
            $('#' + domID).parent().addClass('error');
            $('#' + domID +'_lable').hide();
        }
    });
}

$(document).ready(function () {
    check('name', function () {

    }, true);
    check('stNumber', function () {

    }, true);
    check('telNumber', function () {}, false);
});
