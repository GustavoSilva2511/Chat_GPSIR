
function existChat() {
    let exist = sessionStorage.getItem("info-session");
    let userTag = localStorage.getItem("usertag");

    if (!exist) {
        info = {
            messages: [],
            username: "user",
        }
        let infoString = JSON.stringify(info);
        sessionStorage.setItem("info-session", infoString);
    } else {
        // let infos = JSON.parse(exist);
        // infos?.messages?.forEach(message => {
        //     if (message.role == "user") {       
        //         let Chat = document.getElementById("chat")
        //         let Message = createMessage(infos.usertag, message.content, true);
        //         Chat.appendChild(Message[0])
        //         document.getElementById("empty").style = "display: none";
                
        //     } else {
        //         let res = receiveMessage("...");

        //         let textContent = document.querySelector(`#${res} .text-content`);
        //         textContent.innerHTML = message.content;
        //         let chatContent = document.querySelector(`#${res} .chat-content`);
        //         chatContent.style = "display: flex";
        //         let chatLoading = document.querySelector(`#${res} .loading`);
        //         chatLoading.style = "display: none";
        //         document.getElementById("mode").innerHTML = message.role;
        //     }
        // })
    }

    if (!userTag) {
        let usertag = window.prompt("Nome de usuário: ")
        localStorage.setItem("usertag", usertag)
    }
}

existChat();
