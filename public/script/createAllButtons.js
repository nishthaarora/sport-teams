	// this file is creating all the buttons for the page dynamically

	var games = ['all games', 'football', 'baseball', 'basketball', 'tennis', 'hockey', 'cycle'];
	var pastEventsFlag = true;

	// making scores for the teams and events editable so that user can change the scores of the past events
	function createEditButton(event) {
		event.preventDefault()
		$(this).closest('tr').children('td[contenteditable]').attr('contenteditable', 'true');
		$(this).html($(this).html() == 'Edit' ? 'Edit' : 'Edit');
	}


	// function for creating dropdown menu in the navbar
	function displayGameDropdown() {

		var gameDropdown = $('<div class="dropdown col-md-2">');
		var dropdownBtn = $('<button class="btn button eventBtn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">');
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
		var dropdownBtn = $('<button class="btn button teamBtn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">');
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

	// sending teams to teamDropdown function which is creatinga dropdown for all the teams
	function getTeams(callback) {
		$.get('/teams/api/allteams', function(teamData) {
			callback(teamData)
		})
	}

	// bootstrap toggle box
	$("[name='my-checkbox']").bootstrapSwitch({
		onSwitchChange: function(evt, state) {
			pastEventsFlag = state;
			$("#allEvents li.selected").trigger('click');
		}
	});


	// these are the buttons in "team Players" tab which defines all the teams and shows their players related data"
	function createTeamButtons(evt) {
		evt.preventDefault();
		$('.teamsButtons').html('')

		var code = $('#showTeamsBtn').html()
		$.get('teams/api/allteams', function(data) {
			var template = Handlebars.compile(code)
			var html = template({
				team: data
			})
			$('.teamsButtons').append(html)
		})

		$('.teamsButtons').show();
		$('.teamHeading').hide();
		$('.teamTable').hide();
		$('.eventHeading').hide()
		$('.eventTable').hide()

	}


	displayGameDropdown();
	getTeams(teamDropdown);
	$(document).on('click', '.editbtn', createEditButton);
	$('#players').on('click', createTeamButtons)