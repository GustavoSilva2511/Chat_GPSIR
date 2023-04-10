function sendMessage() {
    let text = document.getElementById("message-content").value.trim();
    document.getElementById("message-content").value = ""
    if (text) {

        let infoSession = JSON.parse(sessionStorage.getItem("info-session"));
        infoSession.messages.push({role: infoSession.username, content: text});
        let infoUpdated = JSON.stringify(infoSession);
        sessionStorage.setItem("info-session", infoUpdated);

        let chat = document.getElementById("chat");
        let message = createMessage(localStorage.getItem("usertag"), text, true);
        chat.appendChild(message[0]);
        document.getElementById("empty").style = "display: none";
    }

    return text;
}
