var games = ['all games', 'football', 'baseball', 'basketball', 'tennis', 'hockey', 'cycle'];

// signIn and signUp form and signout

$('#logIn').on('click', function(evt) {
		evt.preventDefault();
		window.location.href = '/signin';
	})
	// taking signin values
$('#userSignIn').on('click', function(evt) {
	evt.preventDefault();
	var existingUser = {
		email: $('#userEmail').val().trim(),
		password: $('#userPassword').val().trim()
	}
	$.post('/users/login', existingUser)
		.done(function(response) {
			if (response.success) {
				window.location.href = '/events';
			}
		});
})

// taking signup values
$('#signUp').on('click', function(evt) {
	evt.preventDefault();
	window.location.href = '/signup';
})

$('#userSignUp').on('click', function(evt) {
	evt.preventDefault();
	var newUser = {
		fname: $('#firstName').val().trim(),
		lname: $('#lastName').val().trim(),
		team: $('#teamPlayer').val().trim(),
		uniformNum: $('#uniformNumber').val().trim(),
		email: $('#em').val().trim(),
		password: $('#pass').val().trim()
	}

	$.post('/users/create', newUser)
		.done(function() {
			alert('user created');
			window.location.href = '/events';
		})
});

// signout
$('#signOut').on('click', function(evt) {
	evt.preventDefault();
	$.post('/users/signout', function(data) {
	}).done(function() {
		window.location.href = '/';
	});
})


// function for creating dropdown menu in the navbar
function displayGameDropdown() {
	var gameDropdown = $('<div class="dropdown col-md-3">');
	var dropdownBtn = $('<button class="btn eventBtn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">');
	dropdownBtn.html('select game')
	var caret = $('<span class="caret">');
	dropdownBtn.append(caret);
	gameDropdown.append(dropdownBtn)
	var ulTag = $('<ul class="dropdown-menu eventMenu" id="allEvents">');
	games.forEach(function(ele) {
		var listItem = $('<li>' + '<a href="#">' + ele + '</a></li>');
		ulTag.append(listItem)
	})
	gameDropdown.append(ulTag)

	$('.mainHeadRow').append(gameDropdown);

	$('.eventMenu li a').click(function() {
		$('.eventBtn:first-child').text($(this).text()).append(caret);
		$('.eventBtn:first-child').val($(this).text());
	})
}

// dropdown for team filter
function teamDropdown(teams) {

	var teamDiv = $('<div class="dropdown col-md-3">');
	var dropdownBtn = $('<button class="btn teamBtn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">');
	dropdownBtn.html('select team')
	var caret = $('<span class="caret">');
	dropdownBtn.append(caret);
	teamDiv.append(dropdownBtn)
	var ulTag = $('<ul class="dropdown-menu teamMenu" id="allTeams">');
	var item = {
		Team_name: "all teams"
	}
	var insertItemInDropdown = teams.push(item)
	teams.forEach(function(ele) {
				var listItem = $('<li>' + '<a href="#">' + ele.Team_name + '</a></li>');
		ulTag.append(listItem)
	})
	teamDiv.append(ulTag)

	$('.mainHeadRow').append(teamDiv);

	$('.teamMenu li a').click(function() {
		$('.teamBtn:first-child').text($(this).text()).append(caret);
		$('.teamBtn:first-child').val($(this).text());
	})
}



