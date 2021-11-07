const button = document.getElementById("set-deck");
const drawCard = document.getElementById("draw-card");
const cardsImage = document.getElementById("cards-image");
const winner = document.getElementById("winner");
const cardRemaining = document.getElementById("card-remaining");
const player1ScoreMessage = document.getElementById("player1-score");
const player2ScoreMessage = document.getElementById("player2-scocre");
const resetGame = document.getElementById("reset");
let player1Score = 0;
let player2Score = 0;
let deckId;

resetGame.addEventListener("click", function () {
  window.location.reload();
});

function fetchDecks() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      console.log(data);
      cardRemaining.textContent = `Remaining Cards: ${data.remaining}`;
      drawCard.disabled = false;
      player1Score = 0;
      player2Score = 0;
      player1ScoreMessage.textContent = "Player1 Score:";
      player2ScoreMessage.textContent = "Player2 Score:";
      winner.textContent = "Game of War!";
      cardsImage.children[0].innerHTML = "";
      cardsImage.children[1].innerHTML = "";
    });
}

button.addEventListener("click", fetchDecks);

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.cards);
      cardsImage.children[0].innerHTML = `<img src="${data.cards[0].image}" class='card'>`;
      cardsImage.children[1].innerHTML = `<img src="${data.cards[1].image}" class='card'>`;
      console.log(data);
      winner.textContent = checkForWinner(data.cards[0], data.cards[1]);
      cardRemaining.textContent = `Remaining Cards: ${data.remaining}`;
      if (data.remaining === 0) {
        drawCard.disabled = true;
        if (player1Score > player2Score) {
          winner.textContent = "Player 1 has won the game!";
        } else if (player1Score < player2Score) {
          winner.textContent = "player 2 has won the game!";
        } else {
          winner.textContent = "It's a Tie Game!";
        }
      }

      // cardsImage.innerHTML += `<img src="${data.cards[0].image}">
      // <img src="${data.cards[1].image}">`;
    });
}

drawCard.addEventListener("click", drawCards);

function checkForWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  let card1Value = 0;
  let card2Value = 0;

  // Another way to do this
  // card1Value = valueOptions.indexOf(card1.value)
  // card2Value = valueOptions.indexOf(card2.value)
  for (i = 0; i < valueOptions.length; i++) {
    if (valueOptions[i] === card1.value) {
      card1Value = i;
      console.log(i);
    }
    if (valueOptions[i] === card2.value) {
      card2Value = i;
      console.log(i);
    }
  }

  if (card1Value > card2Value) {
    player1Score += 1;
    player1ScoreMessage.textContent = `Player1 Score: ${player1Score}`;
    return "Player 1 win this turn";
  } else if (card1Value < card2Value) {
    player2Score += 1;
    player2ScoreMessage.textContent = `Player2 Score: ${player2Score}`;
    return "Player 2 win this turn";
  } else {
    return "War!";
  }
}
