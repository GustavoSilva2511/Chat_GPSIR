function sendMessage() {
    let text = document.getElementById("message-content").value.trim();
    document.getElementById("message-content").value = ""
    if (text) {
        let chat = document.getElementById("chat");
        let message = createMessage("You", text, true)
        chat.appendChild(message[0]);
        document.getElementById("empty").style = "display: none"
    }

    return text;
}
