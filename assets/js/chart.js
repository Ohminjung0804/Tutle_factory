"use strict";

let today = [];
let best = [];
let worst = [];
let isShow = false;
let stretchs = [];

// 해당 유저 날짜 스트레칭 조회
let user_day_cure = function (date) {
  $(document).ready(function () {
    $.ajax({
      type: "GET",
      url: `http://3.94.248.115/cure/date?user_email=${localStorage.getItem('key')}&date=${date}`,

      //전달할 때 사용되는 파라미터 변수명
      // 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
      success: function (data, textStatus, jqXHR) {
        stretchs = data; // 전역변수 생성
        // console.log(JSON.parse(data[0]));
        // console.log(JSON.parse(data[0]));
        chart_data(); // 차트 데이터 넣기 
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

// 오늘 날짜 구하기
function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}
// function circle_chart(){
//     let num1 = 2478;
//     new Chart(document.getElementById("pie-chart"), {
//         type: 'pie',
//         data: {
//         labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
//         datasets: [{
//             label: "Population (millions)",
//             backgroundColor: ["#77AA67", "#A8E3A3","#BFD8B7","#98C7B2","#4E7A5D"],
//             data: [num1,5267,734,784,433]
//         }]
//         },
//         options: {
//         title: {
//             display: true,
//             text: '시간대별 스트레칭 분석'
//         }
//         }
//     });
// }

//line chart
// function line_chart(){

//     // setup 
//     const data = {
//         labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//         datasets: [{
//           label: 'Weekly Sales',
//           data: [10, 8, 6, 9, 12, 3, 9],
//           backgroundColor: 'rgba(255, 26, 104, 0.2)',
//           borderColor: 'rgba(255, 26, 104, 1)',
//           borderWidth : 1,
//           tension:0.2
//         }]
//       };

//       // config 
//       const config = {
//         type: 'line',
//         data,
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         },
//       };

//       // render init block
//       const myChart = new Chart(
//         document.getElementById('myChart'),
//         config
//       );
// }
// function line_chart(){
//   // setup 
//   const data = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//     datasets: [{
//       label: 'Weekly Sales',
//       data: [18, 12, 6, 9, 12, 3, 9],
//       backgroundColor: [
//         'rgba(255, 26, 104, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//         'rgba(0, 0, 0, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 26, 104, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//         'rgba(0, 0, 0, 1)'
//       ],
//       borderWidth: 1
//     }]
//   };

//   // config 
//   const config = {
//     type: 'bar',
//     data,
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   };

//   // render init block
//   const myChart = new Chart(
//     document.getElementById('myChart'),
//     config
//   );
// }
function line_chart(today, best) {
  // setup 
  const data = {
    labels: ['도리도리', '앞뒤운동', '으쓱으쓱'],
    datasets: [{
      label: '오늘의 최고기록',
      data: best,
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
      ],
      type: 'line',
      order: 1,
    }, {
      type: 'bar',
      label: '오늘의 누적 개수',
      data: today,
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
      order: 2,
    }, ]
  };

  // config 
  const config = {
    data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // render init block
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

}


// 차트에 데이터 넣기 : 몇번 시도했는지, 이름
function chart_data() {
  let one = stretchs.filter(data => data.stretch == 1).map((data) => data.status);
  let two = stretchs.filter(data => data.stretch == 2).map((data) => data.status);
  let three = stretchs.filter(data => data.stretch == 3).map((data) => data.status);

  let summing = function (arr) {
    const sum = arr.reduce((partialSum, a) => partialSum + a, 0);
    return sum;
  }
  let maxing = function (arr) {
    let max = 0;
    arr.forEach(element => {
      if (max < element) {
        max = element;
      }
    });
    return max;
  };
  let mining = function (arr) {
    let min = arr[0] ? arr[0] : 0;
    arr.forEach(element => {
      if (min > element) {
        min = element;
      }
    });
    return min;
  }

  today = [summing(one), summing(two), summing(three)];
  best = [maxing(one), maxing(two), maxing(three)];
  worst = [mining(one), mining(two), mining(three)];
  line_chart(today, best);


  // let two = stretchs.filter((num, index, arr) => {
  //     console.log(num, index, arr)
  // })

  // let three = numbers.filter((num, index, arr) => {
  //     console.log(num, index, arr)
  // })
  // console.log(one,two,three);

}

// circle_chart();

let thisday = getToday();
user_day_cure(thisday);

var imgArray = new Array();
imgArray[0] = "https://img.youtube.com/vi/kgCj8UUEWjU/maxresdefault.jpg"; //사진
imgArray[1] = "https://img.youtube.com/vi/uGJRHfbemfo/maxresdefault.jpg"; //사진
imgArray[2] = "https://img.youtube.com/vi/84TJMVEXTCg/maxresdefault.jpg"; //사진
imgArray[3] = "https://img.youtube.com/vi/UqNKsiNUrxM/maxresdefault.jpg"; //사진

var imglink = new Array();
imglink[0] = "https://www.youtube.com/watch?v=kgCj8UUEWjU"; //사진
imglink[1] = "https://www.youtube.com/watch?v=uGJRHfbemfo&t=1s"; //사진
imglink[2] = "https://www.youtube.com/watch?v=84TJMVEXTCg"; //사진
imglink[3] = "https://www.youtube.com/watch?v=UqNKsiNUrxM"; //사진

function show() {
  let tryNum = stretchs.length; // 전체 시도한 횟수
  let userName = getCookie('name'); // 유저 이름

  document.getElementById("asdf").style.display = '';

  var result = document.getElementById('result-container');
  var first = '';
  var start = '';
  var end = `오늘도 열심히 활동하는 ${userName}님! 멋져요`;
  var max = 0;
  var min = 0;

  if (tryNum <= 2 ){
    start = '조금만 더 힘을 내는 거북이가 됩시다!<br> ' + userName + '님은 스트레칭을 총 ' + tryNum + '번 진행했어요!<br>오늘은 ';

    if (best[0] >= best[1] && best[0] >= best[2]){
      first = start + '목의 앞,뒤,옆 근육의 긴장을 풀어주는 도리도리 운동을 가장 많이 했어요!<br>';

    } else if(best[1] >= best[0] && best[1] >= best[2]){
      first = start + '목 뼈를 유연하게 하고 목 근육을 풀어주는 앞뒤 운동을 가장 많이 했어요!<br>';
      

    } else if(best[2] >= best[0] && best[2] >= best[1]){
      first = start + '어깨에 힘을 빼고 목을 가볍게 풀어주는 으쓱으쓱 운동을 가장 많이 했어요!<br>';
      
    }

    if(worst[0] <= worst[1] && worst[0] <= worst[2]){
      end = first + worst[0] + '반면에 도리도리 운동을 가장 적게했군요!<br>도리도리 운동은 목의 앞,뒤,옆에 있는 근육들의 긴장을 모두 풀어줘요!<br>같이 도리도리 운동을 해봅시다!<br>아래 이미지를 클릭해 새로운 스트레칭을 배워보아요!';
      
    } else if(worst[1] <= worst[0] && worst[1] <= worst[2]){
      end = first + '반면에 앞뒤 운동을 가장 적게했군요!<br>앞뒤 운동은 목 뼈를 유연하게 하고 목 근육을 풀어줘요!<br>앞뒤 운동은 같이 해봅시다!<br>아래 이미지를 클릭해 새로운 스트레칭을 배워보아요!';
      
    } else if(worst[2] <= worst[0] && worst[2] <= worst[1]){
      end = first + '반면에 으쓱으쓱 운동을 가장 적게했군요!<br>으쓱으쓱 운동은 어깨에 힘을 빼고 가볍게 진행하면 돼요!<br>으쓱으쓱 운동을 같이 해봅시다!<br>아래 이미지를 클릭해 새로운 스트레칭을 배워보아요!';
      
    }
  } else if (tryNum <= 4){    
    start = '성장하고 있는 거북이군요!<br> ' + userName + '님은 스트레칭을 총 ' + tryNum + '번 진행했어요!<br>오늘은 ';

    if (best[0] >= best[1] && best[0] >= best[2]){
      first = start + '도리도리 운동을 가장 많이 했어요!<br>간단해보이지만 꾸준히 하면 목의 근육을 풀어주는 좋은 효과가 있어요!<br>';

    } else if(best[1] >= best[0] && best[1] >= best[2]){
      first = start + '앞뒤 운동을 가장 많이 했어요!<br>목을 앞뒤로 열심히 젖히다 보면 거북목이 나아질거에요!<br>';
      

    } else if(best[2] >= best[0] && best[2] >= best[1]){
      first = start + '으쓱으쓱 운동을 가장 많이 했어요!<br>어깨를 으쓱으쓱! 가볍게 흔들어 뭉친 어깨를 풀어보아요!<br>';
      
    }

    if(worst[0] <= worst[1] && worst[0] <= worst[2]){
      end = first + '도리도리 운동을 가장 적게했군요!<br>도리도리 운동은 목의 앞,뒤,옆에 있는 근육들의 긴장을 모두 풀어줘요!<br>다시 한번 해봅시다!<br>아래 이미지를 클릭해 새로운 스트레칭을 배워보아요!';
      
    } else if(worst[1] <= worst[0] && worst[1] <= worst[2]){
      end = first + '앞뒤 운동을 가장 적게했군요!<br> 생각보다 어려운 앞뒤 운동! 꾸준히 해서 목 뼈를 유연하게 만들어봐요!<br>다시 한번 해봅시다!<br>아래 이미지를 클릭해 새로운 스트레칭을 배워보아요!';
      
    } else if(worst[2] <= worst[0] && worst[2] <= worst[1]){
      end = first + '으쓱으쓱 운동을 가장 적게했군요!<br>으쓱으쓱 운동은 간단하고 효과 좋은 스트레칭이에요!<br>다시 한번 해봅시다!<br>아래 이미지를 클릭해 새로운 스트레칭을 배워보아요!';
      
    }


  } else if(tryNum >= 5) {

    start = '거북이가 아니라 사람일지도..?!<br> ' + userName + '님은 스트레칭을 총 ' + tryNum + '번 진행했어요!<br>오늘은 ';
    
    if (best[0] >= best[1] && best[0] >= best[2]){
      first = start + '도리도리 운동을 가장 많이 했군요!<br> 도리도리 운동쯤은 이제 껌이죠?!<br> 진짜 거북이를 벗어날 때까지 꾸준히 해봐요!<br>';

    } else if(best[1] >= best[0] && best[1] >= best[2]){
      first = start + '앞뒤 운동을 가장 많이 했어요!<br>과도하게 끄덕이면 오히려 안좋아요!<br>적당히 천천히 고개를 끄덕여봐요!<br>';
      

    } else if(best[2] >= best[0] && best[2] >= best[1]){
      first = start + '으쓱으쓱 운동을 가장 많이 했어요!<br>이제 어깨가 아프지 않을거에요!<br>';
      
    }

    if(worst[0] <= worst[1] && worst[0] <= worst[2]){
      end = first + worst[0] + '이번에 도리도리 운동을 가장 적게했군요!<br>우둑우둑 소리가 나도록 하는 것을 잘 못된 방법이에요.<br>올바른 자세로 꾸준히 같이 해봐요!<br>아래 이미지를 클릭해 새로운 스트레칭을 배워보아요!';
      
    } else if(worst[1] <= worst[0] && worst[1] <= worst[2]){
      end = first + '이번에 앞뒤 운동을 가장 적게했군요!<br>앞뒤 운동은 허리를 목과 함께 곧게 피고 꾸준히!<br>또 같이 해요!<br>아래 이미지를 클릭해 새로운 스트레칭을 배워보아요!';
      
    } else if(worst[2] <= worst[0] && worst[2] <= worst[1]){
      end = first + '이번에 으쓱으쓱 운동을 가장 적게했군요!<br>으쓱으쓱 운동은 간단해 보여도 중요해요!<br>꾸준히 해봅시다!<br>아래 이미지를 클릭해 새로운 스트레칭을 배워보아요!';
      
    }

  }


  result.innerHTML = end;

  var imgNum = Math.round(Math.random() * 3);

  var recommend = document.getElementById('recommendsrc');
  var recommenda = document.getElementById('recommenda');
  recommend.src = imgArray[imgNum];
  recommenda.href = imglink[imgNum];

}