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
	if (validateUserSignIn(existingUser)) {
		$.post('/users/login', existingUser)
			.done(function(response) {
				if (response.success) {
					window.location.href = '/events';
				} else {
					alert('user doesnot exist, please signup')
					window.location.href = '/signup'
				}
			});
	} else {
		return false;
	}

})


function validateUserSignIn(existingUser) {
	if (existingUser.email === "" || existingUser.password === "") {
		$('#userEmail').attr('required', 'required');
		$('#userPassword').attr('required', 'required');
		return false;
	} else {
		return true;
	}
}

// taking signup values
$('#signUp').on('click', function(evt) {
		evt.preventDefault();
		window.location.href = '/signup';
	})
	// signup button
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

if(validateSignUpForm(newUser)) {
	$.post('/users/create', newUser)
		.done(function(res) {
			if (res.success) {
				window.location.href = '/'
			} else {
				if (res.error) {
					alert(res.error)
				} else {
					alert('Some error occured.');
				}
			}
		});
} else {
	return false;
}
});


function validateSignUpForm(newUser){
	if(newUser.fname === "" || newUser.lname === "" || newUser.uniformNum === "" || newUser.email === "" || newUser.password === "") {
		$('#firstName').attr('required', 'required');
		$('#lastName').attr('required', 'required');
		$('#uniformNumber').attr('required', 'required');
		$('#em').attr('required', 'required');
		$('#pass').attr('required', 'required');
		return false;
	} else {
		return true;
	}

}

// signout
$('#signOut').on('click', function(evt) {
	evt.preventDefault();
	$.get('/users/signout', function(data) {}).done(function() {

	});
	window.location.href = '/';
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
		$('#signOut').show();
	}
}

// disabling the anchor tags links if the user is not logged in and regirecting the user to login page
var isLoggedIn = getCookie('logged_in');
$('.getDetails').on('click', function() {
	if (isLoggedIn === undefined || isLoggedIn === 'false') {
		console.log(isLoggedIn)
		alert('Please Login to view the content');
		window.location.href = "/signin"
		return false;
	}

});