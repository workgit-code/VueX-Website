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
