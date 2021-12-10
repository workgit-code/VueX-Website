fetch("challenges.json")
  .then (function (resp){
    return resp.json();
  })
  .then(function (data){
      let values = Object.values(data.weeklyChallenges).length
      console.log(values)
      let randomWeekly = Math.floor(Math.random()* values)
      let firstTask = (data["weeklyChallenges"][randomWeekly]);
      let secondTask =(data["weeklyChallenges"][randomWeekly+1]);
      document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"taskName\">"+firstTask.taskName+"</div>";
      document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"starsGiven\">"+firstTask.stars+"</div>";
      console.log(firstTask.taskName)
      document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"taskName\">"+secondTask.taskName+"</div>";
      document.querySelector(".weeklyChallenges").innerHTML+="<div class=\"starsGiven\">"+secondTask.stars+"</div>";
      console.log(secondTask.taskName)

})

//function for posting the xp and stars only tasks
$('#task_button').click(function(){
    var taskData =  JSON.stringify({"taskName":"Set a profile picture"});
    console.log(taskData);
    $.ajax({
        type:"POST",
        url:"https://vueloyal.herokuapp.com/user/task",
        data: taskData,
        success: function() {
            window.location.href = "./experience.html"
        },
        error: function(err) {
            if(err.responseJSON)
                alert(err.responseJSON.message);
        },
        dataType: "json",
        contentType:"application/json"
    })

});
//function for posting the xp and stars only challenge
$('#challenges_button').click(function(){
    var challengeData =  JSON.stringify({"challengeName":"Set a profile picture"});
    console.log(taskData);
    $.ajax({
        type:"POST",
        url:"https://vueloyal.herokuapp.com/user/challenge",
        data: challengeData,
        success: function() {
            window.location.href = "./experience.html"
        },
        error: function(err) {
            if(err.responseJSON)
                alert(err.responseJSON.message);
        },
        dataType: "json",
        contentType:"application/json"
    })
});
  
