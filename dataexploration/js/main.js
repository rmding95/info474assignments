//average rating vs bayes average
//x: playtime vs y: rating
//x: players vs y: rating

$(function() {

	d3.csv('boardgames.csv', function(error, allData) {

		var xScale, yScale;

		//either playtime or players
		var xType = "playtime";
		//either average_rating or bayes_average_rating
		var yType = "average_rating";

		var margin = {
			left:70,
			bottom:100,
			top:50,
			right:50,
		};

		var height = 600 - margin.bottom - margin.top;
		var width = 1000 - margin.left - margin.right;

		//Creating the non-data elements of the graph
		var svg = d3.select('#vis').append('svg')
									.attr('height', 600)
									.attr('width', 1000);

		var g = svg.append('g')
					.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
					.attr('height', height)
					.attr('width', width);

		var xAxisLabel = svg.append('g')
							.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
							.attr('class', 'axis');

		var yAxisLabel = svg.append('g')
							.attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')
							.attr('class', 'axis');

		var xAxisText = svg.append('text')
							.attr('transform', 'translate(' + (margin.left + width/2) + ',' + (height + margin.top + 40) + ')')
							.attr('class', 'title');

		var yAxisText = svg.append('text')
							.attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + height/2) + ') rotate(-90)')
							.attr('class', 'title');

		//Sets the scales based on the current selection
		var setScales = function(data) {
			var xMin;
			var xMax;

			if (xType == "playtime") {
				xMin = d3.min(data, function(d) {return +d.minplaytime});
				xMax = d3.max(data, function(d) {return +d.minplaytime});
			} else {
				xMin = d3.min(data, function(d) {return +d.maxplayers});
				xMax = d3.max(data, function(d) {return +d.maxplayers});
			}

			xScale = d3.scale.linear().range([0, width]).domain([xMin, xMax]);

			var yMin;
			var yMax;

			if (yType == "average_rating") {
				yMin = d3.min(data, function(d) {return +d.average_rating});
				yMax = d3.max(data, function(d) {return +d.average_rating});
			} else {
				yMin = d3.min(data, function(d) {return +d.bayes_average_rating});
				yMax = d3.max(data, function(d) {return +d.bayes_average_rating});
			}

			yScale = d3.scale.linear().range([height, 0]).domain([yMin, yMax]);
		}

		//Sets the axes
		var setAxes = function() {
			var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
			var yAxis = d3.svg.axis().scale(yScale).orient('left').tickFormat(d3.format('.2s'));

			xAxisLabel.transition().duration(1500).call(xAxis);
			yAxisLabel.transition().duration(1500).call(yAxis);

			if (xType == "playtime") {
				xAxisText.text("Maximum Playtime");
			} else {
				xAxisText.text("Max Number of Players");
			}
			yAxisText.text(yType + ' (Out of 10)');
		}

		//Performs the data join and draws the currently selected data
		var draw = function(data) {
			setScales(data);
			setAxes();

			var circles = g.selectAll('circle').data(data);

			circles.enter().append('circle')
					.attr('r', 3)
					.attr('fill', 'blue')
					.attr('cy', height)
					.attr('class', 'circles')
					.style('opacity', 0.7)
					.attr('title', function(d) {return d.name});

			circles.exit().remove();

			circles.transition()
					.duration(1500)
					.attr('r', 3)
					.attr('fill', 'blue')
					.attr('cx', function(d) {
						if (xType == 'playtime') {
							return xScale(d.minplaytime);
						} else {
							return xScale(d.maxplayers);
						}
					})
					.attr('cy', function(d) {
						if (yType == 'average_rating') {
							return yScale(d.average_rating);
						} else {
							return yScale(d.bayes_average_rating);
						}
					})
					.attr('title', function(d) {return d.name});
		}

		//Updates what data to display based on the button the user clicks
		$("input").on('change', function() {
			console.log(this);
			var val = $(this).val();
			console.log(val);
			var isRating = $(this).hasClass('rating');
			if (isRating) {
				yType = val;
			} else {
				xType = val;
			}

			draw(allData);
		})

		draw(allData);

	});
});