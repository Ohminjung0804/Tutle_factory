"use strict";
// import { get_turtle, edit_turtle } from "../../JS/turtles.js";
// 수정하기
// 거북이 정보 수정
let users =[] // 거북이경주 유저 데이터들
let call_cnt = 0;

function setCookie(key, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = key + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
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
let user_cure = function (user_email,index,isEnd) {  //해당 유저 이메일, index
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: `http://3.94.248.115/cure/user?user_email=`+user_email,

            //전달할 때 사용되는 파라미터 변수명
            // 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
            success: function (data, textStatus, jqXHR) {
                // stretchs.push(data);
                // console.log('사용자들 : ',stretchs);
                count_date(index,data);
                call_cnt+=1;
                if(call_cnt===isEnd){ // 호출횟수가 길이랑 같으면
                    // 프로그래스 데이터 표시
                    call_progress();
                }
                // console.log(JSON.parse(data[0]));
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

// 수정 ajax
let edit_turtle = function (email, name, num) {
    console.log(email)
    $(document).ready(function () {
        $.ajax({
            type: "PUT",
            url: 'http://3.94.248.115/turtle/user?user_email=' + email,
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

// 수정 ajax
let edit_complate_turtle = function (date) {
    console.log(email)
    $(document).ready(function () {
        $.ajax({
            type: "PUT",
            url: 'http://3.94.248.115/turtle/user?user_email=' + localStorage.getItem('key'),
            dataType: "json",
            accept: "application/json",
            data: JSON.stringify({
                "email": email,
                "name": getCookie("name"),
                "num": getCookie("num"),
                "best":date,
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
                setCookie("best", data.best);
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

// 같은 날짜에 시작한 유저들 가져오기
let get_start_turtle = function () {
    var data1 = null
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: `http://3.94.248.115/turtle/date?user_email=${localStorage.getItem('key')}`,

            //전달할 때 사용되는 파라미터 변수명
            // 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
            success: function (data, textStatus, jqXHR) {
                console.log('success');
                console.log('데이터',data);
                // console.log(JSON.parse(data[0]));
                getProgressData(data);
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

// 수정하기 눌렀을경우
function save_info() {
    let name = name_info()
    const char = $('input[name="chk_char"]:checked').val();
    console.log(char);

    // 수정함수 호출
    let user_email = localStorage.getItem('key');
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

// let my = ["거북이",60, 2];
// let user = ["거북이2", 50,1];
// let user2 = ["거북이3", 10,4];
// let user3= ["거북이4", 80,3];
// let user4 = ["거북이5", 60,4];
// my_progressMove(my);
// user_progressMove(user);
// user_progressMove(user2);
// user_progressMove(user3);
// user_progressMove(user4);
// progress 진행도 표시

// 오늘 날짜 구하기
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
  
    return year + "-" + month + "-" + day;
  }
// 유저들 진행도 거북이경주에 표시시키기
function call_progress(){
    // data : [유저이름, 진행율, 캐릭터, 이메일]
    users.forEach((data,i)=>{
        console.log(i,data)
        console.log('쿠키',document.cookie);

        if(data[3]==getCookie("email")){
            if(getCookie("best").length<9 && data[1] ===100){   // 수정 전이고, 완주했을때
                let tday = getToday();
                edit_complate_turtle(tday); // 완료날짜로 수정
            }
            my_progressMove(data); // 사용자일경우
        }else{
            user_progressMove(data); // 다른 사용자일경우
        }
    });
}
function my_progressMove(my) {
    // const d_day = _cnt_date;
    // console.log(d_day);

    let my_profile = my[2];
    let my_img = document.getElementById("my_progressImg");
    // my_img.src = img;
    if (my_profile == 1) {
        my_img.src = '/assets/images/progress_tutle1.png';
    } else if (my_profile == 2) {
        my_img.src = '/assets/images/progress_tutle2.png';
    } else if (my_profile == 3) {
        my_img.src = '/assets/images/progress_tutle3.png';
    } else if (my_profile == 4) {
        my_img.src = '/assets/images/progress_tutle4.png';
    }
    let i = 0;
    if (i == 0) {
        i = 1;
        
        var my_name = document.getElementById("my_name");
        
        my_name.innerHTML = my[0];
        

        var elem = document.getElementById("myBar");
        let progress_percent = document.getElementById('progress_percent');
        var imgDiv = document.getElementById("progressImgDiv");
        var imgDivW = 0;
        var width = 0;
        var id = setInterval(frame, 50);
        function frame() {
            if (width >= (my[1]+10)) {
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

function user_progressMove(user){

    let play = 0;
    if (play == 0) {
        play = 1;
        let parent = document.getElementById('parent-div');

        let progressImgDiv = document.createElement('div');
        progressImgDiv.id = 'progressImgDiv_user';
        parent.appendChild(progressImgDiv);

        let rank_user = document.createElement('div');
        progressImgDiv.appendChild(rank_user);
        rank_user.classList.add('rank_user');

        let user_progressImg = document.createElement('img');
        user_progressImg.id = 'user_progressImg';
        rank_user.appendChild(user_progressImg);

        let user_name = document.createElement('p');
        user_name.id = 'user_name';
        rank_user.appendChild(user_name);
        
        
        
        if (user[2] == 1) {
            user_progressImg.src = '/assets/images/progress_tutle1.png';
        } else if (user[2] == 2) {
            user_progressImg.src = '/assets/images/progress_tutle2.png';
        } else if (user[2] == 3) {
            user_progressImg.src = '/assets/images/progress_tutle3.png';
        } else if (user[2] == 4) {
            user_progressImg.src = '/assets/images/progress_tutle4.png';
        }
        user_name.innerHTML = user[0];
        console.log(parent);

        var width = 0;
        var id = setInterval(frame, 50);

        function frame() {
            if (width >= user[1]) {
                clearInterval(id);
                play = 0;
            } else {
                width ++;

                progressImgDiv.style.width = width + "%";
                elem.innerHTML = width + "%";
                user_progressImg.style.width = width + "%";
            }
        }
    }
    
}

// 같은 날짜에 시작한 사용자들 가져와서 해당 스트레칭들 가져오기
function getProgressData(turtles){
    users = turtles.map((data)=> [data.name,0,data.num,data.email]); // 거북이이름, 진행도초기화, 캐릭터번호
    let emails = turtles.map((data) => data.email);

    emails.forEach((element,i) => {
        user_cure(element,i,emails.length);
    });

}

// 한 날 카운트하기
function count_date(index, datas){  // 해당배열번호, 데이터
    let days = datas.map((data)=> data.created);
    const set = new Set(days);
    const uniqueArr = [...set]; // 중복제거

    users[index][1]= (uniqueArr.length); // 진행도 해당 유저에 넣어주기
    // let days = stretchs.map((data)=> data.created);
    // const set = new Set(days);
    // const uniqueArr = [...set]; // 중복제거

    // progressMove(uniqueArr.length); // 진행도 표시
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
    get_start_turtle(); // 거북이경주
}

mypage_data();

