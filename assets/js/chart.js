
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
function line_chart(today, total){
  // setup 
  const data = {
    labels: ['도리도리', '앞뒤운동', '으쓱으쓱'],
    datasets: [{
      label: '누적 개수',
      data: total,
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
      ],
      type: 'line',
      order : 1,
    },{
      type:'bar',
      label: '오늘 개수',
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
      order : 2,
    },]
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
// circle_chart();
let today=[4,5,6];
let total = [50,60,70]
line_chart(today,total);