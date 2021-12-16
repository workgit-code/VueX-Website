$.fn.serializeObject = function()
{
    var user = {};
    var toJson = this.serializeArray();
    $.each(toJson, function() {
        if (user[this.name] !== undefined) {
            if (!user[this.name].push) {
                user[this.name] = [user[this.name]];
            }
            user[this.name].push(this.value || '');
        } else {
            user[this.name] = this.value || '';
        }
    });
    return user;
};

$(function(user) {
  $("#signUpForm").submit(function (event) {
    event.preventDefault();
    var signUpData = JSON.stringify($("#signUpForm").serializeObject());
    $.ajax({
        type:"POST",
        url:"https://vueloyal.herokuapp.com/user/signup",
        // url:"http://localhost:3000/user/signup",
        data: signUpData,
        success: function() {
            window.location.href = "../common/LogIn.html"
        },
        error: function(err) {
            if(err.responseJSON)
                alert(err.responseJSON.message);
        },
        dataType: "json",
        contentType:"application/json"
    })
  });

  $("#logInForm").submit(function (event) {
      event.preventDefault();
      var logInData = JSON.stringify($("#logInForm").serializeObject());
      $.ajax({
          type:"POST",
          url:"https://vueloyal.herokuapp.com/user/signin",
        //   url:"http://localhost:3000/user/signup",
          data: logInData,
          success: function(res) {
            let username = $("input[name=username]").val();
            let password = $("input[name=password]").val();
            let email = res.data[0].email;
            let experience = res.data[0].experience;
            let stars = res.data[0].stars;
            let level = res.data[0].level;
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('experience', experience);
            sessionStorage.setItem('stars', stars);
            sessionStorage.setItem('level', level);
            window.location.href = "../common/overview.html"
          },
          error: function(err) {
              if(err.responseJSON)
                alert(err.responseJSON.message);
          },
          dataType: "json",
          contentType:"application/json"
      })
  });
});