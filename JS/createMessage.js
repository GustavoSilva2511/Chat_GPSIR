function createMessage(user, content, send) {

    let loading = CE("div", "loading")

    if (!send) {
        let point = CE("div", "point1")
        let point2 = CE("div", "point2")
        let point3 = CE("div", "point3")

        loading.appendChild(point)
        loading.appendChild(point2)
        loading.appendChild(point3)
        
    }

    let textContent = CE("p", "text-content", "class", content);
    let messageContent = CE("div", send ? "user-content" : "chat-content");
    messageContent.appendChild(textContent);

    
    let username = CE("p", "user-name", "class", user);
    let message = CE("div", send ? "user-message" : "chat-message");
    let id = user + "-" + Date.now();
    message.id =  id;

    message.appendChild(username)

    if (!send) {
        message.appendChild(loading)
        messageContent.style = "display: none"
    }

    message.appendChild(messageContent)


    return [message, id];
}