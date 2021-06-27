$(document).ready(function () {
    slidebox()
})


function slidebox() {
    var menu = ['디자인', 'IT', 'GA/마케팅'];
    var swiper = new Swiper('.cate_container_01', {
        slidesPerView: 1,
        slidesPerColumn: 3,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (menu[index]) + '</span>';
            }
        },
    });

}