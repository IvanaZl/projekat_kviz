const questions = [
  {
    question: "Koja životinja ima prugaste šare i obično je srednje veličine?",
    answers: {
      a: "Tigar",
      b: "Lav",
      c: "Slon",
      d: "Panda",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Koja životinja ima dugačak vrat i obično je najviša životinja na kopnu?",
    answers: {
      a: "Zebra",
      b: "Žirafa",
      c: "Slon",
      d: "Konj",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Koja ptica ima dug vrat, pliva graciozno po vodi i često ima belo perje?",
    answers: {
      a: "Petao",
      b: "Labud",
      c: "Patka",
      d: "Rakun",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Koje kopneno sisarsko stvorenje obično ima dugačku surlu i velike uši?",
    answers: {
      a: "Gepard",
      b: "Iguana",
      c: "Slon",
      d: "Antilopa",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Koje morsko stvorenje ima želatinozno telo i pipke sa žarnim ćelijama?",
    answers: {
      a: "Ajkula",
      b: "Rak",
      c: "Meduza",
      d: "Kit",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Koja sposobnost je ključna za delfine i omogućava im da 'vide' svoj svet kroz zvuk?",
    answers: {
      a: "Termoregulacija",
      b: "Eholokacija",
      c: "Migracija",
      d: "Komunikacija",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Koje stvorenje obično ima sposobnost menjanja boje, dugačak jezik i pokretne oči?",
    answers: {
      a: "Vuk",
      b: "Puma",
      c: "Kameleon",
      d: "Dabar",
    },
    correctAnswer: "c",
  },
  {
    question: "Koja životinja ima dugačak rep i obično se penje po drveću?",
    answers: {
      a: "Veverica",
      b: "Orao",
      c: "Jastreb",
      d: "Paun",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Koja funkcija grba kod kamila omogućava da prežive duge periode bez hrane i vode?",
    answers: {
      a: "Skladištenje vode",
      b: " Konverzija masti u energiju i vodu",
      c: "Održavanje temperature tela",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Koja grupa majmuna obuhvata vrste koje žive u tropskim šumama i savanama Afrike i Azije?",
    answers: {
      a: "Majmuni Starog sveta",
      b: "Majmuni Novog sveta",
      c: "Majmuni Srednjeg sveta",
    },
    correctAnswer: "a",
  },
];

let currentQuestion = 0;
let score = 0;
let submitted = false;

function setQuestion() {
  const question = questions[currentQuestion];
  const questionElement = document.getElementById("question");
  const answerContainer = document.getElementById("answers");
  questionElement.textContent = question.question;
  answerContainer.innerHTML = "";

  for (const letter in question.answers) {
    const answer = question.answers[letter];
    const button = document.createElement("button");
    button.textContent = `${letter.toUpperCase()}: ${answer}`;
    button.dataset.answer = letter;
    button.addEventListener("click", function () {
      if (!submitted) {
        const buttons = answerContainer.querySelectorAll("button");
        buttons.forEach((button) => {
          button.disabled = true;
        });
        button.classList.add("clicked");
      }
    });
    answerContainer.appendChild(button);
  }
}

function checkAnswer() {
  const selectedAnswer = document.querySelector("button.clicked");
  if (!submitted && selectedAnswer) {
    const selectedLetter = selectedAnswer.dataset.answer;
    if (selectedLetter === questions[currentQuestion].correctAnswer) {
      score++;
      showResultMessage("Tačno!");
    } else {
      showResultMessage("Netačno.");
    }
    submitted = true;
  }
}

const submitButton = document.getElementById("submit-answer");
const nextButton = document.getElementById("next-question");
const backButton = document.getElementById("back-question");
const resultMessageElement = document.getElementById("result-message");

submitButton.addEventListener("click", function () {
  checkAnswer();
  submitButton.disabled = true;
});

nextButton.addEventListener("click", function () {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    setQuestion();
    resultMessageElement.textContent = "";
    submitted = false;
    submitButton.disabled = false;
  } else {
    endQuiz();
    score = Math.min(score, questions.length);
    document.getElementById(
      "result-message"
    ).textContent = `Ukupno tačnih odgovora: ${score}/${questions.length}`;
    document.getElementById("result-message").style.display = "block";
  }
});

backButton.addEventListener("click", function () {
  if (currentQuestion > 0) {
    currentQuestion--;
    setQuestion();
    resultMessageElement.textContent = "";
    submitted = false;
    submitButton.disabled = false;
  }
});

function showResultMessage(message = "") {
  resultMessageElement.textContent = message;
  setTimeout(() => {
    resultMessageElement.textContent = "";
  }, 5000);
}

function endQuiz() {
  console.log("Kviz je završen!");
}

setQuestion();
