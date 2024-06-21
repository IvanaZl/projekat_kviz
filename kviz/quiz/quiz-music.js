const questions = [
  {
    question: 'Koji bend je poznat po hitu "Bohemian Rhapsody"?',
    answers: {
      a: "The Beatles",
      b: "Led Zappelin",
      c: "Queen",
      d: "Pink Floyd",
    },
    correctAnswer: "c",
  },
  {
    question:
      "Koji je bio prvi album Michaela Jacksona koji je prodao više od 20 miliona kopija?",
    answers: {
      a: "Bad",
      b: "Off the Wall",
      c: "Thriller",
      d: "Dangerous",
    },
    correctAnswer: "c",
  },
  {
    question:
      'Koji je poznati rok bend izdao album "The Dark Side of the Moon" 1973. godine?',
    answers: {
      a: "Pink Floyd",
      b: "The Rolling Stones",
      c: "The Who",
      d: "Genesis",
    },
    correctAnswer: "a",
  },
  {
    question: 'Koja pevačica je poznata po pesmi "Rolling in the Deep"?',
    answers: {
      a: "Beyoncé",
      b: "Adele",
      c: "Taylor Swift",
      d: "Rihanna",
    },
    correctAnswer: "b",
  },
  {
    question:
      "Koji muzički žanr potiče iz Jamajke i popularizovao ga je Bob Marley?",
    answers: {
      a: "Reggae",
      b: "Ska",
      c: "Calypso",
      d: "Dub",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Koji je prvi hit singl Madonne koji je stigao do vrha Billboard Hot 100 liste?",
    answers: {
      a: "Like a Virgin",
      b: "Holiday",
      c: "Material Girl",
      d: "Borderline",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Koji je instrument najpoznatiji po izvođenju glavnih melodija u džez muzici?",
    answers: {
      a: "Truba",
      b: "Klavir",
      c: "Gitara",
      d: "Saksofon",
    },
    correctAnswer: "d",
  },
  {
    question:
      "Koja pesma grupe Nirvana je postala himna grunge pokreta početkom 1990-ih?",
    answers: {
      a: "Smells Like Teen Spirit",
      b: "Come As You Are",
      c: "Lithium",
      d: "In Bloom",
    },
    correctAnswer: "a",
  },
  {
    question: 'Ko je pevač pesme "Purple Rain" i istoimenog albuma?',
    answers: {
      a: "Prince",
      b: "David Bowie",
      c: "Elton John",
      d: "Stevie Wonder",
    },
    correctAnswer: "a",
  },
  {
    question:
      "Koji je prvi hip-hop album osvojio Grammy nagradu za album godine?",
    answers: {
      a: "The Miseducation of Lauryn Hill",
      b: "The Marshall Mathers LP",
      c: "To Pimp a Butterfly",
      d: "The Blueprint",
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