/* Events route has a dropdown with which user can see the events which are upcoming in the form of a 2 different tables by selecting the game or "all events"
from the dropdown menu
*/
$(document).on('click', '#allEvents li a', function(evt) {
	evt.preventDefault();
	var game = $(this).text()
	if (game === "all games") {
		var code = $('#template').html();
		$.get('events/api/all', function(eventData) {
			$("#game").html('');
			$("#practice").html('');
			var template = Handlebars.compile(code);
			eventData.forEach(function(ele) {
					var html = template({
						events: [ele]
					});

					if (ele.type === 'Game') {
						$('#game').append(html);
					} else {
						$("#practice").append(html);
					}
			})
			$('.eventTable').show()
			$('.eventTable').removeClass('hidden');

		})
	} else {
		var code = $('#template').html();
		$("#game").html('');
		$("#practice").html('');
		$.get('events/api/' + game, function(eventData) {
			var template = Handlebars.compile(code);
			var html = template({
				events: eventData
			})
			eventData.forEach(function(ele) {
					var html = template({
						events: [ele]
					});

					if (ele.type === 'Game') {
						$('#game').append(html);
					} else {
						$("#practice").append(html);
					}
			})
			$('.eventTable').show()
			$('.eventTable').removeClass('hidden');
		})
	}
})

// get teams specific data with a call back
function getTeams(callback) {
	$.get('/teams/api/allteams', function(teamData){
		callback(teamData)
	})
}

// get teams specific data with a promise
// function getTeams(callback) {
// 	return $.get('/teams/allteams', function(teamData){
// 	})
// }
// getTeams().then(teamDropdown)



// making an api call to retrive team related data and displaying it in tables format

function displayTeamEvents() {
	var team = $('.teamBtn').text()
	if (team === "all teams") {

		var code = $('#templateTeam').html();

		$.get('teams/api/allteams', function(teamData) {
			$("#teamGame").html('');
			$("#teamPractice").html('');
			var template = Handlebars.compile(code);
			teamData.forEach(function(ele) {
					var html = template({
						teamEvents: [ele]
					});

					ele.Events.forEach(function(events) {
						// console.log(events)
						if (events.type === 'Game') {
						$('#teamGame').append(html);
					} else {
						$("#teamPractice").append(html);
					}
					})
			})
				$('.teamTable').show();
				$('.teamTable').removeClass('hidden');


		})
	}
	else {
		var code = $('#templateTeam').html();
		$("#teamGame").html('');
		$("#teamPractice").html('');
		$.get('teams/api/' + team, function(eventData) {
			var template = Handlebars.compile(code);
			// var html = template({
			// 	events: eventData
			// })
			eventData.forEach(function(ele) {
					var html = template({
						teamEvents: [ele]
					});

					ele.Events.forEach(function(ele) {
								if (ele.type === 'Game') {
						$('#teamGame').append(html);
					} else {
						$("#teamPractice").append(html);
					}
				})
			})
				$('.teamTable').show();
				$('.teamTable').removeClass('hidden');
		})
	}

}

// adding players to sql
$('#playerSubmit').on('click', function(evt) {
	evt.preventDefault()
	var newPlayer = {
		fname: $('#fName').val().trim(),
		lname: $('#lName').val().trim(),
		team: $('#playerTeam').val().trim(),
		uniformNum: $('#uniformNum').val().trim(),
	}
	$.post('/teams/api/addplayers', newPlayer)
		.done(function() {
			alert('player added');
		})
})

// validation function while adding players into table which tells when to display score column and the input param for the 2nd team
function validation() {
	$('#eventType').on('change', function() {
		var type = $('#eventType').val().trim()
		if (type === 'Game') {
			$('#secondTeam').removeClass('hidden');
			$('#score1').removeClass('hidden');
			$('#score2').removeClass('hidden');
		} else {
			$('#secondTeam').addClass('hidden');
			$('#score1').addClass('hidden');
			$('#score2').addClass('hidden');
		}

	});

}


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
		})
})

// setting cookied
function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}

// getting those cookies and displaying welcome message to the user
if (getCookie('user_name')) {
	var userName = getCookie('user_name')
	if (userName !== "") {
		var user = $('<div id="userName" class="user-name">').html('Welcome ' + userName + ' !');
		$('.loginBtn').before(user)
		$('.loginBtn').hide();
		$('#signOut').show()
	}
}
// calling functions
displayGameDropdown();
getTeams(teamDropdown);
$(document).on('click', '#allTeams', displayTeamEvents)
validation();