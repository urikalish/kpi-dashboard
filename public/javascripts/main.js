const productIds = ['octane', 'alm', 'uftMobile', 'lre', 'lrp', 'lrc', 'srl', 'ppm', 'lrproto'];

function showCards() {
	const elm = document.getElementById('cards-container');
	if (elm) {
		elm.classList.remove('hidden');
	}
}
function hideCards() {
	const elm = document.getElementById('cards-container');
	if (elm) {
		elm.classList.add('hidden');
	}
}

function showCharts() {
	const chartsContainerElm = document.getElementById('charts-container');
	if (chartsContainerElm) {
		chartsContainerElm.classList.remove('hidden');
	}
}
function hideCharts() {
	const chartsContainerElm = document.getElementById('charts-container');
	if (chartsContainerElm) {
		chartsContainerElm.classList.add('hidden');
	}
}

function unSelectAllProducts() {
	productIds.forEach(p => {
		const cellElm = document.getElementById(p);
		if (cellElm) {
			cellElm.classList.remove('cell-selected');
		}
	});
	productIds.forEach(p => {
		const chartsElm = document.getElementById(p + '-section');
		if (chartsElm) {
			chartsElm.classList.remove('product-section--selected');
		}
	});
}

function selectProduct(elm) {
	unSelectAllProducts();
    const productId = elm.id;
    elm.classList.add('cell-selected');
    const selectedChartsElm = document.getElementById(productId + '-section');
    if (selectedChartsElm) {
        selectedChartsElm.classList.add('product-section--selected');
    }
	hideCards();
	showCharts();
}

function exitProduct() {
	unSelectAllProducts();
	hideCharts();
	showCards();
}

function releaseStatusChart(releaseData, elementId) {
    let ctx = document.getElementById(elementId);
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: releaseData.labels,
            datasets: [{
                label: 'Expected',
                backgroundColor: '#999',
                borderColor: '#999',
                fill: false,
                pointRadius: 0,
                pointHoverRadius: 4,
                data: releaseData.expected
            }, {
                label: 'Actual',
                backgroundColor: '#00abf3',
                borderColor: '#00abf3',
                fill: false,
                pointRadius: 0,
                pointHoverRadius: 4,
                data: releaseData.done
            }, {
                label: 'Scope',
                backgroundColor: '#303F9F',
                borderColor: '#303F9F',
                fill: false,
                pointRadius: 0,
                pointHoverRadius: 4,
                data: releaseData.scope
            }, {
                label: 'Tolerance',
                backgroundColor: '#B21646',
                borderColor: '#B21646',
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0,
                pointHoverRadius: 4,
                data: releaseData.tolerance
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
                    },
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                        color: '#ccc',
                    },
                    ticks: {
                        stepSize: 500,
                        beginAtZero: true,
                        fontColor: '#ccc',
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Story Points',
                        fontSize: 14,
                        fontColor: '#FFF',
                        fontFamily: 'Play, Helvetica, Arial, sans-serif',
                    }
                }]
            }
        }
    });
}