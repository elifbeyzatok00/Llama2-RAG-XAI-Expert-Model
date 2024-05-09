// Mesaj giriş öğesini ("message-input") DOM'dan al
const messageInput = document.getElementById("message-input");

// Sohbet geçmişi öğesini ("chat-history") DOM'dan al
const chatHistory = document.getElementById("chat-history");

// Sohbet formu öğesini ("chat-form") DOM'dan al
const chatForm = document.getElementById("chat-form");

// Sohbet formu gönderildiğinde tetiklenecek event listener
chatForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Formun varsayılan gönderim işlemini engelle

  // Mesaj girişindeki metni al ve boşlukları temizle
  const message = messageInput.value.trim();

  if (message) {
    // Mesaj boş değilse
    fetch("https://ef97-34-87-169-71.ngrok-free.app/completion/llama2", {
      // Belirtilen API uç noktasına istek gönder
      method: "POST", // POST metodu kullan
      body: JSON.stringify({ prompt: message }), // Gönderilecek veriyi JSON formatında hazırla
    })
      .then((response) => response.json()) // Yanıt geldiğinde JSON'a dönüştür
      .then((data) => {
        // Sohbet geçmişine kullanıcı mesajını ekle
        //addMessage("you", message);

        // Embedding verisini görüntüle (gerekirse değiştir)
        const embeddingDiv = document.createElement("div");
        console.log(JSON.stringify(data.response));
        debugger;
        embeddingDiv.innerText = `Answer: ${JSON.stringify(
          data.response
        )} \n Source_Article: ${JSON.stringify(
          data.source_article
        )}  \n Source_Article_Page: ${JSON.stringify(
          data.source_article_page
        )}`;
        chatHistory.appendChild(embeddingDiv);
        chatHistory.appendChild(embeddingDiv);

        // Mesaj girişini temizle
        messageInput.value = "";
      });
  }
});
