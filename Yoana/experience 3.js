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