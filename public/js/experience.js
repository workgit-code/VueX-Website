//taking the data from JSON and representing it
fetch("../json/challenges.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (data) {
    // this is for the weekly challenges where it has to be changed every week that's
    //why we are seeing what is the current date and the saying in the json file which is 
    //we are saying which date as number so it visualize
    let values = Object.values(data.weeklyChallenges).length
    console.log(values)
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear()
    var oneJan = new Date(currentDate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
    var currentWeek = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);
    data["weeklyChallenges"].forEach(challenge => {
      if (currentYear === challenge.year && currentWeek === challenge.week) {
        document.querySelector(".weeklyChallenges").innerHTML += "<div class=\"weekly\"><div class=\"WtaskName\">" + challenge.taskName +
          "<div class=\"WstarsGiven\">" + challenge.stars + "</div></div><div class=\"panelW\">" +
          challenge.taskDescription + "</div><span class=\"closeW\">&#10003;</span></div>";

      }
    })
    //if the person clicks the tick(he finished the weekly Challenge) it will disappear
    var closebtns = document.getElementsByClassName("closeW");
    let weekly = document.querySelector(".weekly")
    for (let i = 0; i < closebtns.length; i++) {
      closebtns[i].addEventListener("click", function () {
        console.log(weekly);
        //retrieve challenge from element
        var challengeName = $(this).prev().prev().text().replace(/[0-9]/g, '').trim();
        Completed_challenge(challengeName);
        this.parentElement.style.display = 'none';
      });
    }
    // this is for the tasks
    let counters = 1;
    let startPoint = 0
    let current_new_task_index=3;
    let endPoint = 3
    //for the task
    data["Tasks"].forEach(tasks => {
      if (counters <= 3) {
        document.querySelector(".tasksBar").innerHTML += "<div class=\"tasks\"><div class=\"taskName\">" + tasks.taskName + "<div class=\"starsGiven\">" + tasks.stars + "</div></div><div class=\"panel\">" + tasks.taskDescription + "</div><span class=\"tasks_button\">&#10003;</span></div>";
        counters++;
      } 
      
    });
    add_delete_functionality();
    //for removing tasks and to get a new one from the JSON file
    function deleteTask(event){
      //retrieve task name from element
      var taskName = $(this).prev().prev().text().replace(/[0-9]/g, '').trim();
      event.target.parentElement.remove();
      let tasks=data["Tasks"][current_new_task_index];
      document.querySelector(".tasksBar").innerHTML += "<div class=\"tasks\"><div class=\"taskName\">" + tasks.taskName + "<div class=\"starsGiven\">" + tasks.stars + "</div></div><div class=\"panel\">" + tasks.taskDescription + "</div><span class=\"tasks_button\">&#10003;</span></div>";
      add_delete_functionality();
      current_new_task_index++;
      //Call function that updates task in datase
      Completed_task(taskName);
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
function Completed_task(taskName){
    var data = {};
    data["taskName"] = taskName;
    data["username"] = sessionStorage.getItem("username");;
    var taskData = JSON.stringify(data);
    console.log(taskData);
    $.ajax({
        type:"POST",
        //try in local
        // url:"http://localhost:3031/earnXpStars",
        url:"https://vueloyal.herokuapp.com/earnXpStars",
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
function Completed_challenge(challengeName){
  var data = {};
  data["challengeName"] = challengeName;
  //sessionStorage.getItem("username");
  data["username"] = "dr.who";
  var challengeData = JSON.stringify(data);
  console.log(challengeData);
  $.ajax({
      type:"POST",
      // url:"http://localhost:3031/earnXpStars/challenge",
        url:"https://vueloyal.herokuapp.com/earnXpStars/challenge",
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
