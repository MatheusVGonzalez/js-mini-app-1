const gridContainer = document.querySelector('.grid-container');
let cards = [
    {
        "image": "./assets/deer.png",
        "name": "deer"
    },
    {
        "image": "./assets/deer.png",
        "name": "deer"
    },
    {
        "image": "./assets/duck.png",
        "name": "duck"
    },
    {
        "image": "./assets/duck.png",
        "name": "duck"
    },
    {
        "image": "./assets/leopard.png",
        "name": "leopard"
    },
    {
        "image": "./assets/leopard.png",
        "name": "leopard"
    },
    {
        "image": "./assets/lion.png",
        "name": "lion"
    },
    {
        "image": "./assets/lion.png",
        "name": "lion"
    },
    {
        "image": "./assets/tiger.png",
        "name": "tiger"
    },
    {
        "image": "./assets/tiger.png",
        "name": "tiger"
    },
    {
        "image": "./assets/zebra.png",
        "name": "zebra"
    },
    {
        "image": "./assets/zebra.png",
        "name": "zebra"
    }
]
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

// fetch('./data/cards.json')
//   .then(response => response.json())
//   .then(data => {
//     // cards = data.cards;
//     cards = [...data, ...data];;
//     shuffleCards();
//     generateCards();
//   })
//   .catch(error => console.error('Error loading cards:', error));


function shuffleCards() {
    let currentIndex = cards.length, randomIndex, temporaryValue;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

function generateCards() {
    for (let card of cards) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);
        cardElement.innerHTML = `
            <div class="front">
                <img class="front-image" src=${card.image} alt=${card.name}>
            </div>
            <div class="back"></div>
        `;
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener('click', flipCard);
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    
    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    score++;
    document.querySelector(".score").textContent = score;
    lockBoard = true;

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = '';
    generateCards();
}
// Jessie's part
let countdown;

const params = new URLSearchParams(window.location.search);
const level = params.get("level");

const levelTimes = {
  easy: 60,
  medium: 30,
  hard: 15
};

const timeInSeconds = levelTimes[level] || 30; 

function startTimer(seconds) {
  if(restart == true){
  clearInterval(countdown);
  const timerDisplay = document.getElementById("timer");
  const end = Date.now() + seconds * 1000;

  updateDisplay(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((end - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = "Time's up!";
      return;
    }
    updateDisplay(secondsLeft);
  }, 1000);
  }
  
}

function updateDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
  document.getElementById("timer").textContent = display;
}

startTimer(timeInSeconds);
