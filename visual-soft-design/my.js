

d3.csv('data.csv', function(error, data) {
	console.log(data);
	var myChart = PieChart().category('name').category_values('age').width(1000).height(1000).colorRange(['red', 'green', 'blue']);
	var chartWrapper = d3.select("#vis").datum(data).call(myChart);
});

