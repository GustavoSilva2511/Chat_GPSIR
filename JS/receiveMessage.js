function receiveMessage(content) {
    let chat = document.getElementById("chat");
    let message = createMessage("Chat_GPSIR", content, false);
    chat.appendChild(message[0]);
    return message[1]
}