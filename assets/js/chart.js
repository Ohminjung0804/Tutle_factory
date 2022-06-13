
function circle_chart(){
    let num1 = 2478;
    new Chart(document.getElementById("pie-chart"), {
        type: 'pie',
        data: {
        labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
        datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#77AA67", "#A8E3A3","#BFD8B7","#98C7B2","#4E7A5D"],
            data: [num1,5267,734,784,433]
        }]
        },
        options: {
        title: {
            display: true,
            text: '시간대별 스트레칭 분석'
        }
        }
    });
}

//line chart
function line_chart(){

    // setup 
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Weekly Sales',
          data: [10, 8, 6, 9, 12, 3, 9],
          backgroundColor: 'rgba(255, 26, 104, 0.2)',
          borderColor: 'rgba(255, 26, 104, 1)',
          borderWidth : 1,
          tension:0.2
        }]
      };
  
      // config 
      const config = {
        type: 'line',
        data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      };
  
      // render init block
      const myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
}
circle_chart();
line_chart();