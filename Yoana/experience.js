fetch("challenges.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    // this is for the weekly challenges
    let values = Object.values(data.weeklyChallenges).length
    console.log(values)
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear()
    var oneJan = new Date(currentDate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
    var currentWeek = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);
    data["weeklyChallenges"].forEach(challenge => {
      console.log("gjgjgjgjg")
      if (currentYear === challenge.year && currentWeek === challenge.week) {

        document.querySelector(".weeklyChallenges").innerHTML += "<div class=\"weekly\"><div class=\"WtaskName\">" + challenge.taskName +
          "<div class=\"WstarsGiven\">" + challenge.stars + "</div></div><div class=\"panelW\">" +
          challenge.taskDescription + "</div><span class=\"closeW\">&#10003;</span></div>";

      }

    })
    var closebtns = document.getElementsByClassName("closeW");
    let weekly = document.querySelector(".weekly")
    for (let i = 0; i < closebtns.length; i++) {
      closebtns[i].addEventListener("click", function () {
        console.log(weekly)
        this.parentElement.style.display = 'none';
      });
    }
    // this is for the tasks
    let counters = 1;
    let startPoint = 0
    let endPoint = 3
    data["Tasks"].forEach(tasks => {
      if (counters <= 3) {
        document.querySelector(".tasksBar").innerHTML += "<div class=\"tasks\"><div class=\"taskName\">" + tasks.taskName + "<div class=\"starsGiven\">" + tasks.stars + "</div></div><div class=\"panel\">" + tasks.taskDescription + "</div><span class=\"tasks_button\">&#10003;</span></div>";
        counters++;
      } else {
        return;
      }
      var closebtn = document.getElementsByClassName("tasks_button");
      for (let i = 0; i < closebtn.length; i++) {
        startPoint = 1
        closebtn[i].addEventListener("click", function () {
          console.log("fwfggwghargrg")
          //Call function that updates task in datase
          //Call function for retrieving task (not completed). and render again
          this.parentElement.style.display = 'none';

        });
      }
    });
  })


// .then(function (data){
//     console.log(data["weeklyChallenges"][0]["taskName"]);
//     data["weeklyChallenges"].forEach(tasks => {
//         document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"taskName\">"+tasks.taskName+"</div>";
//         document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"starsGiven\">"+tasks.stars+"</div>";
//         console.log(tasks);
//or
// document.querySelector(".weekly1").innerHTML += "<div class=\"WtaskName\">" + secondTask.taskName + " </div>";
// document.querySelector(".weekly1").innerHTML += "<div class=\"WstarsGiven\">" + secondTask.stars + "</div>";
// document.querySelector(".weekly1").innerHTML += "<div class=\"panelW\">" + secondTask.taskDescription + "</div>";
// document.querySelector(".weekly1").innerHTML += "<span class=\"closeW\">&#10003;</span>"


//     });
// })