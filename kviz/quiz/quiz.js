const startButton = document.getElementById("start-quiz");

startButton.addEventListener("click", () => {
  const themeSelect = document.getElementById("theme");
  const theme = themeSelect.value;
  window.location.href = `quiz-${theme}.html`;
});
