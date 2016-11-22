var games = ['football', 'baseball', 'basketball', 'tennis', 'hockey', 'cycle'];

// menu toggle script

$("#menu-toggle").click(function(evt) {
	evt.preventDefault();
	$("#wrapper").toggleClass("toggled");
});


// signIn and signUp form

$('#logIn').on('click', function(evt) {
	evt.preventDefault();
	window.location.href = '/signin';
})

$('#signUp').on('click', function(evt) {
	evt.preventDefault();
	window.location.href = '/signin';
})

// capturing login details from user and displaying events to the user according tot he team he belongs to

$('#submit').on('click', function(evt) {
	evt.preventDefault()
	var userTeam = $('#teamSelection').val().trim();
	window.location.href = '/events';
});


// creating items in event page according to the games
games.forEach(function(ele, index) {
	var createDiv = $('<div class="col-md-3 portfolio-item">');
	var anchor = $('<a href="events/api/game">');
  createDiv.append(anchor);
  var eventTye = $('<p class="gameName">' + ele + '</p>')
  anchor.append(eventTye);
	var image = $('<img class="img-responsive" id="img-' + index + '"' +'>');
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
			$.get('events/api/' + game, function(){
			})

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