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
      url: `http://107.21.77.37/cure/date?user_email=${localStorage.getItem('key')}&date=${date}`,

      //전달할 때 사용되는 파라미터 변수명
      // 이 속성을 생략하면 callback 파라미터 변수명으로 전달된다.
      success: function (data, textStatus, jqXHR) {
        console.log('success');
        stretchs = data; // 전역변수 생성
        // console.log(JSON.parse(data[0]));
        console.log(stretchs)
        // console.log(JSON.parse(data[0]));
        chart_data(); // 차트 데이터 넣기 
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


// 차트에 데이터 넣기
function chart_data() {
  console.log("chart")
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
console.log(thisday);
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
  document.getElementById("asdf").style.display = '';

  var result = document.getElementById('result-container');

  if (best[0]) {
    result.innerHTML = '도리도리 운동을 가장 많이 하셨군요!<br>목의 앞,뒤,옆에 있는 근육들의 긴장을 모두 풀어줍니다!<br>허리를 반듯하게 펴서 틈틈히 앞으로도 화이팅!';
  } else if(best[1]) {
    result.innerHTML = '끄덕이기 운동을 가장 많이 하셨군요!<br>과도한 스트레칭은 목이 아파요!<br>목 뼈를 유연하게 하고 목 근육을 풀어줘요!<br>허리를와 목을 곧게 피고 앞으로도 꾸준히!';
  } else if(best[2]) {
    result.innerHTML = '으쓱으쓱 운동을 가장 많이 하셨군요!<br>목에 힘을 빼고 가볍게 흔들어요!<br>우두둑 소리가 나도록 스트레칭 하는 것은 잘못된 방법이에요!<br>고개를 살짝 들고 가볍게 앞으로도 도리도리!';
  }

  // if(worst[1]){
  //   result.innerHTML = '도리도리 운동을 보다 적게 하셨군요!'
  // }

  console.log(best);
  console.log(worst);


  // if(best[0] < 5 && best[1])

  var imgNum = Math.round(Math.random() * 3);

  var recommend = document.getElementById('recommendsrc');
  var recommenda = document.getElementById('recommenda');
  recommend.src = imgArray[imgNum];
  recommenda.href = imglink[imgNum];

  // console.log('best', best);
  // console.log('worst', worst);
  // console.log('호출됨')

}