//THIS THE MODAL BOX FOR THE SHOP PAGE PARTICULARY FOR THE NORMAL(unlocked) ELEMENTS
var modalNormal = document.getElementById("ModalNormal");
var modalNormal1 = document.getElementById("ModalNormal1");
var modalNormal2 = document.getElementById("ModalNormal2");
var modalNormal3 = document.getElementById("ModalNormal3");

// Get the button that opens the modal
var button = document.getElementsByClassName("normal");
var button1 = document.getElementsByClassName("normal1");
var button2 = document.getElementsByClassName("normal2");
var button3 = document.getElementsByClassName("normal3");

// Get the <span> element that closes the modal
var spanN = document.getElementsByClassName("closeN")[0];
var spanN1 = document.getElementsByClassName("closeN1")[0];
var spanN2 = document.getElementsByClassName("closeN2")[0];
var spanN3 = document.getElementsByClassName("closeN3")[0];

// When the user clicks on the button, open the modal
for (let bt of button) {
  bt.onclick = function() {
    modalNormal.style.display = "block";
  };
}

for (let bt1 of button1) {
  bt1.onclick = function() {
    modalNormal1.style.display = "block";
  };
}

for (let bt2 of button2) {
  bt2.onclick = function() {
    modalNormal2.style.display = "block";
  };
}

for (let bt3 of button3) {
  bt3.onclick = function() {
    modalNormal3.style.display = "block";
  };
}



// When the user clicks on <span> (x), close the modal
spanN.onclick = function() {
  modalNormal.style.display = "none";
}

spanN1.onclick = function() {
  modalNormal1.style.display = "none";
}

spanN2.onclick = function() {
  modalNormal2.style.display = "none";
}

spanN3.onclick = function() {
  modalNormal3.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalNormal) {
    modalNormal.style.display = "none";
  }
}

window.onclick = function(event) {
  if (event.target == modalNormal1) {
    modalNormal1.style.display = "none";
  }
}


//THIS THE MODAL BOX FOR THE SHOP PAGE PARTICULARY FOR THE LOCKED ELEMENTS
var modalLock = document.getElementById("ModalLock");

// Get the button that opens the modal
var buttonLock = document.getElementsByClassName("locking");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
for (let b of buttonLock) {
  b.onclick = function() {
    modalLock.style.display = "block";
  };
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalLock.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalLock) {
    modalLock.style.display = "none";
  }
}
$(function() {
  let stars = sessionStorage.getItem("stars")
  document.querySelector("#stars").innerHTML = stars + '<img src="../img/Star.png" alt="stars">'
})

$(document).ready(function() {
  //handler for click confirm
  $(".confirm").on("click",function(){
    //var title = $(this).prev().text().trim();
    //convert to JSON format
    var data = {};

    data["username"] = sessionStorage.getItem("username");
    // get the stars  .parseInt()
    var ownedStars = Number.parseInt(sessionStorage.getItem("stars"));
    var itemStars = Number.parseInt($(this).siblings(".money").text().trim().replace(/[^0-9.]/g, ''));
    console.log(itemStars);
    console.log(ownedStars);
    if(ownedStars < itemStars){
        alert("Not enough balance!!!!");
        return;
    }
    var leftStars = ownedStars - itemStars;
    data["stars"] = leftStars;
    var dataStars = JSON.stringify(data);
    console.log(dataStars);
    sessionStorage.setItem('stars', leftStars);
    //make POST request to server with the task name in the body as payload
    $.ajax({
        type:"POST",
        url:"https://vueloyal.herokuapp.com/stars",
        data: dataStars,
        success: function(res) {
            console.log("success");
            console.log(res.data[0]);
        },
        error: function(err) {
            if(err.responseJSON)
                alert(err.responseJSON.message);
        },
        dataType: "json",
        contentType:"application/json"
    });
  });
});

function deleteSession(){
  sessionStorage.clear()
}