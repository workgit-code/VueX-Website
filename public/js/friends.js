function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function showFriendSearch() {
  let overlayDiv = document.querySelector(".overlay");
  if (overlayDiv.style.opacity === "1") overlayDiv.style.opacity = 0;
  else overlayDiv.style.opacity = 1;
}

function deleteSession(){
  sessionStorage.clear()
}

//add the friend when the user clicks the icon and toggle
const targetFriend = document.getElementById("AddYoana");
const buttonIcon = document.getElementById("addFriend");
buttonIcon.onclick = function () {
  if (targetFriend.style.display !== "none") {
    targetFriend.style.display = "none";
  } else {
    targetFriend.style.display = "block";
  }
};

// Get the modal
var modal = document.getElementById("myModal");

// Get the div that opens the modal
var btn = document.getElementById("friendSesil");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the div, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
