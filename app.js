/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//dice = Math.floor(Math.random() * 6) + 1;

//DOM MANIPULATION

/*document.querySelector('#current-' + activePlayer).textContent = dice; //only text inside html manipulation*/
/*document.querySelector('#current-' +activePlayer).innerHTML = '<em>' + dice + '<em>'; //manipulation in whole hmtl*/

/*
//i can also use querySelector to read value from html i store it in a variable
let x = document.querySelector('#score-0').textContent;
console.log(x);
*/

let scores, roundScores, activePlayer;

init(); //I need this call because i need to initialized var values from the init function

//EVENT HANDLER - roll button

document.querySelector('.btn-roll').addEventListener('click', function () {

    //1. Random number
    let dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
        //Add core
        roundScore += dice; //roundScore = roundScore + dice
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //Next player
        nextPlayer(); //calling a "nextPlayer" function because I need it right now
    }

});

//EVENT HANDLER - hold button

document.querySelector('.btn-hold').addEventListener('click', function () {

    //Add CURRENT score to global score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    //Check if the player won the game
    if (scores[activePlayer] >= 20) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    } else {
        //Next player
        nextPlayer();
    }

    //Next player
    nextPlayer();

});


//DRY - Dont Repeat Yourself principal

function nextPlayer() {

    /*if (activePlayer === 0) {
            activePlayer = 1;
        } else {
            sctivePlayer = 0;
        }*/

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //turnery operator
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

}

//EVENT HANDLER = New Game button

document.querySelector('.btn-new').addEventListener('click', init); //init function without parenthesis because I don't want to call it immediately, i want to call it after some event (click in this example)

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    //changing CSS style
    document.querySelector('.dice').style.display = 'none';

    //another type of selecting a specific element of HTML
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}
