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

                if(bool) {
                    $.post('/checkNameOrSN', JdomID, function (data) {
                        post(data);
                    });
                } else {
                    $('#' + domID).parent().removeClass('error');
                    $('#' + domID +'_lable').addClass('v-hidden');
                }
            } else {
                $('#' + domID).parent().addClass('error');
                $('#' + domID +'_lable').text(noMatchMsg[domID]).removeClass('v-hidden');
            }
        } else {
            $('#' + domID).parent().addClass('error');
            $('#' + domID +'_lable').addClass('v-hidden');
        }
    });
}

$(document).ready(function () {
    if(screen.width < 426 ) {
        $('#name_lable').removeClass('left');
        $('#stNumber_lable').removeClass('left');
        $('#telNumber_lable').removeClass('left');
        $('.fields').each(function(index, field){field.style.marginBottom='0px'})
    }
    check('name', function (data) {
        if (data.code === 1) {
            //表示存在这个name
            $('#name').parent().addClass('error');
            $('#name_lable').text('此姓名已被使用').removeClass('v-hidden');
        } else {
            $('#name').parent().removeClass('error');
            $('#name_lable').addClass('v-hidden');
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
    $('#submitForm').submit(function () {
        var inputText = $('#submitForm input[type=text]');
        for(var i = 0; i < 3;i++){
            if(inputText[i].value === '') {
                $('#submit_lable').removeClass('v-hidden');
                return false;
            }
        }
        $('#submit_lable').addClass('v-hidden');
        inputText[3].value = filterXSS(inputText[3].value);
        return true;
    });
});
