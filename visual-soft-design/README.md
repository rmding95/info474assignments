# Reusable Pie Chart API Reference

The code enclosed in the main.js file will allow you to create pie charts with data of your choosing (well as long as it has the right amount of parameters).

<br>The methods allow for customization of the height, width, radius, and color range of a pie chart.  The category and category value parameters can be specified as well, which works great for using your own data!

***

## Usage

How to render the chart on the data:

```javascript

	//	Render the PieChart
	var myChart = PieChart();

	//	Initiate the chart
	var chartWrapper = d3.select('#my-div')
		.datum([dataSet])
		.call(myChart);
```

<br>How to update with new data:

```javascript

	myChart.param1(value);

	//	Re-call myChart function on chartWrapper
	chartWrapper.datum([dataSet]).call(myChart);

```

***

##	API Functions

Listed below are the methods that will allow for customization of a pie chart with data of your choosing.
<br><br>

\# *PieChart*()
> Constructs a PieChart object




\# *Chart*.**width**(number)
> Sets the current value of the width to `number` and returns the width.




\# *Chart*.**height**(number)
> Sets the current value of the height to `number` and returns the height.




\# *Chart*.**radius**(number)
> Sets the current value of the radius to `number` and returns the radius.





\# *Chart*.**colorRange**(array)
> Sets the current array of colorRange to `array` and returns the colorRange.  The `array` must be a set of colors.


```javascript
//	Example given:

	Chart.colorRange(['red','white','blue']);
```




\# *Chart*.**category**(string)
> Sets the current string of category to `string` and returns the category.  This will be the label of the pie slices.


```javascript
//	Example given:
	
	//	Test data
	var data = [
	{letter: 'U', size: 27}
	];

	Chart.category('letter');
```




\# *Chart*.**category_range**(string)
> Sets the current string of category_range to `string` and returns the category_range.  This will be the value contained in the pie slices.


```javascript
//	Example given:

	//	Test data
	var data = [
	{letter: 'U', size: 27}
	];

	Chart.category_range('size');
```