
// var form = document.getElementById("signUpForm");
// form.addEventListener('submit', handleForm);

// function handleForm(event) {
//     event.preventDefault();

// var formData = JSON.stringify($("#signUpForm").serializeArray());
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
            window.location.href = "./LogIn.html"
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
          data: logInData,
          success: function() {
            // add link to overview
            window.location.href = "./test.html"
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

// function getData(){
//     var email = event.target.elements.email.value;
//     var password = event.target.elements.password.value;
//     var repPass = event.target.elements.repPass.value
//     console.log(email, password, repPass)
// }
