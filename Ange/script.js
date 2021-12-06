
// var form = document.getElementById("signUpForm");
// form.addEventListener('submit', handleForm);

// function handleForm(event) {
//     event.preventDefault();

// var formData = JSON.stringify($("#signUpForm").serializeArray());
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(function(e) {
  $("#signUpForm").submit(function (event) {
    event.preventDefault();
    var a = JSON.stringify($("#signUpForm").serializeObject());
    $.ajax({
        type:"POST",
        url:"https://secure-coast-88070.herokuapp.com/user/signup",
        // url:"http://localhost:3000/user/signup",
        data: a,
        success: function(user) {
            window.location.href = ""
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
