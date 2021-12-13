function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function showFriendSearch(){
  let overlayDiv = document.querySelector(".overlay");
  if (overlayDiv.style.opacity === '1')
    overlayDiv.style.opacity = 0;
  else
    overlayDiv.style.opacity = 1;
}
