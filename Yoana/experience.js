var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

fetch("challenges.json")
  .then (function (resp){
    return resp.json();
  })
  // .then(function (data){
  //     console.log(data["weeklyChallenges"][0]["taskName"]);
  //     data["weeklyChallenges"].forEach(tasks => {
  //         document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"taskName\">"+tasks.taskName+"</div>";
  //         document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"starsGiven\">"+tasks.stars+"</div>";
  //         console.log(tasks);
          
  //     });
  // })

  .then(function (data){
    console.log(data["weeklyChallenges"][0]["taskName"]);
    let counter = 0;
    data["weeklyChallenges"].forEach(tasks => {
     
      if(counter <= 1){
        document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"taskName\">"+tasks.taskName+"</div>";
        document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"starsGiven\">"+tasks.stars+"</div>";
        console.log(tasks);
        // document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"taskName\">"+randomValue+"</div>";
        // document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"starsGiven\">"+randomValue+"</div>";
        console.log("jiv sum")
        counter++;        
      } 
      else{
        return;
      }
    });
})
