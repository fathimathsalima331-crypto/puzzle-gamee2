const cards = document.querySelectorAll(".card");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let firstCard = null;
let secondCard = null;
let score = 0;

// fruit image URLs
const fruitImgs = {
    apple: "https://cdn-icons-png.flaticon.com/512/415/415733.png",
    banana: "https://cdn-icons-png.flaticon.com/512/415/415734.png",
    grapes: "https://cdn-icons-png.flaticon.com/512/415/415742.png",
    pineapple: "https://cdn-icons-png.flaticon.com/512/415/415735.png",
    strawberry: "https://cdn-icons-png.flaticon.com/512/415/415744.png",
    watermelon: "https://cdn-icons-png.flaticon.com/512/415/415731.png"
};

shuffleCards();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

function flipCard() {
    if (this.classList.contains("open")) return;

    this.classList.add("open");

    const imgName = this.getAttribute("data-img");
    const img = document.createElement("img");
    img.src = fruitImgs[imgName];
    this.appendChild(img);

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

function checkMatch() {
    const val1 = firstCard.getAttribute("data-img");
    const val2 = secondCard.getAttribute("data-img");

    if (val1 === val2) {
        score++;
        scoreText.textContent = score;
        resetSelection();
        if (score === 6) alert("🎉 You Won! 🍓🍍🍇🍎🍉🍌");
    } else {
        setTimeout(() => {
            firstCard.classList.remove("open");
            secondCard.classList.remove("open");
            firstCard.innerHTML = "";
            secondCard.innerHTML = "";
            resetSelection();
        }, 500);
    }
}

function resetSelection() {
    firstCard = null;
    secondCard = null;
}

restartBtn.addEventListener("click", () => {
    cards.forEach(card => {
        card.classList.remove("open");
        card.innerHTML = "";
    });
    score = 0;
    scoreText.textContent = score;
    shuffleCards();
    resetSelection();
});