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
      let values = Object.values(data.weeklyChallenges).length
      console.log(values)
      let randomWeekly1 = Math.floor(Math.random() * values)
      let randomWeekly2 = Math.floor(Math.random() * values)
      let firstTask = (data["weeklyChallenges"][randomWeekly1]);
      let secondTask = (data["weeklyChallenges"][randomWeekly2]);
      document.querySelector(".weekly").innerHTML += "<div class=\"WtaskName\">" + firstTask.taskName + " </div>";
      document.querySelector(".weekly").innerHTML += "<span class=\"WstarsGiven\">" + firstTask.stars + "</span>";
      document.querySelector(".weekly").innerHTML += "<div class=\"panelW\">" + firstTask.taskDescription + "</div>";
      document.querySelector(".weekly").innerHTML += "<span class=\"closeW\">&#10003;</span>"
      document.querySelector(".weekly1").innerHTML += "<div class=\"WtaskName\">" + secondTask.taskName + " </div>";
      document.querySelector(".weekly1").innerHTML += "<div class=\"WstarsGiven\">" + secondTask.stars + "</div>";
      document.querySelector(".weekly1").innerHTML += "<div class=\"panelW\">" + secondTask.taskDescription + "</div>";
      document.querySelector(".weekly1").innerHTML += "<span class=\"closeW\">&#10003;</span>"
      console.log(secondTask.taskName)
      var closebtns = document.getElementsByClassName("closeW");
      let weekly = document.querySelector(".weekly")
      for (let i = 0; i < closebtns.length; i++) {
        closebtns[i].addEventListener("click", function () {
          console.log(weekly)
          this.parentElement.style.display = 'none';
        });
      }
      let counters = 1;
      let startPoint = 0
      let endPoint = 3
      // console.log(data["weeklyChallenges"][0]["taskName"]);
      data["Tasks"].forEach(tasks => {
        if(counters <= 3 ){
          document.querySelector(".tasksBar").innerHTML += "<div class=\"tasks\"><div class=\"taskName\">" + tasks.taskName + "</div>"   
          document.querySelector(".tasks").innerHTML += "<div class=\"starsGiven\">" + tasks.stars + "</div></div>"
          document.querySelector(".tasks").innerHTML +=  "<div class=\"panel\">" + tasks.taskDescription + "</div>" 
          document.querySelector(".tasks").innerHTML +=   "<span class=\"close\">&#10003;</span>";
        
          // if (startPoint <= counters && counters < (startPoint + endPoint)) {

            // console.log(tasks);
            console.log("jiv sum")

            counters++;
          } else {
            return;
          }
          var closebtn = document.getElementsByClassName("close");

          for (let i = 0; i < closebtn.length; i++) {
            startPoint = 1
            closebtn[i].addEventListener("click", function () {
              console.log("fwfggwghargrg")
              this.parentElement.style.display = 'none';

            });}
      });
      })