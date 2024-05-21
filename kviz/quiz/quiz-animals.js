const questions = [
  {
    question: "Koja životinja ima prugaste šare i obično je srednje veličine?",
    answers: {
      a: "Tigar",
      b: "Lav",
      c: "Slon",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Koja životinja ima dugačku vrat i obično je najviša životinja na kopnu?",
    answers: {
      a: "Zebra",
      b: "Žirafa",
      c: "Slon",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Koja životinja ima krzno, voli da skače i obično ima velike uši?",
    answers: {
      a: "Medved",
      b: "Zec",
      c: "Lav",
    },
    correctAnswer: "b",
  },
  {
    question: "Koja životinja živi u vodi i obično ima peraja i rep?",
    answers: {
      a: "Galeb",
      b: "Hobotnica",
      c: "Riba",
    },
    correctAnswer: "c",
  },
  {
    question: "Koja životinja ima dugačak rep i može biti kućni ljubimac?",
    answers: {
      a: "Hrčak",
      b: "Mačka",
      c: "Kunić",
    },
    correctAnswer: "b",
  },
  {
    question: "Koja životinja ima široko telo, oklop i obično se kreće polako?",
    answers: {
      a: "Kornjača",
      b: "Zec",
      c: "Koala",
    },
    correctAnswer: "a",
  },
  {
    question: "Koja životinja ima velike kandže i često lovi noću?",
    answers: {
      a: "Vuk",
      b: "Puma",
      c: "Leopard",
    },
    correctAnswer: "c",
  },
  {
    question: "Koja životinja ima dugačak rep i obično se penje po drveću?",
    answers: {
      a: "Veverica",
      b: "Orao",
      c: "Jastreb",
    },
    correctAnswer: "a",
  },
  {
    question: "Koja životinja ima bodlje i obično se kreće po zemlji?",
    answers: {
      a: "Jež",
      b: "Jazavac",
      c: "Veverica",
    },
    correctAnswer: "a",
  },
  {
    question: "Koja životinja ima dug i tanak rep i obično se krije u pesku?",
    answers: {
      a: "Krtica",
      b: "Koala",
      c: "Kameleon",
    },
    correctAnswer: "c",
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
