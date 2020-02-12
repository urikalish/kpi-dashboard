function octaneReleaseStatusChart(releaseData) {
    releaseStatusChart(releaseData, 'octaneReleaseChart');
}

function octaneDefectStatusChart(defectData) {
    let dtx = document.getElementById('octaneDefectChart');
    new Chart(dtx, {
        type: 'line',
        data: {
            labels: defectData.labels,
            datasets: [{
                label: 'Unknown',
                backgroundColor: '#BDBEC0',
                borderColor: '#BDBEC0',
                pointRadius: 0,
                pointHoverRadius: 4,
                data: defectData.unknown
            }, {
                label: 'Low',
                backgroundColor: '#FCDB1F',
                borderColor: '#FCDB1F',
                pointRadius: 0,
                pointHoverRadius: 4,
                data: defectData.low
            }, {
                label: 'Medium',
                backgroundColor: '#FFB24D',
                borderColor: '#FFB24D',
                pointRadius: 0,
                pointHoverRadius: 4,
                data: defectData.medium
            }, {
                label: 'High',
                backgroundColor: '#FF454F',
                borderColor: '#FF454F',
                pointRadius: 0,
                pointHoverRadius: 4,
                data: defectData.high
            }, {
                label: 'Critical',
                backgroundColor: '#B21646',
                borderColor: '#B21646',
                pointRadius: 0,
                pointHoverRadius: 4,
                data: defectData.critical
            }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
	        legend: {
		        position: 'right',
		        labels: {
			        fontColor: '#FFF',
			        fontFamily: 'Play, Helvetica, Arial, sans-serif',
			        padding: 10,
			        boxWidth: 20,
		        },
	        },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'week',
                        displayFormats: {
                            week: 'MMM D'
                        }
                    },
                    gridLines: {
                        display: false,
	                    color: '#ddd',
                    },
	                ticks: {
		                fontColor: '#ccc',
		                fontFamily: 'Play, Helvetica, Arial, sans-serif',
	                },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date (Month, Day)',
	                    fontSize: 14,
	                    fontColor: '#FFF',
	                    fontFamily: 'Play, Helvetica, Arial, sans-serif',
                    }
                }],
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: false,
	                    color: '#ccc',
                    },
                    ticks: {
                        stepSize: 100,
                        beginAtZero: true,
	                    fontColor: '#ccc',
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Defects',
                        fontSize: 14,
	                    fontColor: '#FFF',
	                    fontFamily: 'Play, Helvetica, Arial, sans-serif',
                    }
                }]
            }
        }
    });
}