// attach ready event
$(document).ready(function () {
    var dropdown_item = $('.ui.page.dropdown');
    var menu_transition = $('.menu.transition');

    /*顶部menu菜单弹出框*/
    dropdown_item.on('mouseover', function () {
        menu_transition.removeClass('hidden').addClass('active');
    });
    dropdown_item.on('mouseout', function () {
        menu_transition.removeClass('active').addClass('hidden');
    });
    
});