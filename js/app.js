
// cards array 
let card = document.getElementsByClassName("card");
let cards = [...card];
// deck of all cards in game
const deck = document.getElementById("deck");
// move variable
let moves = 0;
let counter = document.querySelector("#moves");
//  variables for star and list
let starsList = document.querySelectorAll("#heart li");
const stars = document.querySelectorAll(".bi bi-heart-fill");
// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");
// array for opened cards
var openedCards = [];
var timer = document.querySelector("#timer");
//shuffles cards

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};
// description function to start a new play 
startGame()
function startGame(){
    // empty the openCards array
    openedCards = [];

    // shuffle deck
    let shuffledCard = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < shuffledCard.length; i++){
      
            deck.appendChild(shuffledCard[i]);
       cards[i].classList.remove("open", "match");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < starsList.length; i++){
        starsList[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

// description toggles open and show class to display cards
var displayCard = function (){
    if (this.classList.contains("card")&&!this.classList.contains("match")&&!this.classList.contains("open")&& openedCards.length<2){
        console.log(this);
        this.classList.toggle("open");
        openedCards.push(this);
        cardMatch()
    }
   
};


//description add opened cards to OpenedCards list and check if cards are match or not

function cardMatch(){
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        console.log(openedCards[0].children[0].className);
        if(openedCards[0].children[0].className === openedCards[1].children[0].className)
        {
            matched();
        } else {
            unmatched();
        }
    }
    if (len== 24){
        setTimeout(()=>{
            alert("congratulation you'r win")
           // startGame()
        })
        
    }
    
};

// @description when cards match
function matched(){
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards = [];
   

}
function unmatched(){
    setTimeout(function(){
        openedCards[0].classList.remove("open");
        openedCards[1].classList.remove("open");
        openedCards = [];
    },1100);
}
// @description count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves === 8){
            starsList[0].style.visibility = "collapse";
    }
    if (moves === 16){
        starsList[1].style.visibility = "collapse";
    }
    if (moves === 24){
        starsList[2].style.visibility = "collapse";
        setTimeout(()=>{
            //Stop the game or display alert to restart the game
            alert("Game Over")
            startGame()
        },1000)
        
    }
}
// @description game timer
var second = 0, minute = 0; hour = 0;
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

// event listeners
// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    //check if the card is correct card!
    card.addEventListener("click", displayCard);
    
};


