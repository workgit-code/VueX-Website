//Sidenav
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function deleteSession(){
  sessionStorage.clear()
}

$(function() {
  let username = sessionStorage.getItem("username")
  let level = sessionStorage.getItem("level")
  let stars = sessionStorage.getItem("stars")
  document.querySelector("#user").innerHTML = username
  document.querySelector("#level").innerHTML += level
  document.querySelector("#stars").innerHTML = stars + '<img src="../img/Star.png" alt="stars">'
})

//Pofile image change
const image_input = document.querySelector("#image_input");
var uploaded_image;

if(image_input!==null){
  image_input.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      uploaded_image = reader.result;
      document.querySelector(
        "#profilePic"
      ).style.backgroundImage = `url(${uploaded_image})`;
      
    });
    reader.readAsDataURL(this.files[0]);
  });
}
