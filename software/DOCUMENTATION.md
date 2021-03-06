# TreemapChart.js API Reference

Easily configurable D3 Treemap Chart

## Usage

First get a data file where the data is structured in a natural hierarchy. For example, in module 9 we had a file where the natural heirarchy was every country having a parent region. Load this file using the csv d3 function. Should look something like this: 

```javascript
d3.csv('data/prepped_data.csv', function(error, data) {}.
```

Then create an instance of the Treemap chart like this:

```javascript
var mychart = TreemapChart()
```

Then load your data into the chart and draw it!

```javascript
var div = d3.select("#vis")datum(data).call(mychart) 
```

This will draw the treemap in the selected div with default parameters. For a list of configurable parameters, check the API parameters section below this.

## API Parameters

These parameters can be changed by calling the below functions on your TreemapChart instance (called mychart in the example above) like this:

```javascript
var myChart = TreemapChart().nestedElement("region").measure("fertility_rate").elementText("country_code");
```

**Three parameters of the Treemap Chart are essential to set for a functional chart: nestedElement, measure, and elementText.**

\# *chart.nestedElement*(value)

> Sets the heirarchy of the data and tells the treemap chart which variable to nest. This will group your data into a hierarchial tree structure based off the value you give. Going off the previous country example, you would structure your data off region.

\# *chart.measure*(value)

> Tells the chart what variable to get the numeric values of each node from. In the country example, we visualized the variable fertility_rate.

\# *chart.elementText*(value)

> Tells the chart what text each node should have. In the country example, we displayed the country_code in each node.

\# *chart.colorScale*(value)

> Sets the color scale for the chart. You have to specify a specific string for this to work, the choices are:
- category10 **(DEFAULT)**
- category20
- category20b
- category20c

See [this] (https://github.com/mbostock/d3/wiki/Ordinal-Scales#categorical-colors) for more information about categorical color scales.

\# *chart.width*(value) 

> Sets the width of the chart in px.

\# *chart.height*(value) 

> Sets the height of the chart in px.

\# *chart.padding*(value)

> Sets the amount of padding around each group of elements. Default is 0, and I wouldn't recommend any values larger than 5.

\# *chart.mode*(value)

> Lets you set the way nodes are arranged in the treemap. Would not recommend changing this value, but options are below:
- squarify: rectangular subdivision and the **default** setting
- slice: horizontal subdivision
- dice: vertical subdivision
- slice-dice: alternating between horizontal and vertical subdivision

\# *chart.ratio*(value)

> Lets you change the ratio value that determines node layout. Default value is around 1.61. 