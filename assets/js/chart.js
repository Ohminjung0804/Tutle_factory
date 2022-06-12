
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

// bubble chart
function quandrants_chart(){
   // setup 
   const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'Weekly Sales',
        data: [
            {x: 3, y: 3, r: 3},
            {x: -3, y: 3, r: 6},
            {x: 3, y: -3, r: 3},
            {x: 6, y: 6, r: 3},
            {x: -6, y: -6, r: 3},
            {x: 6, y: 3, r: 3},
            {x: 3, y: 3, r: 3},
        ],
        backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 2
    }]
    };

    //quadrant plugin block
    const quadrant = {
        id: 'quadrant',
        beforeDatasetsDraw(chart, args, pluginOptions){
            console.log(chart);
            const { ctx, chartArea: { top, buttom, left, right}, scales: {x,y}} = chart;

            ctx.save();

            quadrant(-6, 6, 0, 0, 'rgba(255, 206, 86, 1)');
            quadrant(0, 0, 0, 0, 'rgba(54, 162, 235, 1)');
            quadrant(0, 6, 0, 0, 'rgba(255, 26, 104, 1)');
            quadrant(-6, 0, 0, 0, 'rgba(153, 102, 255, 1)');
            function quadrant(xleft, ytop, xright, ybottom, color){
                ctx.lineWidth = '5px';
                ctx.strokeStyle = color;
                ctx.strokeRect(x.getPixelForValue(xleft), y.getPixelForValue(ytop),x.getPixelForValue(xright) - left, y.getPixelForValue(ybottom)-top);
                ctx.restore();
            }
            
        }
    }
    
    // config 
    const config = {
    type: 'bubble',
    data,
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    },
    plugins: [quadrant]
    };

    // render init block
    const myChart = new Chart(
    document.getElementById('myChart'),
    config
    );
}
circle_chart();
quandrants_chart();