var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
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
  .then(function (resp) {
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

  .then(function (data) {
    // let intervalID = setInterval(visualization, 8000);
    // function visualization(values){
    let refreshDay = new Date()(`December 9 2021  00:00:00`)
    let currentDay = new Date()
    console.log(currentDay)
    // if(refreshDay -currentDay)
    let counter = 0;
    let values = Object.values(data.weeklyChallenges).length
    console.log(values)
    let randomWeekly = Math.floor(Math.random() * values)
    let firstTask = (data["weeklyChallenges"][randomWeekly]);
    let secondTask = (data["weeklyChallenges"][randomWeekly + 1]);
    if (counter <= 2) {
      document.querySelector(".weeklyChallenges").innerHTML += "<div class=\"taskName\">" + firstTask.taskName + "</div>";
      document.querySelector(".weeklyChallenges").innerHTML += "<div class=\"starsGiven\">" + firstTask.stars + "</div>";
      console.log(firstTask.taskName)
      document.querySelector(".weeklyChallenges").innerHTML += "<div class=\"taskName\">" + secondTask.taskName + "</div>";
      document.querySelector(".weeklyChallenges").innerHTML += "<div class=\"starsGiven\">" + secondTask.stars + "</div>";
      console.log(secondTask.taskName)
    }else{
      return
    }
    // }

    // console.log(data["weeklyChallenges"][0]["taskName"]);
    // let counter = 0;
    // data["weeklyChallenges"].forEach(tasks => {

    //   if(counter <= 2){
    //     document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"taskName\">"+tasks.taskDescription+"</div>";
    //     document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"starsGiven\">"+tasks.stars+"</div>";
    //     console.log(tasks);
    // document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"taskName\">"+randomValue+"</div>";
    // document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"starsGiven\">"+randomValue+"</div>";
    // console.log("jiv sum")
    // counter++;        
    //   } 
    //   else{
    //     return;
    //   }
    // });
  })