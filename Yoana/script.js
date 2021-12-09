function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  $(function() {
    let username = sessionStorage.getItem("username")
    document.querySelector("#user").innerHTML = username
  })