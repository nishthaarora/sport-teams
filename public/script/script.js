// capturing login details from user and displaying events to the user according tot he team he belongs to

$('#submit').on('click', function(event) {
		event.preventDefault()
		var team = $('#teamSelection').val().trim();

		$.get('/events/api/' + team, function(data) {
			data.forEach(function(ele) {
				console.log(ele);
			})
		})

});


// creating events and submitting to mysql

$('.eventForm').submit( function ( event ) {
	event.preventDefault();
	$.post( '/events/api/input', $(this).serialize(), function( data ) {
		alert( 'event added' );
	});
});



