"use strict";

//Rage Template
//Designerd by: http://bootstrapthemes.co
let stretchs = [];
// 해당 유저 날짜 스트레칭 조회
let user_day_cure = function (date) {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: `http://107.21.77.37/cure/date?user_email=${localStorage.getItem('key')}&date=${date}`,

            //전달할 때 사용되는 파라미터 변수명
            // 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
            success: function (data, textStatus, jqXHR) {
                console.log('success');
                stretchs = data; // 전역변수 생성
                // console.log(JSON.parse(data[0]));
                // console.log(JSON.parse(data[0]));
                today_chk(); // 차트 데이터 넣기 
            },
            complete: function (d) {
            },
            error: function (xhr, textStatus, error) {
                console.log(xhr.responseText);
                console.log(textStatus);
                console.log(error);
            }
        });
    });
}

// 모든 거북이 조회
let all_turtle = function () {
    var data1 = null
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            url: 'http://107.21.77.37/turtle/',
            // jsonp 값을 전달할 때 사용되는 파라미터 변수명
            // 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
            success: function (data, textStatus, jqXHR) {
                console.log('success');
                // console.log(JSON.parse(data[0]));
                getComplateTurtle(data);
            },
            complete: function (d) {
                console.log('d')
            },
            error: function (d) {
                console.log('실패' + d.responseText)
            }
        });
    });
}

// 오늘 날짜 구하기
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}

jQuery(document).ready(function ($) {

    //for Preloader

    $(window).load(function () {
        $("#loading").fadeOut(500);
    });


    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    $('#navbar-menu').find('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 80)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });



    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

    var wow = new WOW({
        mobile: false // trigger animations on mobile devices (default is true)
    });
    wow.init();

    // magnificPopup

    $('.popup-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    $('.video-link').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

            patterns: {
                youtube: {
                    index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                    id: 'v=', // String that splits URL in a two parts, second part should be %id%
                    // Or null - full URL will be returned
                    // Or a function that should return %id%, for example:
                    // id: function(url) { return 'parsed id'; }

                    src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                }
                // you may add here more sources

            },

            srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
        }

    });



    // slick slider active Home Page Tow
    $(".testimonial_slid").slick({
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: "<i class='fa fa-angle-left nextprevleft'></i>",
        nextArrow: "<i class='fa fa-angle-right nextprevright'></i>",
        autoplay: true,
        autoplaySpeed: 2000
    });



    //    featured slider
    $('.featured_slider').slick({
        centerMode: true,
        dote: true,
        centerPadding: '60px',
        slidesToShow: 3,
        speed: 1500,
        index: 2,
        responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });



    //---------------------------------------------
    // Counter 
    //---------------------------------------------

    $('.statistic-counter').counterUp({
        delay: 10,
        time: 2000
    });

    //---------------------------------------------
    // Scroll Up 
    //---------------------------------------------

    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
        return false;
    });





    //About us accordion 

    $("#faq_main_content").collapse({
        accordion: true,
        open: function () {
            this.addClass("open");
            this.css({
                height: this.children().outerHeight()
            });
        },
        close: function () {
            this.css({
                height: "0px"
            });
            this.removeClass("open");
        }
    });





    //Team Skillbar active js

    jQuery('.teamskillbar').each(function () {
        jQuery(this).find('.teamskillbar-bar').animate({
            width: jQuery(this).attr('data-percent')
        }, 6000);
    });



    //Span Menu toggle
    $(".navbar-header button").on('click', function () {
        $('.navbar-header button').toggleClass('active');
    });



    //End

});

// main animation
function ani() {
    var imgArray = new Array();
    imgArray[0] = "/assets/images/ani1.png";
    imgArray[1] = "/assets/images/ani2.png";

    function showImage() {
        var imgNum = Math.round(Math.random() * 2);
        var objImg = document.getElementById("img-ani");
        objImg.src = imgArray[imgNum];
        setTimeout("showImage()", 3000);
    }
};


// 한날 안한날 체크
function today_chk() {
    console.log("chart")
    let one = stretchs.filter(data => data.stretch == 1)
    let two = stretchs.filter(data => data.stretch == 2)
    let three = stretchs.filter(data => data.stretch == 3)

    console.log(one,two,three)
    if(one.length>=1){
        testChk(1);
    }
    if(two.length>=1){
        testChk(2);
    }
    if(three.length>=1){
        testChk(3);
    }

};
// 체크박스
function testChk(num) {
    let getClassName = "testchk" + num;
    console.log(getClassName);
    if (num == 1) {
        let getClass = document.getElementById(getClassName);
        console.log(getClass);
        getClass.style.display = 'inline-block';
    } else if (num == 2) {
        let getClass = document.getElementById(getClassName);
        getClass.style.display = 'inline-block';
    } else if (num == 3) {
        let getClass = document.getElementById(getClassName);
        getClass.style.display = 'inline-block';
    }
}

function getComplateTurtle(turtles){
    let complate = turtles.filter((data)=>{
        if(data.best.length >=9){   // 완주한 거북이들만
            return data;
        }
    });
    // 역순으로 정렬 후 필요한 데이터들 골라내기
    let history_datas = complate.sort((a, b) => new Date(b.best) - new Date(a.best)).map((data)=> [data.num, data.name, data.best])

    history(history_datas);
}

// 거북 역사관
// let user = [[1,'거북1','2020-03-23'],[3,'거북2','2020-04-03'],[2,'거북3','2020-04-13'],[3,'거북4','2020-04-22'],[3,'거북5','2020-05-01'],[3,'거북6','2020-05-10']]
function history(user){
    let history_div = document.getElementById('history-div');
    for(let i = 0; i<user.length; i++){
        let history_ul = document.createElement('ul');
        history_ul.id = 'history-ul';
        history_div.appendChild(history_ul);

        let img_li = document.createElement('li');
        let name_li = document.createElement('li');
        let date_li = document.createElement('li');
        let user_img = document.createElement('img');
        history_ul.appendChild(img_li);
        history_ul.appendChild(name_li);
        history_ul.appendChild(date_li);
        img_li.appendChild(user_img);

        console.log(user);
        for(let j = 0; j< user[i].length; j++){
            console.log(user[i][j]);
            if(j == 0){
                if(user[i][j] == 1){
                    user_img.src = 'assets/images/progress_tutle1.png';
                }else if(user[i][j] == 2){
                    user_img.src = 'assets/images/progress_tutle2.png';
                }else if(user[i][j] == 3){
                    user_img.src = 'assets/images/progress_tutle3.png';
                }else if(user[i][j] == 4){
                    user_img.src = 'assets/images/progress_tutle4.png';
                }
            }else if(j == 1){
                name_li.innerHTML = user[i][1];
            }else if(j == 2){
                date_li.innerHTML = user[i][2];
            }
        }
    }
}

// //최고기록 text
// function bestRecord(num) {
//     let idName = 'best-record' + num;

//     let recordText = document.getElementById(idName);
//     console.log(recordText);
//     recordText.style.display = 'inline-block';
// }
ani();
// history(user);
// bestRecord(2);
// 오늘 한 스트레칭 체크표시하기
let day = getToday();
user_day_cure(day);
all_turtle();