"use strict";
// import { get_turtle, edit_turtle } from "../../JS/turtles.js";
// 수정하기
// 거북이 정보 수정
let stretchs = []

function setCookie(key, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
    console.log(cookie);
    cookie.some(function (item) {
        // 공백을 제거
        item = item.replace(' ', '');

        var dic = item.split('=');

        if (key === dic[0]) {
            result = unescape(dic[1]);
            return true; // break;
        }
    });
    return result;
}

// 해당 유저 스트레칭 조회
let user_cure = function () {
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: `http://107.21.77.37/cure/user?user_email=${localStorage.getItem('key')}`,

            //전달할 때 사용되는 파라미터 변수명
            // 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
            success: function (data, textStatus, jqXHR) {
                console.log('success');
                console.log('유저꺼',data);
                stretchs = data;
                count_date();
                // console.log(JSON.parse(data[0]));
            },
            complete: function (d) {
                console.log('d')
            },
            error: function (xhr, textStatus, error) {
                console.log(xhr.responseText);
                console.log(textStatus);
                console.log(error);
            }
        });
    });
}

// 수정 ajax
let edit_turtle = function (email, name, num) {
    console.log(email)
    $(document).ready(function () {
        $.ajax({
            type: "PUT",
            url: 'http://107.21.77.37/turtle/user?user_email=' + email,
            dataType: "json",
            accept: "application/json",
            data: JSON.stringify({
                "email": email,
                "name": name,
                "num": num,
                "best": getCookie("best"),
                "ease": getCookie("ease")
            }),
            //전달할 때 사용되는 파라미터 변수명
            // 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
            success: function (data, textStatus, jqXHR) {
                console.log('success');
                console.log(data)
                setCookie("email", data.email, 100);
                setCookie("name", data.name, 100);
                setCookie("num", data.num, 100);
                setCookie("ease", data.ease, 100);
                setCookie("best", data.best, 100);
                setCookie("created", data.created, 100);
                console.log(document.cookie);
                // console.log(JSON.parse(data[0]));
            },
            complete: function (d) {
                console.log('d')
            },
            error: function (xhr, textStatus, error) {
                console.log(xhr.responseText);
                console.log(textStatus);
                console.log(error);
            }
        });
    });
}

// 남은 시간 표시
function countDownTimer(_sdate) {
    let id = 'todo-date';
    let sdate = new Date(_sdate);
    let edate = new Date(sdate.setDate(sdate.getDate() + 99));
    console.log(edate);
    let _second = 1000;
    let _minute = _second * 60;
    let _hour = _minute * 60;
    let _day = _hour * 24;

    let timer;

    setInterval(function showTimer() {
        let now = new Date();
        let disDt = edate - now;

        if (disDt < 0) {
            clearInterval(timer);
            // console.log("타이머0");
            document.getElementById(id).textContent = '0일 0시간 0분';
            return;
        }
        // console.log("타이머");
        let days = Math.floor(disDt / _day);
        let hours = Math.floor((disDt % _day) / _hour);
        let minutes = Math.floor((disDt % _hour) / _minute);
        let seconds = Math.floor((disDt % _minute) / _second);

        document.getElementById(id).textContent = days + '일 ' + hours + "시간 " + minutes + '분';


    }, 1000);


}
// 날짜계산 함수
function dateCalcul(_sdate) {
    // let date = new Date();
    let sdate = new Date(_sdate);

    let syear = sdate.getFullYear();
    let smonth = sdate.getMonth() + 1;
    let sday = sdate.getDate();
    console.log(sdate, syear, smonth, sday);


    document.getElementById('start-day').textContent = syear + '년 ' + smonth + '월 ' + sday + '일 ';
    let today = new Date();
    // console.log(today);
    let edate = new Date(sdate.setDate(sdate.getDate() + 99));

    let eyear = edate.getFullYear();
    let emonth = edate.getMonth() + 1;
    let eday = edate.getDate();
    console.log(edate, emonth, eday);
    document.getElementById('end-day').textContent = eyear + '년 ' + emonth + '월 ' + eday + '일';
}

function save_info() {
    let name = name_info()
    const char = $('input[name="chk_char"]:checked').val();
    console.log(char);

    // 수정함수 호출
    user_email = localStorage.getItem('key');
    edit_turtle(user_email, name, char);
}

function name_info() {
    let name = document.getElementById('name-info').value;
    console.log(name);
    if (name != '') {
        document.getElementById('show-name').innerHTML = name;
    }
    return name
}

// progress 진행도 표시
function progressMove(_cnt_date) {
    const d_day = _cnt_date;
    console.log(d_day);

    i = 0;
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var imgDiv = document.getElementById("progressImgDiv");
        var imgDivW = 0;
        var width = 0;
        var id = setInterval(frame, 50);

        function frame() {
            if (width >= d_day) {
                clearInterval(id);
                i = 0;
            } else {
                width++;

                elem.style.width = width + "%";
                elem.innerHTML = width + "%";
                imgDiv.style.width = width + "%";
            }
        }
    }
}

// 번호구분하여 프로필 이미지 변환
function char_img(num) {
    if (num == 1) {
        document.getElementById('profile-img').src = '/assets/images/profile/1.png';
    } else if (num == 2) {
        document.getElementById('profile-img').src = '/assets/images/profile/2.png';
    } else if (num == 3) {
        document.getElementById('profile-img').src = '/assets/images/profile/3.png';
    } else if (num == 4) {
        document.getElementById('profile-img').src = '/assets/images/profile/4.png';
    }
}

// 한 날 카운트하기
function count_date(){
    let days = stretchs.map((data)=> data.created);
    const set = new Set(days);
    const uniqueArr = [...set]; // 중복제거

    progressMove(uniqueArr.length); // 진행도 표시
}

// 마이페이지 첫화면 데이터 넣기
function mypage_data() {
    const name = document.getElementById("show-name");
    const start = document.getElementById("start-day");
    const end = document.getElementById("end-day");
    const percent_text = document.querySelector(".percent");
    console.log(name, start, end)
    name.innerText = getCookie("name");
    start.innerText = getCookie("created");
    percent_text.innerText = getCookie("ease")+"%";

    var days = getCookie("created");
    const strArr = days.split('-');
    const date = new Date(strArr[0], strArr[1] - 1, strArr[2]);
    date.setDate(date.getDate());
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var dateString = year + '-' + month + '-' + day;
    end.innerText = dateString;

    dateCalcul(days);   // 날짜 계산하기
    countDownTimer(dateString); // 남은 일수 입력
    char_img(getCookie("num")); // 캐릭터 이미지 넣기
    user_cure(); // user 데이터 가져와서 진행도 표시
}

mypage_data();

