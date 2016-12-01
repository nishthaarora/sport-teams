// formatiing date receiving from mysql when making query


// @param allEvents is coming from controller event.js file
function formatDateInArray(allEvents) {
	// return allEvents;
	allEvents.forEach(function(ele) {
		var date = new Date(ele.dataValues.date);
		var d = date.getDate() + 1;
		var m = date.getMonth() + 1;
		var y = date.getFullYear();

		var newDate = m + '-' + d + '-' + y;
		ele.dataValues.date = newDate;
	});
	return allEvents;

}

// @param allTeams is coming from controller team.js file
function formatDateInTeams(allTeams) {
	allTeams.forEach(function(ele) {
		ele.Events.forEach(function(event) {
			var date = new Date(event.dataValues.date);
			var d = date.getDate() + 1;
			var m = date.getMonth() + 1;
			var y = date.getFullYear();

			var newDate = m + '-' + d + '-' + y;
			event.dataValues.date = newDate;


		})
	})
	return allTeams;
}



module.exports = {
	formatDateInArray: formatDateInArray,
	formatDateInTeams: formatDateInTeams

}