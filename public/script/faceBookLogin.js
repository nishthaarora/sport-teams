// fb login

// creating a fb login button and making an api call to get the response back
window.fbAsyncInit = function() {
  FB.init({
    appId: '335920786789433',
    xfbml: true,
    version: 'v2.8'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// function on login send back response with user first name last name email and id
window.facebooklogin = function() {
  FB.api('/me?fields=first_name,last_name,email,picture', function(response) {
    fbLogin(response);
  });
};

// check if user already exist
function fbLogin(res) {
  var userInfo = {
    fname: res.first_name.toLowerCase(),
    lname: res.last_name.toLowerCase(),
    email: res.email.toLowerCase(),
    fbID: res.id,
    URL: res.picture.data.url
  }
  $.post('fb/signin/', userInfo)
    .done(function(response) {
      if (response.success && response.new) {
        signUpModal(response.id);

      } else {
        window.location.href = '/events'
      }
    });
}

// creating a modal with a a form for getting info about the user team
function signUpModal(userId) {
  var code = $('#signup-modal').html();
  $.get('teams/api/allteams', function(data) {
    var template = Handlebars.compile(code);
    var html = template({teams: data});
    $("body").append(html);
    $(".modal").modal('show');
    $(".modal").attr('data-id', userId);

  })
}

// getting values from the modal
function getModalValues() {
  window.location.href = '/events'
  var userId = $('.modal').data('id')
  var info = {
    team: $('#teams').val(),
    uniformNum: $('#uniform').val(),
    id: userId
  }
  updatePlayersTable(info)
}

// validation modal values which user has provided
function validateModalValues(){

}

//making a post request on the api to update players table with users provided info
function updatePlayersTable(info) {
  $.post('fb/update/', info)
    .done(function(response) {

    })
}

var teams = $(document).on('click', '#modalSubmit', getModalValues)
