class Match{
  constructor(team1,team2,state,series,score,target){
    this.team1 = team1;
    this.team2 = team2;
    this.state = state;
    this.series = series;
    this.score = score;
    this.target = target;
  }
}


const scrapData =  {
  //For finding Active Matches
  activeMatches: function(obj){
      const idArr = Object.keys(obj.matches);
      let active=[];
      idArr.forEach(id=>{
        if(obj.matches[`${id}`].state=='inprogress' ||obj.matches[`${id}`].state== 'innings break'|| obj.matches[`${id}`].state=='rain'){
          active.push(obj.matches[`${id}`]);
        }
      });
      return active;
  },
  matchInfos: function(arr){
    let teamArray = [];
    arr.forEach(item=>{ 
      const team1 = item.team1;
      const team2 = item.team2;
      const state = item.state;
      const series= item.series.short_name;
      const score = item.score.batting;
      const target = item.score.bowling;
      const match = new Match(team1,team2,state,series,score,target);
      teamArray.push(match);
    })
    return teamArray;
  }

}




function fetchWithAjax(callback){
  const url = 'fetch-score';
  xhr = new XMLHttpRequest();
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  xhr.open('GET',url,true);
  xhr.setRequestHeader('content-type','application/json');
  // xhr.setRequestHeader('X_CSRF-TOKEN',token);
  xhr.onload = function(){
    if(this.status===200){
      callback(null,this.responseText);
    }else{
      callback('Error:'+this.status);
    }
  }
    xhr.send();
  }

window.onload = function(){
  init();
}

function init(){
  fetchWithAjax(function(err,result){
    if(!err){
      const obj = JSON.parse(result);
      //scrapping active matches
      const activeMatches = scrapData.activeMatches(obj);
      //send activeMatches array to scrap teams infos
      const matchInfos = scrapData.matchInfos(activeMatches);
      //Update the UI
      updateUI(matchInfos);
    }else{
      updateUiError(err);
    }
  })
  setTimeout(init,15000);
}

function updateUI(matches){
  const scoreList = document.getElementById('score-list');
  let html='';
  if(matches.length >0){
    matches.forEach(match=>{
      const battingTeam = match.score.id==match.team1.id?match.team1.s_name:match.team2.s_name;
      const targetInfo = match.target.score==""?'Giving Target':'Target: '+ match.target.score;
      const string = 
      `  <div class="score">
      <h3>${match.team1.name} V ${match.team2.name}</h3>
      <div class="score-detail">
          <p>- ${match.state} -</p>
          <h4 class="tournament-detail">${match.series}</h4>
          <h2> <img src="cricket-bat.png" alt=""> ${battingTeam} ${match.score.score}</h2>
          <h4 class="target"> ${targetInfo}</h4>
      </div></div>`;
      html+=string;
    })
    scoreList.innerHTML = html;
  }else{
    html+=` <div class="no-score">
      <h4>No Live Matches right now ! Please come back later!</h4>
    </div>`
    scoreList.innerHTML = html;
  }


}
function updateUiError(err){
  const scoreList = document.getElementById('score-list');
  let html = '';
  html+=` <div class="no-score">
  <h4>Sorry ! A technical Error Occured ! We will be back shortly</h4>
</div>`
  scoreList.innerHTML = html;
}