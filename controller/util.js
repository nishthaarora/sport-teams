function formatDateInArray(allEvents) {

	// for( var i in allEvents) {
	// 	var currentEvent = allEvents[i];
	// 	var date = new Date(currentEvent.date);
	// 	var d = date.getDate() + 1;
	// 	var m = date.getMonth() + 1;
	// 	var y = date.getFullYear();
	// 	var newDate = m + '-' + d + '-' + y;

	// 	allEvents[i].push(allEvents[i].formattedDate)
	// }
	// return allEvents;
	allEvents.forEach(function(ele) {
		var date = new Date(ele.dataValues.date);
		var d = date.getDate() + 1;
		var m = date.getMonth() + 1;
		var y = date.getFullYear();

			var newDate = m + '-' + d + '-' + y;
			ele.dataValues.date = newDate;
				// ele.formatterDate = newDate;
			// return newDate;
	});
	console.log('events', allEvents);
	return allEvents;
	// console.log(date)

}
module.exports = {
	formatDateInArray: formatDateInArray,

}