// this file is making all the api calls


/* Events route has a dropdown with which user can see the events which are upcoming in the form of a 2 different
tables by selecting the game or "all events" from the dropdown menu
*/
$(document).on('click', '#allEvents li', function(evt) {
	evt.preventDefault();
	var game = $(this).text()

	$("#allEvents li").removeClass('selected');
	$(this).addClass('selected');
	// display past events
	var eventsEndpoint = 'events/api/';
	$("#game").html('');
	$("#practice").html('');
	if (game === 'all games') {
		game = 'all';
	}
	eventsEndpoint += game;

	$.get(eventsEndpoint, displayEvents);
});

// this is a function which runs after user select the same. It displays all the events related to that game on the page
function displayEvents(eventData) {
	if (!pastEventsFlag) {
		// filter the data where date is greater than and eq to today
		eventData = eventData.filter(function(e) {
			return new Date(e.date) >= new Date()
		});
	}
	var code = $('#template').html();
	var template = Handlebars.compile(code);

	eventData.forEach(function(ele) {
		var html = template({
			events: [ele]

		});

		if (ele.type === 'Game') {
			$('#game').append(html);
		} else {
			$("#practice").append(html);
			$('#practice').find('.editbtn,.savebtn').addClass('hidden');
		}

	});
	$('.eventHeading').show()
	$('.eventTable').show()
	$('.teamHeading').hide();
	$('.teamTable').hide();
	$('.playerHeading').hide();
	$('.playerTable').hide()
	$('.teamBtnHeading').hide();
	$('.teamsButtons').hide();
}

// setting default layout for the user according to the userTeam
function setDefaultLayout() {
	var uTeam = getCookie('userTeam');
	displayTeamEvents(uTeam);
}

// function stats() {
// 	$.get('events/api/eventCount', function(eventStats) {
// 		console.log(eventStats);
// 	})
// }

// stats()

// making an api call to retrive team related data and displaying it in tables format
// uteam is coming from setDefaultLayout()function which is fetching userTeam cookie
function displayTeamEvents(uTeam) {
	var team = $('.teamBtn').text()
	var teamEventsEndpoint = 'teams/api/';
	var userTeam = getCookie('userTeam');
	var code = $('#templateTeam').html();

	if (typeof uTeam === 'string') {
		team = uTeam;
	}
	if (team === "all teams") {
		team = "allteams";
	}

	teamEventsEndpoint += team;

	$("#teamGame").html('');
	$("#teamPractice").html('');

	if (code) {
		$.get(teamEventsEndpoint, function(eventData) {
			var template = Handlebars.compile(code);
			eventData.forEach(function(ele) {
				ele.Events.forEach(function(teamEvent) {

					var data = $.extend({}, {
						"Team_name": ele.Team_name
					}, teamEvent);

					var html = template({
						events: [data]
					})
					if (teamEvent.type === 'Game') {
						$('#teamGame').append(html);
					} else {
						$("#teamPractice").append(html);
						$('#teamPractice').find('.editbtn').addClass('hidden');
						$('#teamPractice').find('.savebtn').addClass('hidden');

					}
				});
			});
			$('.teamHeading').show();
			$('.teamTable').show();
			$('.eventHeading').hide()
			$('.eventTable').hide()
			$('.playerHeading').hide();
			$('.playerTable').hide()
			$('.teamBtnHeading').hide();
			$('.teamsButtons').hide();
		});
	}
}

// functionality on click of team buttons will show all the players which belongs to that team
// uTeam is coming from createAllButtons.js file createTeamButtons() function. Where we are getting uteam from the cookie
function displayPlayers(uTeam) {

	$('#teamPlayers').html('')
	var team = $(this).text();
	var code = $('#templatePlayers').html();

	if (typeof uTeam === 'string') {
		team = uTeam
	}

	$.get('teams/api/players/' + team, function(players) {
		var template = Handlebars.compile(code);
		players.forEach(function(ele) {
			var html = template({
				players: [ele]
			});
			$('#teamPlayers').append(html)
		})
	})
	$('.eventHeading').hide()
	$('.eventTable').hide()
	$('.teamHeading').hide();
	$('.teamTable').hide();
	$('.playerHeading').show();
	$('.playerTable').show();
}

// making ajax call to update data in database when user click on edit on events page and save the edited scores data
// user can only edit past events and can only add scores in it. if all the past events are updated with scores then
// we can see the graphs for them in stats section
function updateContent() {
	var id = $(this).closest('tr').data('id');
	var scores = {
		score1: $(this).closest('tr').find('.score1').text(),
		score: $(this).closest('tr').find('.score2').text()
	}
	console.log(scores)
	$(this).closest('tr').children('td[contenteditable]').attr('contenteditable', 'false');

	$.post('/events/api/update/' + id, scores)
		.done(function() {
			alert('Update sucessful')
		})
}

$(document).ready(setDefaultLayout)
$(document).on('click', '.savebtn', updateContent);
$(document).on('click', '.pTeam', displayPlayers)
$(document).on('click', '#allTeams li', displayTeamEvents);