// Event listener za dugme "Pošalji"
document
  .getElementById("send-user-message")
  .addEventListener("click", sendMessage);

// Event listener za pritisak tastera Enter u input polju
document
  .getElementById("user-message-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

// Funkcija za slanje poruke
function sendMessage() {
  const messageInput = document.getElementById("user-message-input");
  const messageText = messageInput.value.trim();

  if (messageText !== "") {
    appendMessage("user", messageText);
    messageInput.value = "";

    setTimeout(() => {
      botResponse(messageText.toLowerCase());
    }, 500); // Kašnjenje za simulaciju odgovora bota
  }
}

// Funkcija za odgovor bota
function botResponse(message) {
  let reply;

  if (message.includes("zdravo")) {
    reply = "Zdravo! Kako mogu da vam pomognem?";
  } else if (message.includes("kako si")) {
    reply = "Dobro sam, hvala na pitanju!";
  } else if (message.includes("cao")) {
    reply = "Cao, kako si?";
  } else if (message.includes("koja je najbrža životinja")) {
    reply = "Najbrža životinja na kopnu je gepard.";
  } else if (message.includes("koja je najveća životinja")) {
    reply = "Najveća životinja na svetu je plavi kit.";
  } else if (message.includes("koliko godina živi pas")) {
    reply = "Psi obično žive između 10 i 13 godina.";
  } else if (message.includes("šta jedu mačke")) {
    reply = "Mačke su mesožderi i jedu meso.";
  } else {
    reply = "Žao mi je, nisam razumeo vašu poruku.";
  }

  appendMessage("bot", reply);
}

// Funkcija za dodavanje poruke u chat
function appendMessage(sender, text) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.innerHTML = `<span class="username">${
    sender === "user" ? "User" : "Chat Bot"
  }:</span> ${text}`;

  const messagesContainer = document.getElementById("messages");
  messagesContainer.appendChild(messageElement);

  // Pomeranje scroll-a na dno kontejnera sa porukama
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
