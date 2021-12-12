function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  $(function() {
    let username = sessionStorage.getItem("username")
    let level = sessionStorage.getItem("level")
    let stars = sessionStorage.getItem("stars")
    document.querySelector("#user").innerHTML = username
    document.querySelector("#level").innerHTML += level
    document.querySelector("#stars").innerHTML = stars + '<img src="./images/Star.png" alt="stars">'
  })