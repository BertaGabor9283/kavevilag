
const menuButton = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuButton) {
    menuButton.addEventListener('click', function () {
        navMenu.classList.toggle('open');
    });
}



const contactForm = document.getElementById('contact-form');

if (contactForm) {
    const rangeInput = document.getElementById('strength-range');
    const rangeValue = document.getElementById('range-value');
    if (rangeInput) {
        rangeInput.addEventListener('input', function () {
            rangeValue.textContent = this.value;
        });
    }

    contactForm.addEventListener('submit', function (event) {
        let isValid = true;

        const errors = document.querySelectorAll('.error-msg');
        errors.forEach(el => el.textContent = '');

        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(el => el.classList.remove('input-error'));

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const coffeeTypeInput = document.getElementById('coffee-type');
        const messageInput = document.getElementById('message');
        const errorName = document.getElementById('error-name');
        const errorEmail = document.getElementById('error-email');
        const errorCoffeeType = document.getElementById('error-coffee-type');
        const errorTaste = document.getElementById('error-taste');
        const errorMessage = document.getElementById('error-message');

        if (nameInput.value.trim().length < 2) {
            errorName.textContent = "A név túl rövid!";
            nameInput.classList.add('input-error');
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        if (!emailValue.includes('@') || !emailValue.includes('.')) {
            errorEmail.textContent = "Érvénytelen email cím!";
            emailInput.classList.add('input-error');
            isValid = false;
        }

        if (coffeeTypeInput.value === "") {
            errorCoffeeType.textContent = "Válassz kávétípust!";
            coffeeTypeInput.classList.add('input-error');
            isValid = false;
        }

        const tastes = document.querySelectorAll('input[name="taste"]:checked');
        if (tastes.length === 0) {
            errorTaste.textContent = "Jelölj be legalább egy ízvilágot!";
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            errorMessage.textContent = "Az üzenet minimum 10 karakter legyen!";
            messageInput.classList.add('input-error');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
            console.log("Hiba az űrlapon!");
        } else {
            console.log("Minden adat rendben, küldés...");
            // showResult(); // This was a mistake in previous edit, removed it.
        }
    });
}

// --- Quiz Logic ---

const quizData = [
    {
        question: "Hogyan szereted inni a kávédat?",
        answers: [
            { text: "Feketén, tisztán", scores: { espresso: 3, v60: 2, chemex: 1 } },
            { text: "Sok tejjel, habosan", scores: { cappuccino: 3, latte: 2 } },
            { text: "Egy kevés tejjel", scores: { cortado: 3, macchiato: 2 } },
            { text: "Jegesen, hűsítően", scores: { coldbrew: 3, espresso_tonic: 2 } }
        ]
    },
    {
        question: "Milyen ízvilágot részesítesz előnyben?",
        answers: [
            { text: "Keserű, csokoládés", scores: { espresso: 2, ristretto: 3 } },
            { text: "Gyümölcsös, savas", scores: { v60: 3, chemex: 2, aeropress: 1 } },
            { text: "Édes, krémes", scores: { cappuccino: 2, latte: 3 } },
            { text: "Erős, intenzív", scores: { espresso: 3, ristretto: 2 } }
        ]
    },
    {
        question: "Mennyi időd van kávékészítésre?",
        answers: [
            { text: "Semennyi, azonnal kell", scores: { espresso: 3 } },
            { text: "Pár perc belefér", scores: { aeropress: 2, french: 2 } },
            { text: "Szeretek elbabrálni vele", scores: { v60: 3, chemex: 3 } },
            { text: "Ráérek, élvezem a folyamatot", scores: { chemex: 2, v60: 2 } }
        ]
    },
    {
        question: "Mikor iszol kávét legszívesebben?",
        answers: [
            { text: "Reggel, ébredés után", scores: { cappuccino: 2, latte: 2, espresso: 1 } },
            { text: "Ebéd után", scores: { espresso: 3, cortado: 2 } },
            { text: "Délutáni nasiként", scores: { latte: 3, cappuccino: 2 } },
            { text: "Egész nap bármikor", scores: { v60: 2, chemex: 2 } }
        ]
    }
];

const quizResults = {
    espresso: {
        name: "Espresso",
        desc: "A klasszikus választás. Szereted a tiszta, intenzív ízeket és a gyors energiát. Nem szereted bonyolítani a dolgokat, a lényegre törsz."
    },
    ristretto: {
        name: "Ristretto",
        desc: "Az esszencia kedvelője. A minőség fontosabb számodra a mennyiségnél. Szereted a koncentrált, gazdag élményeket."
    },
    cappuccino: {
        name: "Cappuccino",
        desc: "Az egyensúly híve. Szereted, ha a kávé erejét lágyítja a tej krémessége. Fontos számodra a harmónia és a kényelem."
    },
    latte: {
        name: "Caffe Latte",
        desc: "A kényeztetés mestere. Szereted hosszan élvezni a kávézást, és fontos számodra a lágy, selymes textúra. Igazi bekuckózós típus vagy."
    },
    v60: {
        name: "Pour - over",
        desc: "A felfedező. Értékeled a kávé finomabb, gyümölcsös ízjegyeit. Szeretsz kísérletezni és odafigyelsz a részletekre."
    },
    chemex: {
        name: "Chemex",
        desc: "Az esztéta. A kávézás számodra rituálé. Szereted a tiszta, elegáns ízeket és a szép eszközöket."
    },
    aeropress: {
        name: "Aeropress",
        desc: "A praktikus kísérletező. Szereted a sokoldalúságot és a megbízható eredményt. Bárhol, bármikor képes vagy jót alkotni."
    },
    french: {
        name: "French Press",
        desc: "A hagyományőrző. Szereted a testes, gazdag kávét és az egyszerű, bevált módszereket."
    },
    cortado: {
        name: "Cortado",
        desc: "A kifinomult. Szereted az espresso erejét, de egy kis lágysággal fűszerezve. Pontos és mértéktartó vagy."
    },
    coldbrew: {
        name: "Cold Brew",
        desc: "A türelmes. Tudod, hogy a jó dolgokhoz idő kell. Szereted a lágy, alacsony savtartalmú, hűsítő kávét."
    },
    espresso_tonic: {
        name: "Espresso Tonic",
        desc: "A modern ínyenc. Szereted a különleges, frissítő párosításokat. Nyitott vagy az újdonságokra."
    }
};

let currentQuestionIndex = 0;
let quizScores = {};

// DOM Elements for Quiz
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('quiz-question-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('quiz-result');
const resultName = document.getElementById('result-coffee-name');
const resultDesc = document.getElementById('result-description');
const restartBtn = document.getElementById('restart-quiz-btn');

function initQuiz() {
    if (!quizContainer) return; // Guard clause if elements don't exist

    currentQuestionIndex = 0;
    quizScores = {};

    // Initialize scores
    for (const key in quizResults) {
        quizScores[key] = 0;
    }

    questionContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');

    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('quiz-option-btn');
        button.textContent = answer.text;
        button.addEventListener('click', () => handleAnswer(answer.scores));
        optionsContainer.appendChild(button);
    });
}

function handleAnswer(scores) {
    // Add scores
    for (const key in scores) {
        if (quizScores.hasOwnProperty(key)) {
            quizScores[key] += scores[key];
        } else {
            quizScores[key] = scores[key];
        }
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    questionContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    // Find winner
    let maxScore = -1;
    let winner = null;

    for (const key in quizScores) {
        if (quizScores[key] > maxScore) {
            maxScore = quizScores[key];
            winner = key;
        }
    }

    // Fallback if something goes wrong
    if (!winner) winner = 'espresso';

    const result = quizResults[winner];
    resultName.textContent = result.name;
    resultDesc.textContent = result.desc;
}

if (restartBtn) {
    restartBtn.addEventListener('click', initQuiz);
}

// Start the quiz if we are on the page
if (document.getElementById('quiz-container')) {
    initQuiz();
}

// --- Coffee Details Logic ---
const detailsButtons = document.querySelectorAll('.details-btn');

if (detailsButtons.length > 0) {
    detailsButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const detailsDiv = this.nextElementSibling;
            detailsDiv.classList.toggle('hidden');

            if (detailsDiv.classList.contains('hidden')) {
                this.textContent = "Részletek";
            } else {
                this.textContent = "Kevesebb";
            }
        });
    });
}