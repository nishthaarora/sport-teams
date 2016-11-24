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
		console.log(data)
	}).done(function() {
		window.location.href = '/';
	});
})

// function for creating dropdown menu in the navbar
function createDropdownWithArray() {
	var gameDropdown = $('<div class="dropdown col-md-3">');
	var dropdownBtn = $('<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">');
	dropdownBtn.html('select game')
	var caret = $('<span class="caret">');
	dropdownBtn.append(caret);
	gameDropdown.append(dropdownBtn)
	var ulTag = $('<ul class="dropdown-menu" id="allEvents">');
	games.forEach(function(ele) {
		var listItem = $('<li>' + '<a href="#">' + ele + '</a></li>');
		ulTag.append(listItem)
	})
	gameDropdown.append(ulTag)

	$('.mainHeadRow').append(gameDropdown);

	$('.dropdown-menu li a').click(function() {
		$('.btn:first-child').text($(this).text()).append(caret);
		$('.btn:first-child').val($(this).text());
	})

}


/* on click of a. all events link which is present in events route user can see all the existing events
which is displayed making ajax calls to our sql server
*/
$(document).on('click', '#allEvents li a', function(evt) {
	evt.preventDefault();
	var game = $(this).text()
	if (game === "all games") {
		var code = $('#template').html();
		$.get('events/api/all', function(eventData) {
			var template = Handlebars.compile(code);
			var html = template({
				events: eventData
			})
			$('tbody').html(html)
			$('table').removeClass('hidden');
		})
	} else {
		var code = $('#template').html();
			$.get('events/api/' + game, function(eventData) {
			var template = Handlebars.compile(code);
			var html = template({
				events: eventData
			})
			$('tbody').html(html)
			$('table').removeClass('hidden');
		})
	}
})




// getting team realted events
// $('#teamEvents').on('click', function(evt) {
// 	var eventTemplate = $('.events').html();
// 	$.get('events/api/' + userTeam, function(eventData) {
// 		var template = Handlebars.compile(eventTemplate);
// 		$('.events').html(template({
// 				events: eventData
// 			}))
// 			.removeClass('hidden');
// 	})
// })


// displaying users team related events only
// $('#teamEvents').on('click', function( evt ){
// 		evt.preventDefault();
// 	$.get('events/api/' + userTeam, function(){

// 	})
// })


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


function getCookie(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
}

if (getCookie('user_name')) {
	var userName = getCookie('user_name')
	if (userName !== "") {
		var user = $('<div id="userName" class="user-name">').html('Welcome ' + userName + ' !');
		$('.loginBtn').before(user)
		$('.loginBtn').hide();
		$('#signOut').show()
	}
}

createDropdownWithArray();
validation()