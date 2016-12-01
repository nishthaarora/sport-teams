var games = ['all games', 'football', 'baseball', 'basketball', 'tennis', 'hockey', 'cycle'];
var pastEventsFlag = true;

// making scores for the teams and events editable so that user can change the scores of the past events
function createEditButton(event) {
	event.preventDefault()
	$(this).closest('tr').children('td[contenteditable]').attr('contenteditable', 'true');
	$(this).html($(this).html() == 'Edit' ? 'Edit' : 'Edit');
}

// making ajax call to update data in database when user click on edit and save the edited scores data
function updateContent() {
	var id = $(this).closest('tr').data('id');
	var scores = {
		score1: $(this).closest('tr').find('.score1').text(),
		score: $(this).closest('tr').find('.score2').text()
	}
	$(this).closest('tr').children('td[contenteditable]').attr('contenteditable', 'false');

	$.post('/events/api/update/' + id, scores)
		.done(function() {
			alert('Update sucessful')
		})
}


// function for creating dropdown menu in the navbar
function displayGameDropdown() {
	var gameDropdown = $('<div class="dropdown col-md-2">');
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

	var teamDiv = $('<div class="dropdown col-md-2">');
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



// creating colored button on click of Team players button
function displayTeamCheckbox(evt) {
	evt.preventDefault();
	$('.playersDiv').html('')
	var heading = $('<h1>' + 'Teams' + '</h1>')
	$('.playersDiv').append(heading)

	$.get('teams/api/allteams', function(data) {
		data.forEach(function(ele) {
			var buttonDiv = $('<div class="btn-group" data-toggle="buttons">')
			heading.after(buttonDiv);
			var buttonLabel = $('<label class="' + 'btn btn-primary active teamBtn ' + ele.Team_name + '">' + ele.Team_name + '</label>')
			buttonLabel.css('background', ele.Team_name)
			buttonDiv.append(buttonLabel)
			var buttonInput = $('<input type="checkbox" checked autocomplete="off">')
			buttonLabel.append(buttonInput)
		})
	})
	$('.playersDiv').removeClass('hidden');
	$('.eventTable').addClass('hidden');
	$('.teamTable').addClass('hidden');

}
// functionality on click of team buttons will show all the players which belongs to that team
function selectTeam(evt) {
	evt.preventDefault();
	$('#teamPlayers').html('')
	var team = $(this).text();
	var code = $('#templatePlayers').html();
	$.get('teams/api/players/' + team, function(players) {
		var template = Handlebars.compile(code);
		players.forEach(function(ele) {
			// console.log(ele)
			var html = template({
				players: [ele]
			});
		})


	})
}

// bootstrap toggle box
$("[name='my-checkbox']").bootstrapSwitch({
	onSwitchChange: function(evt, state) {
		pastEventsFlag = state;
		$("#allEvents li.selected").trigger('click');
	}
});

/* Events route has a dropdown with which user can see the events which are upcoming in the form of a 2 different tables by selecting the game or "all events"
from the dropdown menu
*/
$(document).on('click', '#allEvents li', function(evt) {
	evt.preventDefault();
	var game = $(this).text()

	$("#allEvents li").removeClass('selected');
	$(this).addClass('selected');
	// display past events
	if (game === "all games") {
		var code = $('#template').html();
		$.get('events/api/all', function(eventData) {

			if (!pastEventsFlag) {
				// filter the data where date is greater than and eq to today
				eventData = eventData.filter(function(e) {
					return new Date(e.date) >= new Date()
				});
			}
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
					$('#practice').children('tr').children('td').find('.editbtn').addClass('hidden');
					$('#practice').children('tr').children('td').find('.savebtn').addClass('hidden');
				}

			})
			$('.eventTable').show()
			$('.eventTable').removeClass('hidden');
			$('.teamTable').addClass('hidden');
			$('.playersDiv').addClass('hidden')
		})


	} else {
		var code = $('#template').html();
		$("#game").html('');
		$("#practice").html('');
		$.get('events/api/' + game, function(eventData) {

			if (!pastEventsFlag) {
				eventData = eventData.filter(function(e) {
					return new Date(e.date) >= new Date()
				});
			}

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
					$('#practice').find('.editbtn').addClass('hidden');
					$('#practice').find('.savebtn').addClass('hidden');
				}
			})
			$('.eventTable').show();
			$('.eventTable').removeClass('hidden');
			$('.teamTable').addClass('hidden');
			$('.playersDiv').addClass('hidden')
		})
	}
})

// get teams specific data with a call back
function getTeams(callback) {
	$.get('/teams/api/allteams', function(teamData) {
		callback(teamData)
	})
}

// making an api call to retrive team related data and displaying it in tables format

function displayTeamEvents() {
	var team = $('.teamBtn').text()
	if (team === "all teams") {

		var code = $('#templateTeam').html();

		$("#teamGame").html('');
		$("#teamPractice").html('');

		$.get('teams/api/allteams', function(eventData) {
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
				})
			})
			$('.teamTable').show();
			$('.teamTable').removeClass('hidden');
			$('.eventTable').addClass('hidden');
		})
	} else {
		var code = $('#templateTeam').html();

		$("#teamGame").html('');
		$("#teamPractice").html('');

		$.get('teams/api/' + team, function(eventData) {
			var template = Handlebars.compile(code);

			eventData.forEach(function(ele) {

				ele.Events.forEach(function(teamEvent) {

					var data = $.extend({}, {
						"Team_name": ele.Team_name
					}, teamEvent);

					var html = template({
						events: [data]
					});

					if (teamEvent.type === 'Game') {
						$('#teamGame').append(html);
					} else {
						$("#teamPractice").append(html);
						$('#teamPractice').find('.editbtn').addClass('hidden');
						$('#teamPractice').find('.savebtn').addClass('hidden');
					}
				});
			});
			$('.teamTable').show();
			$('.teamTable').removeClass('hidden');
			$('.eventTable').addClass('hidden');
		});
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
		.done(function(res) {
			if (res.success) {
				alert('player created');
			} else {
				alert('player already exists');
			}
		});
})

// validation function while adding players into table which tells when to display score column and the input param for the 2nd team
function validation() {
	$('#eventType').on('change', function() {

		var type = $('#eventType').val().trim()
		var date = $('#date').val().trim()
		var score1 = $('#score1').val().trim()
		var score2 = $('#score2').val().trim();
		var team1 = $('#associatedTeam').val().trim()
		var team2 = $('#associatedTeam2').val().trim()

		if (type === 'Game' && new Date(date) < new Date()) {
			$('#secondTeam').removeClass('hidden');
			$('#score1').removeClass('hidden');
			$('#score2').removeClass('hidden');
			$('#secondTeam').attr('required', true);
			$('#score1').attr('required', true);
			$('#score2').attr('required', true);
		}
		else {
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
			window.location.reload();
		})
})

// calling functions
displayGameDropdown();
getTeams(teamDropdown);
$(document).on('click', '.editbtn', createEditButton);
$(document).on('click', '.savebtn', updateContent);
$(document).on('click', '#allTeams', displayTeamEvents);
$(document).on('click', '.teamBtn', selectTeam)
$('#players').on('click', displayTeamCheckbox)
validation();