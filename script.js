// L'idée est d'ajouter du poids aux cartes en fonction du rating donné par l'utilisateurice. 
// Plus une carte est lourde, plus elle a de chances d'être sélectionnée. 

// La boucle génère un nombre entre 0 et le point total des cartes. 
// Si le random généré est plus petit que le poid de la carte, elle est sélectionnée 
// Sinon, il retire le poid de la carte au random et il recommence

// Il s'agit d'un tirage pondéré.


let flashcards = [];
let currentCardIndex = -1;

const questionDiv = document.getElementById('question');
const answerDiv = document.getElementById('answer');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const newQuestionBtn = document.getElementById('newQuestionBtn');
const ratingButtons = document.getElementById('ratingButtons');

function loadFlashcards() {
    fetch('flashcards.json')
        .then(response => response.json())
        .then(data => {
            flashcards = data;
            showNewQuestion();
        })
        .catch(error => console.error("Erreur lors du chargement des flashcards :", error));
}

function pickRandomCard() {
    const totalWeight = flashcards.reduce((sum, card) => sum + card.weight, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < flashcards.length; i++) {
        if (random < flashcards[i].weight) {
            return i;
        }
        random -= flashcards[i].weight;
    }
}

function showNewQuestion() {
    answerDiv.style.display = 'none';
    ratingButtons.style.display = 'none';
    currentCardIndex = pickRandomCard();
    questionDiv.textContent = flashcards[currentCardIndex].question;
    answerDiv.textContent = flashcards[currentCardIndex].answer;
}

function showAnswer() {
    answerDiv.style.display = 'block';
    ratingButtons.style.display = 'block';
}

function rateAnswer(rating) {
    if (rating == 1) {
        flashcards[currentCardIndex].weight += 2; // Plus fréquent
    } else if (rating == 2) {
        flashcards[currentCardIndex].weight += 1; // Moyennement fréquent
    } else if (rating == 3) {
        flashcards[currentCardIndex].weight *= 0.5; // La faire maigrir sa mayre - devrait revenir moins souvent
    }
    showNewQuestion();
}

newQuestionBtn.addEventListener('click', showNewQuestion);
showAnswerBtn.addEventListener('click', showAnswer);

document.querySelectorAll('.rateBtn').forEach(button => {
    button.addEventListener('click', () => rateAnswer(button.getAttribute('data-rating')));
});

// Charger les flashcards au démarrage
loadFlashcards();
