
fetch("../json/challenges.json")
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
    let current_new_task_index=3;
    let endPoint = 3
    // function taskManager(){
    //   data["Tasks"].forEach(tasks => {
    //     if (counters <= 3) {
    //       document.querySelector(".tasksBar").innerHTML += "<div class=\"tasks\"><div class=\"taskName\">" + tasks.taskName + "<div class=\"starsGiven\">" + tasks.stars + "</div></div><div class=\"panel\">" + tasks.taskDescription + "</div><span class=\"tasks_button\">&#10003;</span></div>";
    //       counters++;
    //     } else {
    //       return;
    //     }
    //     var closebtn = document.getElementsByClassName("tasks_button");
    //   });
    // }

    data["Tasks"].forEach(tasks => {
      if (counters <= 3) {
        document.querySelector(".tasksBar").innerHTML += "<div class=\"tasks\"><div class=\"taskName\">" + tasks.taskName + "<div class=\"starsGiven\">" + tasks.stars + "</div></div><div class=\"panel\">" + tasks.taskDescription + "</div><span class=\"tasks_button\">&#10003;</span></div>";
        counters++;
      } 
      
    });
    add_delete_functionality();
    
    

    function deleteTask(event){
      event.target.parentElement.remove();
      let tasks=data["Tasks"][current_new_task_index];
      document.querySelector(".tasksBar").innerHTML += "<div class=\"tasks\"><div class=\"taskName\">" + tasks.taskName + "<div class=\"starsGiven\">" + tasks.stars + "</div></div><div class=\"panel\">" + tasks.taskDescription + "</div><span class=\"tasks_button\">&#10003;</span></div>";
      add_delete_functionality();
      current_new_task_index++;
      //Call function that updates task in datase
      //Call function for retrieving task (not completed). and render again
  
    }

    function add_delete_functionality(){
      document.querySelectorAll(".tasks .tasks_button").forEach((close_button)=>{
        close_button.addEventListener("click",deleteTask);
      })
    }
  })



////code for the XP and STARS///
//function for posting the xp and stars only tasks
function Completed_task(){
    var taskData =  JSON.stringify({"taskName":"Set a profile picture"});
    console.log(taskData);
    $.ajax({
        type:"POST",
        url:"https://vueloyal.herokuapp.com/user/task",
        data: taskData,
        success: function() {
            window.location.href = "../common/experience.html"
        },
        error: function(err) {
            if(err.responseJSON)
                alert(err.responseJSON.message);
        },
        dataType: "json",
        contentType:"application/json"
    })

};
//function for posting the xp and stars only challenge
function Completed_challenge(){
    var challengeData =  JSON.stringify({"challengeName":"Set a profile picture"});
    console.log(taskData);
    $.ajax({
        type:"POST",
        url:"https://vueloyal.herokuapp.com/user/challenge",
        data: challengeData,
        success: function() {
            window.location.href = "../common/experience.html"
        },
        error: function(err) {
            if(err.responseJSON)
                alert(err.responseJSON.message);
        },
        dataType: "json",
        contentType:"application/json"
    })
};