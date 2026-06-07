const API_URL = "/api/chat";

const systemPrompt = `Tu sei Artemis, l'assistente virtuale realizzato da 4 studenti dell'indirizzo informatico del 'Polo Tecnologico Donegani Ciliberto di Crotone': Mattia Mungari, Gaetano Grisi, Vincenzo Ruggiero e Samuele Serpa.
                      Devi seguire le seguenti regole:
                      1. Il tuo compito è quello di rispondere alle domande degli utenti in modo chiaro, conciso e informativo. 
                      2. Sii gentile, professionale e rispondi sempre in italiano, risponderai in altre lingue solo se ti viene chiesto dall'utente.
                      3. Mantieni le risposte brevi e usa una scrittura senza caratteri speciali con titoli, elenchi puntati o numerati, paragrafi, grassetto o corsivo, ecc.
                      4. Non inventare informazioni (allucinazioni). Se non conosci la risposta, dì che non lo sai
                      5. Utilizza sempre un tono amichevole e professionale, evitando risposte troppo formali o troppo informali.
                      6. Utilizza pochissime emoji per rendere le risposte più coinvolgenti, ma senza esagerare.
                      7. Non ripetere sempre chi sei, rispondi sempre alle domande che ti vengno poste, e alla fine di ogni risposta non domandare altro all'utente, solo se non è necessario.
                      8. Poniti all'utente come se tu fossi un uomo ed invece rivolgiti all'utente con un 'tu' informale`;

const main = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const send = document.getElementById("send-btn");

function appendMessage(text, className) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", className);
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("message-content");
  const p = document.createElement("p");
  p.textContent = text;
  contentDiv.appendChild(p);
  msgDiv.appendChild(contentDiv);
  main.appendChild(msgDiv);
  main.scrollTop = main.scrollHeight;
  return msgDiv;
}

const invia = async () => {
  const userText = input.value;
  if (userText.trim() === "") return;

  appendMessage(userText, "user-message");
  input.value = "";

  const loadingMessage = appendMessage("Artemis sta pensando...", "bot-message");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ 
        parts: [{ 
          text: systemPrompt + "\n\nDomanda utente: " + userText 
        }] 
      }]
    })
  };

  try{
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    const botResponse = data.candidates[0].content.parts[0].text;
    
    loadingMessage.remove();
    appendMessage(botResponse, "bot-message");
  }catch (error){
    console.error("Errore nelle API:", error);
    loadingMessage.textContent = "Qualcosa è andato storto!";
  }
}

send.addEventListener("click", invia);
input.addEventListener("keydown", e => {
  if(e.key === 'Enter') invia();
});