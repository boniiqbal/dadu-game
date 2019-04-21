/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let score, roundScore, activPlayer, dice0, dice1, gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener('click', function () {

   if (gamePlaying) {
      //1. random select
      dice0 = Math.floor(Math.random() * 6) + 1
      dice1 = Math.floor(Math.random() * 6) + 1

      //2.show display
      let diceDom0 = document.querySelector('.dice0')
      let diceDom1 = document.querySelector('.dice1')
      diceDom0.style.display = 'block'
      diceDom1.style.display = 'block'
      diceDom0.src = 'dice-' + dice0 + '.png'
      diceDom1.src = 'dice-' + dice1 + '.png'

      //3. Update round score
      if (dice0 !== 1 && dice1 !== 1) {
         roundScore += dice0 +dice1
         document.getElementById('current-' + activPlayer).textContent = roundScore
      } else {
         //next player
         nextPlayer()
      }
   }

})

document.querySelector(".btn-hold").addEventListener("click", function () {

   if (gamePlaying) {
      //1.Insert roundscore to global
      score[activPlayer] += roundScore

      //2. Update UI
      document.getElementById("score-" + activPlayer).textContent = score[activPlayer]

      //3. check winning
      if (score[activPlayer] >= 100) {
         document.getElementById('name-' + activPlayer).textContent = "WINNER"
         document.querySelector(".dice0").style.display = "none"
         document.querySelector(".dice1").style.display = "none"
         document.querySelector(".player-" + activPlayer + "-panel").classList.add("winner")
         document.querySelector(".player-" + activPlayer + "-panel").classList.remove("active")
         gamePlaying = false;
      } else {
         nextPlayer()
      }
   }
})

document.querySelector(".btn-new").addEventListener("click", init)

function nextPlayer() {
   activPlayer === 0 ? activPlayer = 1 : activPlayer = 0
   roundScore = 0;

   document.getElementById("current-0").textContent = "0"
   document.getElementById("current-1").textContent = "0"

   document.querySelector(".player-0-panel").classList.toggle('active')
   document.querySelector(".player-1-panel").classList.toggle('active')

   document.querySelector(".dice0").style.display = "none"
   document.querySelector(".dice1").style.display = "none"
}

function init() {
   score = [0, 0]
   roundScore = 0
   activPlayer = 0

   document.getElementById('score-0').innerHTML = 0
   document.getElementById('score-1').innerHTML = 0
   document.getElementById('current-0').innerHTML = 0
   document.getElementById('current-1').innerHTML = 0
   document.getElementById('name-0').textContent = "Player 1"
   document.getElementById('name-1').textContent = "Player 2"
   document.querySelector(".player-0-panel").classList.remove("winner")
   document.querySelector(".player-1-panel").classList.remove("winner")
   document.querySelector(".player-0-panel").classList.remove("active")
   document.querySelector(".player-1-panel").classList.remove("active")
   document.querySelector(".player-0-panel").classList.add("active")
   gamePlaying = true;

   document.querySelector(".dice0").style.display = 'none'
   document.querySelector(".dice1").style.display = 'none'
}