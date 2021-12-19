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
        // url:"http://localhost:8000/user/signup",
        data: signUpData,
        success: function() {
            window.location.href = "../common/Login.html"
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
        //   url:"http://localhost:8000/user/signin",
          data: logInData,
          success: function(res) {
            let username = $("input[name=username]").val();
            let email = res.data[0].email;
            let xp = res.data[0].xp;
            let stars = res.data[0].stars;
            let level = res.data[0].level;
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('xp', xp);
            sessionStorage.setItem('stars', stars);
            sessionStorage.setItem('level', level);
            // window.location.href = "../common/overview.html"
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

document.querySelector("#image_input").addEventListener("change",(event)=>{
    let files = $('#image_input')[0].files;
    let formData=new FormData();
    formData.append("file",files[0]);
    formData.append("userId",sessionStorage.getItem("username"));
    $.ajax({
        type:"POST",
        data:formData,
        contentType: false,
        processData: false,
        url:"https://vueloyal.herokuapp.com/user/upload",
        //   url:"http://localhost:8000/user/upload",
        success: function(res) {
            window.location.href = "../common/overview.html"
        },
        error: function(err) {
            if(err.responseJSON)
              alert(err.responseJSON.message);
        }
    })
})
