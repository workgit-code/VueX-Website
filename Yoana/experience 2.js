// const currentDay = new Date().getDay()
// console.log(currentDay)
// // for(let i = 0; i <=7; i++){
// //     let current = i;
//     const Monday = new Date(`December 8 ${currentDay+1}  00:00:00`)
// console.log(Monday)
// // }

// // update the countdown time
// function updateCountDowntime(){
//     const currentDay = new Date()
//     const diff = Monday - currentDay
//     const d = Math.floor(diff / 1000 /60 / 60 / 24)//days
//     const h =  Math.floor(diff / 1000 /60 / 60 )% 24
//     const m =  Math.floor(diff / 1000 /60) % 60
//     const s =  Math.floor(diff / 1000) % 60
    
    
//     console.log(d)
//     console.log(h)
//     console.log(m)
//     console.log(s)
// }
// setInterval(updateCountDowntime, 1000);
fetch("challenges.json")
  .then (function (resp){
    return resp.json();
  })
  .then(function (data){
    // let intervalID = setInterval(visualization, 8000);
    // function visualization(){
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
    //   clearInterval()
    // }
    // visualization()
})