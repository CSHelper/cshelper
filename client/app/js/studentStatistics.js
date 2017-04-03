function loadStudentStatistics(){
	//Time Graph
	Highcharts.chart('time-graph', {
	    chart: {
	        type: 'area'
	    },
	    title: {
	        text: ''
	    },
	    subtitle: {
	        text: ''
	    },
	    xAxis: {
	        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	        tickmarkPlacement: 'on',
	        title: {
	            enabled: false
	        }
	    },
	    yAxis: {
	        title: {
	            text: 'Number of Problems'
	        },
	        labels: {
	            formatter: function () {
	                return this.value ;
	            }
	        }
	    },
	    tooltip: {
	        split: true,
	        valueSuffix: ' problems'
	    },
	    plotOptions: {
	        area: {
	            stacking: 'normal',
	            lineColor: '#666666',
	            lineWidth: 1,
	            marker: {
	                lineWidth: 1,
	                lineColor: '#666666'
	            }
	        }
	    },
	    series: [{
	        name: 'In Progress',
	        data: [3, 2, 1, 1, 2, 3, 0, 0, 2, 1, 0, 1]
	    }, {
	        name: 'Failed',
	        data: [1, 2, 2, 4, 7, 8, 9, 7, 0, 2, 5, 5]
	    }, {
	        name: 'Completed',
	        data: [1, 2, 3, 3, 1, 0, 1, 1, 0, 0, 3, 3]
	    }]
	});




	// Pie chart
	Highcharts.chart('pie-chart', {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: 'Problems',
			colorByPoint: true,
			data: [{
				name: 'In Progress',
				y: 60
			}, {
				name: 'Failed',
				y: 10,
				sliced: true,
				selected: true
			}, {
				name: 'Completed',
				y: 30
			}]
		}]
	});
}