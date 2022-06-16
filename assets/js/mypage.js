// 공통함수 가져오기
// import { get_turtle, edit_turtle } from "../../JS/turtles.js";

function countDownTimer (_sdate){
    let id = 'todo-date';
    let sdate = new Date(_sdate);
    let edate = new Date(sdate.setDate(sdate.getDate()+100));
    // console.log(_end);
    let _second = 1000;
    let _minute = _second * 60;
    let _hour = _minute * 60;
    let _day = _hour * 24;
   
    let timer;
    
    setInterval(function showTimer(){
        let now = new Date();
        let disDt = edate - now;

         if(disDt < 0){
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

        document.getElementById(id).textContent =days + '일 ' + hours + "시간 " + minutes + '분';
        

    },1000);

    
}
// 날짜계산 함수
function dateCalcul(_sdate){
    // let date = new Date();
    let sdate = new Date(_sdate);

    let syear = sdate.getFullYear();
    let smonth = sdate.getMonth()+1;
    let sday = sdate.getDate();
    console.log(sdate,syear,smonth,sday);
    
    
    document.getElementById('start-day').textContent = syear+'년 '+smonth+'월 '+sday + '일 ';
    let today = new Date();
    // console.log(today);
    let edate = new Date(sdate.setDate(sdate.getDate()+99));
    
    let eyear = edate.getFullYear();
    let emonth = edate.getMonth()+1;
    let eday = edate.getDate();
    console.log(edate,emonth,eday);
    document.getElementById('end-day').textContent = eyear+'년 '+emonth+'월 '+eday + '일';
}

function save_info(){
    let name = name_info()
    const char = $('input[name="chk_char"]:checked').val();
    console.log(char);
    char_img(char);
    
    // 수정함수 호출
    user_email = localStorage.getItem('key')
    edit_turtle(user_email, name,char);
}
function name_info(){
    let name = document.getElementById('name-info').value;
    console.log(name);
    if(name != ''){
        document.getElementById('show-name').innerHTML=name;
    }
    return name
}

// 번호구분하여 프로필 이미지 변환
function char_img(num){
    if(num == 1){
        document.getElementById('profile-img').src = '/assets/images/profile/1.png';
    }else if(num == 2){
        document.getElementById('profile-img').src = '/assets/images/profile/2.png';
    }else if(num == 3){
        document.getElementById('profile-img').src = '/assets/images/profile/3.png';
    }else if(num == 4){
        document.getElementById('profile-img').src = '/assets/images/profile/4.png';
    }
}

// progress 진행도 표시
function progressMove(_sdate) {
    let sdate = new Date(_sdate);
    let now = new Date();
    let percent = now - sdate;
    const d_day = Math.floor(percent / (1000*60*60*24));
    console.log(d_day);

    i = 0;
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar");
      var imgDiv = document.getElementById("progressImgDiv");
      var imgDivW =0;
      var width = 0;
      var id = setInterval(frame, 50);
      function frame() {
        if (width >= d_day) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
        
          elem.style.width = width + "%";
          elem.innerHTML = width  + "%";
          imgDiv.style.width = width + "%";
        }
      }
    }
  }
countDownTimer('2022-06-16');
dateCalcul('2022-06-16');
progressMove('2022-04-15');



