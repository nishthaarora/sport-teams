// this is the route for posting the events by taking form inputs
$('#eventSubmit').on('click', function(evt) {
	evt.preventDefault()
	var newEvent = {
			date: $('#date').val().trim(),
			start_time: $('#startTime').val().trim(),
			end_time: $('#endTIme').val().trim(),
			game: $('#game').val().trim(),
			type: $('#eventType').val().trim(),
			score1: $('#score1').val().trim(),
			score: $('#score2').val().trim(),
			location: $('#location').val().trim(),
			comment: $('#comment').val().trim(),
			team: [$('#associatedTeam').val().trim(), $('#associatedTeam2').val().trim()]
		}
	$.post('/events/api/input', newEvent)
		.done(function(data) {
			alert('event added');
			window.location.reload();
		})
})


// adding players to sql database
$('#playerSubmit').on('click', function(evt) {
	evt.preventDefault()

	var newPlayer = {
		fname: $('#fName').val().trim(),
		lname: $('#lName').val().trim(),
		team: $('#playerTeam').val().trim(),
		uniformNum: $('#uniformNum').val().trim(),
	}
	$.post('/teams/api/addplayers', newPlayer)
		.done(function(res) {
			if (res.success) {
				alert('player created');
			} else {
				alert('player already exists');
			}
		});
})
