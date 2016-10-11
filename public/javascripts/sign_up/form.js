var matchRegExp = {
    name : '^[\\u4e00-\\u9fa5]{0,}$',
    stNumber : '^\\d{8}$',
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

                if(bool)
                    $.post('/checkNameOrSN', JdomID, function (data) {
                        post(data);
                    });
            } else {
                $('#' + domID).parent().addClass('error');
                $('#' + domID +'_lable').text(noMatchMsg[domID]).removeClass('v-hidden');
            }
        } else {
            $('#' + domID).parent().addClass('error');
            $('#' + domID +'_lable').style.addClass('v-hidden');
        }
    });
}

$(document).ready(function () {
    check('name', function (data) {
        if (data.code === 1) {
            //表示存在这个name
            $('#name').parent().addClass('error');
            $('#name_lable').text('此姓名已被使用').removeClass('v-hidden');
        } else {
            $('#name').parent().removeClass('error');
            $('#name_lable').style.addClass('v-hidden');
        }
    }, true);
    check('stNumber', function (data) {
        if (data.code === 1) {
            //表示存在这个name
            $('#stNumber').parent().addClass('error');
            $('#stNumber_lable').text('此学号已经被使用').removeClass('v-hidden');
        } else {
            $('#stNumber').parent().removeClass('error');
            $('#stNumber_lable').addClass('v-hidden');
        }
    }, true);
    check('telNumber', function () {}, false);
});
