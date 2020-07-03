//Make connection between client side and server side websocket
var socket = io.connect("http://localhost:4000");

//Query DOM
var mq7 = document.getElementById('mq7-value');
var mq7Time = document.getElementById('mq7-time');


var oldData1 = [];//[0, 10, 20, 30, 40, 50, 60, 70, 80, 100]; //chart dataset 1 current data
var newData1 = [10, 20, 30, 42, 50, 60, 70]; //chart dataset 1 new data
var oldLabel = [];

var ctx = document.getElementById('myChart').getContext('2d'); //get the chart holder from canvas tag in html
var chart = new Chart(ctx, { //make ne chart
    type: 'line', //chart type
    data: {
        labels: oldLabel, //labels
        datasets: [{
            label: 'CO2 Concentration in ppm', //dataset 1 legenda
            data: oldData1,
            backgroundColor: ['rgba(42, 106, 255, 0.5)'],
            borderColor: [
                'rgb(13, 26, 120)'
            ],
            borderWidth: 1
        },
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});



function addValue(data) {
    //add sensor value to chart
    chart.data.labels.push(data[1]); //pushing current time to chart
    chart.data.datasets[0].data.push(data[0]); //pushing current sensor value to chart
    chart.update();


}

function removeValue() {
    chart.data.labels.shift(); //shifting hide first value of time from the chart
    chart.data.datasets[0].data.shift(); //shifting first oldest value of sensor value from teh chart
    chart.update();
};

var counter = 0; //chart dataset update counter

socket.on('mq7', function (data) {
    //get the sensor and time value from server websocket


    addValue(data); //add value to chart

    mq7.innerHTML = data[0]; //display current sensor value to inner html
    mq7Time.innerHTML = data[1]; //display current time to inner html

    counter = counter + 1;
    if (counter > 15) {
        //shift hide the first value if 15 data already exist in the chart
        removeValue();
    }
 
});
