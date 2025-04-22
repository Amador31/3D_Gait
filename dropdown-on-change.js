//import {graph-config} from "js/graph-config.js";
let myChart = null;

// Get the select element
const dropdown = document.querySelector('select[name="dropDown"]');

// Add event listener for changes
dropdown.addEventListener('change', function(event) {
    const selectedValue = event.target.value;
    // const getVal = document.getElementById();

    switch(selectedValue) {
        case 'Gait Speed':
            displayGaitSpeedGraph();
            break;
        case 'Stride Length':
            displayStrideLengthGraph();
            break;
        case 'Symmetry':
            displaySymmetryGraph();
            break;
        case 'Foot Clearance':
            displayFootClearanceGraph();
            break;
        default:
            // Handle default case when no option is selected
            clearGraph();
    }
});

// Example functions to handle each selection

function createChart(config){
    if (myChart) {
        myChart.destroy();
    }

    // Get the canvas context and create new chart
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, config);
}

//put arg in here
function showBarChart() {
    const config = {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
            datasets: [{
                label: 'Bar Chart Data',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ]
            }]
        }
    };
    createChart(config);
}

//put arg in here
function showLineChart() {
    const config = {
        type: 'line',
        data: {
            labels: ['10:00:00am', '10:00:10am', '10:02:20am', '10:00:30am', '10:00:40am'],
            datasets: [{
                label: 'Gait Speed m/s',
                data: [1.2, 1, 1.25, 1.2, 1.28],
                borderColor: 'rgb(75, 192, 192)',
                tension: .5
            }]
        }
    };
    createChart(config);
}

function displayGaitSpeedGraph() {
    const title = 'Gait Speed';
    // we can set the name on
    console.log(title);
    showLineChart();
    // Add your graph rendering logic here
}

function displayStrideLengthGraph() {
    const title = 'Stride Length';
    console.log(title);
    showBarChart();
    // Add your graph rendering logic here
}

function displaySymmetryGraph() {
    const title = 'Symmetry';
    console.log(title);
    showLineChart();
    // Add your graph rendering logic here
}

function displayFootClearanceGraph() {
    const title = 'Foot Clearance';
    console.log(title);
    showBarChart();
    // Add your graph rendering logic here
}

function clearGraph() {
    console.log('Clearing graph display');
    // Add logic to clear/reset the graph area
