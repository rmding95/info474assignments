var TreemapChart = function() {

	var nestedElement; //element in the data to be nested
	var measure; //variable to visualize
	var elementText; //text variable name
	var padding = 0;
	var mode = "squarify";
	var ratio = .5 * (1 + Math.sqrt(5));

	var margin = {top: 40, right: 10, bottom: 10, left: 10},
		    width = 960 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

	var colorScale = "category10";

	var chart = function(selection) {
		var color = d3.scale[colorScale]();

		var position = function() {
			// Set the position of each div using the properties computed from the treemap function
			this.style("left", function(d,i) {return d.x + "px"; })
					.style("top", function(d) { return d.y + "px"; })
					.style('width', function(d){return d.dx + 'px'})
					.style("height", function(d) { return d.dy + "px"; })
					.style("background", function(d) {return !d.values ? color(d.region) : null; })
		}

		selection.each(function(data) {
			var div = d3.select(this)
						.append("div")
						.attr('height', 600)
						.attr('width', 600)
						.style("left", margin.left + "px")
						.style("top", margin.top + "px");

			var nestedData = d3.nest()
								.key(function(d) {return d[nestedElement];})
								.entries(data);

			var treemap = d3.layout.treemap()
							.size([width, height])
							.sticky(true)
							.padding(padding)
							.mode(mode)
							.ratio(ratio)
							.value(function(d) {return d[measure];})
							.children(function(d) {return d.values;});

			var nodes = div.selectAll(".node").data(treemap.nodes({values:nestedData}));

			nodes.enter().append("div")
							.text(function(d) {return d[elementText];})
							.attr('class', 'node')
							.call(position);

			nodes.transition().duration(500).call(position);
		});
	}

	chart.nestedElement = function(value) {
		if (!arguments.length) return nestedElement;
    	nestedElement = value;
    	return this;
	}

	chart.measure = function(value) {
		if (!arguments.length) return measure;
    	measure = value;
    	return this;
	}

	chart.elementText = function(value) {
		if (!arguments.length) return elementText;
    	elementText = value;
    	return this;
	}

	chart.colorScale = function(value) {
		if (!arguments.length) return colorScale;
		colorScale = value;
		return this;
	}

	chart.width = function(value) {
		if (!arguments.length) return width;
		width = value;
		return this;
	}

	chart.height = function(value) {
		if (!arguments.length) return height;
		height = value;
		return this;
	}

	chart.padding = function(value) {
		if (!arguments.length) return padding;
		padding = value;
		return this;
	}

	chart.mode = function(value) {
		if (!arguments.length) return mode;
		mode = value;
		return this;
	}

	chart.ratio = function(value) {
		if (!arguments.length) return ratio;
		ratio = value;
		return this;
	}

	return chart;
}