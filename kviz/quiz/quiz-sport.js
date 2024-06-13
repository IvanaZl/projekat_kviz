const questions = [
    {
      question: "Ko je osvajač Lige šampiona za sezonu 2023/2024?",
      answers: {
        a: "Real Madrid",
        b: "Mančester Siti",
        c: "Borusija Dortmund",
        d: "Bajern",
      },
      correctAnswer: "a",
    },
    {
      question:
        "Koji klub ima najviše osvojenih Liga šampiona u vaterpolu?",
      answers: {
        a: "Partizan",
        b: "Mladost Zagreb",
        c: "Pro Reko",
        d: "Lacio",
      },
      correctAnswer: "c",
    },
    {
      question:
        "U kojoj državi je osnovana košarka?",
      answers: {
        a: "SAD",
        b: "Engleska",
        c: "Francuska",
        d: "Filipini",
      },
      correctAnswer: "a",
    },
    {
      question:
        "Koliko zlatnih lopti ima Kristijano Ronaldo?",
      answers: {
        a: "3",
        b: "4",
        c: "5",
        d: "6",
      },
      correctAnswer: "c",
    },
    {
      question:
        "Ko drži rekord na 100m u muškoj atletici?",
      answers: {
        a: "Tyson Gay",
        b: "Usain Bolt",
        c: "Yohan Blake",
        d: "Asafa Powell",
      },
      correctAnswer: "b",
    },
    {
      question:
        "Ko je osvajač svetskog prvenstva 2022 u fudbalu?",
      answers: {
        a: "Francuska",
        b: "Engleska",
        c: "Italija",
        d: "Argentina",
      },
      correctAnswer: "d",
    },
    {
      question:
        "Ko je osvojio rukometno prvenstvo Srbije za sezonu 2023/2024?",
      answers: {
        a: "Partizan",
        b: "Crvena Zvezda",
        c: "Metaloplastika",
        d: "Vojvodina",
      },
      correctAnswer: "d",
    },
    {
      question: "Ko drži rekord po broju osvojenih Rolland-Garros titula u tenisu?",
      answers: {
        a: "Rafael Nadal",
        b: "Novak Đoković",
        c: "Roger Federer",
        d: "Henri Cochet",
      },
      correctAnswer: "a",
    },
    {
      question:
        "Koliko zlatnih medalja je osvojila Srbija na OI 2020 u Tokiju?",
      answers: {
        a: "2",
        b: "3",
        c: "4",
      },
      correctAnswer: "b",
    },
    {
      question:
        "Koji fudbaslki trener ima nadimak ,,The Special One",
      answers: {
        a: "Jose Mourinho",
        b: "Pep Guardiola",
        c: "Alex Ferguson",
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
  