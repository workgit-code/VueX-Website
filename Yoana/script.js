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

  const chooseFile = document.getElementById("myfile")
  const imgPreview = document.getElementById("profilePic")

  chooseFile.addEventListener("change", function(){
    getImgData();
  })


  
  function getImgData() {
    const files = chooseFile.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function (){
        imgPreview.style.backgroundImage = "url('" + this.result + "');"
      })
    } 
  }