// Consegna

// Il computer deve generare 16 numeri casuali (le nostre bombe) tra 1 e 100.
// I numeri non possono essere duplicati.
// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

// BONUS: (da fare solo se funziona tutto il resto)
// all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 => tra 1 e 80
// con difficoltà 2 => tra 1 e 50


//Dichiaro variabili
var startBtn = document.getElementById("start");
var PCNumbers = [];
var userNumbers = [];
var userNumber;
var numBombs = 16;
var totalAttempts = 0;
var attempts; //per testare ho messo 5 tentativi, alla fine "alzerò" ad 84.
var foundNumber = false;
var score = 0;


// Chiedo all'utente di scegliere la difficoltà di gioco.
startBtn.addEventListener("click", 
    function() {
        var levelChoice = document.getElementById("levelChoice").value;

        //Creo switch per la difficoltà
        switch (levelChoice) {

            case "normal":
                totalAttempts = 80;
                attempts = totalAttempts - numBombs;
                break;
            
            case "hard":
                totalAttempts = 50;
                attempts = totalAttempts - numBombs;
                break;

            case "easy":
                totalAttempts = 100;
                attempts = totalAttempts - numBombs;
                break;
        }

        createGrid(totalAttempts);
        
        //La CPU genera i 16 numeri casuali       
              
        // Creo ciclo while dove indico anche la condizione per inserire un numero solo se non è già presente nell'array.
        while (PCNumbers.length < numBombs) {
            var randomNumber = randomNumberGenerator(1, totalAttempts);
            var findNumber = isInArray(PCNumbers, randomNumber);
            if (findNumber == false) {
                PCNumbers.push(randomNumber);
            }
        }
        
        console.log("Numeri Bomba: " + PCNumbers);
        
        document.getElementById("campoGioco").addEventListener("click", 
        function(e) {
            console.log(e.target.dataset.cell);
            let element = document.querySelectorAll(
              "[data-cell='" + e.target.dataset.cell + "']"
            );
          
            if (PCNumbers.includes(parseInt(e.target.dataset.cell))) {
              element[0].classList.add("red");
              alert("Boom! You lose!");
              alert("Final Score " + score);
              location.reload();
            } else if (userNumbers.indexOf(e.target.dataset.cell) == -1) {
              element[0].classList.add("green");
              userNumbers.push(e.target.dataset.cell);
              score++;
            }
          });
        
    }
)

// RESET Button 
var resetBtn = document.getElementById("reset");

resetBtn.addEventListener("click", 
    function() {
        location.reload();

})

/* ----- FUNZIONI ----- */

// Creo funzione per generare un numero casuale.
function randomNumberGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// Creo funzione per inserire il numero nell'array solo se non è stato già trovato.
function isInArray(array, element) {
    var i = 0;
    var result = false;
    while (i < array.length && result == false) {
      if (array[i] == element) {
        result = true;
      }
      i++;
    }
    return result;
}

// Funzione per Richiedere un numero corretto in caso di numero errato.
function wrongNumber () {
    while (correctNumberCheck(1, totalAttempts, userNumber) == false) {
        userNumber = parseInt(prompt("!!! NUMERO ERRATO. INSERIRE UN NUMERO DA 1 A 100 !!!"));
        console.log(userNumber);
    }
}

// Funzione per verificare che il numero sia compreso veramente da 1 a 100. (altrimenti viene chiesto di nuovo)
function correctNumberCheck(min, max, number) {
    var result = false;
    if (number >= min && number <= max) {
        result = true;
    }
    return result;
}

// Funzione per creare la "griglia" del campo minato
function createGrid(cells) {

    for (let i = 1; i <= cells; i++) {

        let cell = `
        <div data-cell="${i}" class="cell">${i}</div>
        `;
        
        let cellTemplate = document.createElement('DIV');
        cellTemplate.classList.add("square");
        cellTemplate.innerHTML = cell;
        document.getElementById("campoGioco").appendChild(cellTemplate);
    }
}