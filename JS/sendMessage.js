function sendMessage() {
    document.getElementById("empty").style = "display: none"
    let text = document.getElementById("message-content").value.trim();
    if (text) {
        document.getElementById("message-content").value = ""
        let chat = document.getElementById("chat");
        let message = createMessage("You", text, true)
        chat.appendChild(message[0]);
    }

    return text;
}
