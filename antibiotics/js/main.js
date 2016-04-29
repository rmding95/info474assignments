$(function() {

	d3.csv('data/antibiotics_data.csv', function(error, data) {
		console.log(data);

		function unpack(rows, key) {
			return rows.map(function(row) {return row[key];});
		}

		console.log(unpack(data, 'Penicilin'));
		var bacteriaData = unpack(data, 'Bacteria');
		var penicilinData = unpack(data, 'Penicilin').map(Number);
		var strepData = unpack(data, 'Streptomycin').map(Number);
		var neoData = unpack(data, 'Neomycin').map(Number);
		var gramData = unpack(data, 'Gram Staining');

		var vis1PenicilinData = penicilinData;
		var vis1StrepData = strepData;
		var vis1NeoData = neoData;

		for (var i = 0; i < bacteriaData.length; i++) {
			var max = Math.max(neoData[i], penicilinData[i], strepData[i]);
			vis1NeoData[i] = max / vis1NeoData[i];
			vis1PenicilinData[i] = max / vis1PenicilinData[i];
			vis1StrepData[i] = max / vis1StrepData[i];
		}

		var trace1 = {
			x: bacteriaData,
			y: vis1PenicilinData,
			name: 'Penicilin',
			type: 'bar'
		};

		var trace2 = {
			x: bacteriaData,
			y: vis1StrepData,
			name: 'Streptomycin',
			type: 'bar'
		};

		var trace3 = {
			x: bacteriaData,
			y: vis1NeoData,
			name: 'Neomycin',
			type: 'bar'
		};

		var vis1 = [trace1, trace2, trace3];
		var layout = {
			title: 'Relative Antibiotic Effectiveness vs Various Bacteria',
			barmode: 'group',
			yaxis: {
				type: 'log',
				autorange: true
			}
		};

		Plotly.newPlot('v1', vis1, layout, {staticPlot: true});

		penicilinData = unpack(data, 'Penicilin').map(Number);
		strepData = unpack(data, 'Streptomycin').map(Number);
		neoData = unpack(data, 'Neomycin').map(Number);

		var vis2PenicilinData = [];
		var vis2StrepData = [];
		var vis2NeoData = [];

		var positiveCount = 0;
		var negativeCount = 0;

		var positivePenicilin = 0;
		var negativePenicilin = 0;
		var positiveStrep = 0;
		var negativeStrep = 0;
		var positiveNeo = 0;
		var negativeNeo = 0;

		for (var i = 0; i < bacteriaData.length; i++) {
			if (gramData[i] == "positive") {
				positiveCount++;
				positivePenicilin += penicilinData[i];
				positiveStrep += strepData[i];
				positiveNeo += neoData[i];
			} else {
				negativeCount++;
				negativePenicilin += penicilinData[i];
				negativeStrep += strepData[i];
				negativeNeo += neoData[i];
			}
		}

		vis2PenicilinData.push(positivePenicilin / positiveCount);
		vis2PenicilinData.push(negativePenicilin / negativeCount);
		vis2StrepData.push(positiveStrep / positiveCount);
		vis2StrepData.push(negativeStrep / negativeCount);
		vis2NeoData.push(positiveNeo / positiveCount);
		vis2NeoData.push(negativeNeo / negativeCount);

		var v2trace1 = {
			x: ['Positive', 'Negative'],
			y: vis2PenicilinData,
			name: 'Penicillin',
			type: 'bar'
		};

		var v2trace2 = {
			x: ['Positive', 'Negative'],
			y: vis2StrepData,
			name: 'Streptomycin',
			type: 'bar'
		};

		var v2trace3 = {
			x: ['Positive', 'Negative'],
			y: vis2NeoData,
			name: 'Neomycin',
			type: 'bar'
		};

		var vis2 = [v2trace1, v2trace2, v2trace3];

		var layout = {
			title: 'Average Amount of Antibiotic Needed Between Gram Positive and Gram Negative Bacteria',
			barmode: 'group',
			yaxis: {
				title: 'Average MIC',
				type: 'log',
				autorange: true
			}
		};

		Plotly.newPlot('v2', vis2, layout, {staticPlot: true});

		console.log(penicilinData);

		var v3trace1 = {
			x: penicilinData,
			type: 'box',
			name: 'Penicillin'
		};

		var v3trace2 = {
			x: strepData,
			type: 'box',
			name: 'Streptomycin'
		};

		var v3trace3 = {
			x: neoData,
			type: 'box',
			name: 'Neomycin'
		};

		var vis3 = [v3trace1, v3trace2, v3trace3];
		var layout = {
			title: 'Distribution of MIC For Each Antibiotic',
			xaxis: {
				type: 'log',	
				title: 'Minimum Inhibitory Concentration (MIC)'
			}
		};

		Plotly.newPlot('v3', vis3, layout, {staticPlot: true});
	});

});