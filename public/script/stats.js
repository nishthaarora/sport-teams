// getting the events for the teams selected
function getEventsForSelectedTeams() {
	var team1 = $('.team1').text();
	var team2 = $('.team2').text();
	$.get('events/api/all', function(eventData) {

		eventData = eventData.filter(function(event) {
			return isEventBetweenTeams(event, team1, team2) &&
				event.score1 !== null &&
				event.score !== null
		});
		if( eventData.length ) {
			drawChart(eventData);
		} else {
			$("#chart_div").html("No events exist");
		}

	})
}

function isEventBetweenTeams(event, team1, team2) {

	return event.Teams[1] && ((event.Teams[0].Team_name === team1 && event.Teams[1].Team_name === team2) ||
		(event.Teams[0].Team_name === team2 && event.Teams[1].Team_name === team1))
}


// value of the dropdown to select team 1
$('.teamDropdown1 li a').click(function( evt ) {
	evt.preventDefault();
	$('.team1:first-child').text($(this).text())
	$('.team1:first-child').val($(this).text());
	getEventsForSelectedTeams()
		// console.log(team1)
})


// value of second dropdown to select team 2
$('.teamDropdown2 li a').click(function(evt) {
	evt.preventDefault();
	$('.team2:first-child').text($(this).text())
	$('.team2:first-child').val($(this).text());
	getEventsForSelectedTeams();
	// console.log(team2)
})


// checking for the chart-div on the page to display stats
if ($('#chart_div').length) {
	// displaying google charts
	// Load the Visualization API and the corechart package.
	google.charts.load('current', {
		'packages': ['corechart']
	});
	// Set a callback to run when the Google Visualization API is loaded.
	// google.charts.setOnLoadCallback(drawChart);

}
// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart( eventData ) {

		// Create the data table.
			var data = new google.visualization.DataTable();
			data.addColumn('date', 'Date');
			data.addColumn('number', eventData[0].Teams[0].Team_name);
			data.addColumn('number', eventData[0].Teams[1].Team_name);

		eventData.forEach(function(ele) {
			// console.log(ele);

			var date = new Date(ele.date);
			var d = date.getDate() + 1;
			var m = date.getMonth() + 1;
			var y = date.getFullYear();

			var newDate = y + ',' + m + ',' + d;


			data.addRows([
				[new Date(newDate), ele.score1, ele.score]
			]);
			// console.log('data1', data)

			// Set chart options
			var options = {
				'title': 'Teams comparison',
				'width': 500,
				'height': 300
			};


			// Instantiate and draw our chart, passing in some options.
			var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
			chart.draw(data, options);

		});
}