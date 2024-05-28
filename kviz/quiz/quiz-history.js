const questions = [
    {
      question: "Kako su glasila imena trojice sinova Stefana Nemanje",
      answers: {
        a: "Stefan, Sava i Milutin",
        b: "Dušan, Rastko i Stefan",
        c: "Vukan, Milutin i Rastko",
        d: "Vukan, Stefan i Rastko",
      },
      correctAnswer: "d",
    },
    {
      question:
        "U kom mestu je Karađorđe izabran za vođu Prvog srpskog ustanka?",
      answers: {
        a: "Takovo",
        b: "Orašac",
        c: "Beograd",
        d: "Kragujevac",
      },
      correctAnswer: "b",
    },
    {
      question:
        "Koje godine su Turci osvojili Beograd?",
      answers: {
        a: "1521. godine",
        b: "1523. godine",
        c: "1531. godine",
        d: "1532. godine",
      },
      correctAnswer: "a",
    },
    {
      question: "Kneza Miloša je 1839. godine na čelu Srbije nasledio:",
      answers: {
        a: "Milan Obrenović",
        b: "Mihailo Obrenović",
        c: "Aleksandar Karađorđević",
        d: "Petar Karađorđević",
      },
      correctAnswer: "a",
    },
    {
      question: "U kom gradu se Dušan Nemanjić krunisao za cara 1346. godine?",
      answers: {
        a: "Ras",
        b: "Prizren",
        c: "Ser",
        d: "Skoplje",
      },
      correctAnswer: "d",
    },
    {
      question: "Koje godine dolazi do poslednje smene dinastija Obrenović i Karađorđević na čelu Srbije?",
      answers: {
        a: "1901. godine",
        b: "1902. godine",
        c: "1903.godine",
        d: "1904. godine",
      },
      correctAnswer: "c",
    },
    {
      question: "Koju titulu je imao Lazar Hrebeljanović?",
      answers: {
        a: "Vojvoda",
        b: "Knez",
        c: "Kralj",
        d: "Car",

      },
      correctAnswer: "b",
    },
    {
      question: "Za zasluge u Kolubarskoj bici 1914. godine čin vojvode dobio je:",
      answers: {
        a: "Živojin Mišić",
        b: "Stepa Stepanović",
        c: "Radomir Putnik",
        d: "Petar Bojović",
      },
      correctAnswer: "a",
    },
    {
      question: "Ko je bio prvi novovekovni kralj Srbije?",
      answers: {
        a: "Petar Karađorđević",
        b: "Miloš Obrenović",
        c: "Milan Obrenović",
        d: "Mihailo Obrenović",
      },
      correctAnswer: "c",
    },
    {
      question: "Ko je podigao manastir Mileševu?",
      answers: {
        a: "Kralj Stefan Prvovenčani",
        b: "Sveti Sava",
        c: "Car Dušan",
        d: "Kralj Vladislav",
      },
      correctAnswer: "d",
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
  