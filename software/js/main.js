$(function() {

	d3.csv('data/prepped_data.csv', function(error, data) {

		var myChart = TreemapChart().nestedElement("region").measure("fertility_rate").elementText("country_code").width(1000).height(500).colorScale("category10").ratio(3);

		var div = d3.select("#vis").datum(data).call(myChart);
	});
});