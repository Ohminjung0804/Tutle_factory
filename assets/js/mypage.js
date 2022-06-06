function countDownTimer (id,eDate){
    let _end = new Date(eDate);
    let _second = 1000;
    let _minute = _second * 60;
    let _hour = _minute * 60;
    let _day = _hour * 24;
   
    let timer;
    
    setInterval(function showTimer(){
        let now = new Date();
        let disDt = _end - now;

         if(disDt < 0){
            clearInterval(timer);
            console.log("타이머0");
            document.getElementById(id).textContent = '0일 0시간 0분';
            return;
        }
        // console.log("타이머");
        let days = Math.floor(disDt / _day);
        let hours = Math.floor((disDt % _day) / _hour);
        let minutes = Math.floor((disDt % _hour) / _minute);
        let seconds = Math.floor((disDt % _minute) / _second);

        document.getElementById(id).textContent =days + '일 ' + hours + "시간 " + minutes + '분' + seconds + '초';
        

    },1000);
//    setInterval(showTimer, 10000);
//    console.log("재실행")
    
}

function dateCalcul(){
    // let date = new Date();
    let sdate = new Date(2022,04,08);

    let syear = sdate.getFullYear();
    let smonth = sdate.getMonth();
    let sday = sdate.getDate();
    console.log(sdate, syear, smonth, sday);
    
    
    document.getElementById('start-day').textContent = syear+'년 '+smonth+'월 '+sday + '일 ';
    let today = new Date();
    console.log(today);
    let edate = new Date(sdate.setDate(sdate.getDate()+100));
    console.log(edate);
    let eyear = edate.getFullYear();
    let emonth = edate.getMonth();
    let eday = edate.getDate();
    document.getElementById('end-day').textContent = eyear+'년 '+emonth+'월 '+eday + '일';

}
countDownTimer('todo-date','04/01/2024');
dateCalcul();