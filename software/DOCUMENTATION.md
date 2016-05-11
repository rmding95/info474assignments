# TreemapChart.js API Reference

Easily configurable D3 Treemap Chart

## Usage

First get a data file where the data is structured in a natural hierarchy. For example, in module 9 we had a file where the natural heirarchy was every country having a parent region. Load this file using the csv d3 function. Should look something like this: d3.csv('data/prepped_data.csv', function(error, data) {}.

Then create an instance of the Treemap chart like this:

'''javascript
var mychart = TreemapChart()
'''

Then load your data into the chart and draw it!
var div = d3.select("#vis")datum(data).call(mychart) 

This will draw the treemap in the selected div with default parameters. For a list of configurable parameters, check the API parameters section below this.

## API Parameters

These parameters can be changed by calling the below functions on your TreemapChart instance (called mychart in the example above) like this:
var myChart = TreemapChart().nestedElement("region").measure("fertility_rate").elementText("country_code");

**Three parameters of the Treemap Chart are essential to set for a functional chart: nestedElement, measure, and elementText.**

\# *chart.nestedElement*(value)

> Sets the heirarchy of the data and tells the treemap chart which variable to nest. This 