var games = ['football', 'baseball', 'basketball', 'tennis', 'hockey', 'cycle'];

// menu toggle script

$("#menu-toggle").click(function(evt) {
	evt.preventDefault();
	$("#wrapper").toggleClass("toggled");
});


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
				window.location.href = '/';
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
			window.location.href = '/';
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



// creating items in event page according to the games
games.forEach(function(ele, index) {
	var createDiv = $('<div class="col-md-3 portfolio-item">');
	var anchor = $('<a href="events/api/game">');
	createDiv.append(anchor);
	var eventTye = $('<p class="gameName">' + ele + '</p>')
	anchor.append(eventTye);
	var image = $('<img class="img-responsive" id="img-' + index + '"' + '>');
	anchor.append(image);
	image.attr('src', '../assets/images/' + index + '.jpg');
	$('.pageContent').append(createDiv);
})

// after creating items on events page then opening up a modal to display today's events
//displaying modal
$('.img-responsive').on('click', function(evt) {
	evt.preventDefault();
	var game = $(this).parent('a').children('p').text();
	console.log(game);
	$.get('events/api/' + game, function() {})

	// var modalBody = $(this).parent('div').children('span').children('p').text();
	// $('.modal-body').text(modalTitle);

	$('#infoModal').modal('toggle');

})


/* on click of a. all events link which is present in events route user can see all the existing events
which is displayed making ajax calls to our sql server
*/
$('#allEvents').on('click', function(evt) {
	evt.preventDefault();
	var eventTemplate = $('.events').html();
	$.get('events/api/all', function(eventData) {
		console.log(eventData);
		var template = Handlebars.compile(eventTemplate);
		$('.events').html(template({
				events: eventData
			}))
			.removeClass('hidden');
	})

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
	console.log(newEvent);
	$.post('/events/api/input', newEvent)
		.done(function(data) {
			alert('event added');
			window.location.href = '/events/api/all';
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


// function delete_cookie(name) {
//   document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
// }

// delete_cookie('user_name');