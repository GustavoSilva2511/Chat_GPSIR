function ifCreate(text) {
    let arrayWords = text.split(" ");
    if (arrayWords[0] == "/image") {
        let string = "";
        arrayWords.shift();
        arrayWords.forEach((word) => {
            string = string + " " + word;
        });
        return [true, string];
    }
    return [false, ""];
}

async function getAnswer(){
    let text = sendMessage();

    if (!text.trim()) {
        return false
    }

    let res = ifCreate(text);    
    let idMessage = receiveMessage("...");
    document.location.href = `#${idMessage}`

    if (res[0]) {
        // fetch("./JS/config.json")
        // .then(res => res.json())
        // .then(data => {
        //     const options = {
        //         method: 'POST',
        //         headers: {
        //             'content-type': 'application/json',
        //             'X-RapidAPI-Key': data.token,
        //             'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
        //         },
        //         body: `{"prompt":"${res[1]}","n":2,"size":"1024x1024"}`
        //     };

        //     fetch('https://openai80.p.rapidapi.com/images/generations', options)
        //     .then(response => response.json())
        //     .then(response => {
        //         let textContent = document.querySelector(`#${idMessage} .text-content`);
        //         textContent.innerHTML = "Aqui estão duas imagens que consegui criar!";
        //         let chatContent = document.querySelector(`#${idMessage} .chat-content`);
        //         chatContent.style = "display: flex"
        //         let chatLoading = document.querySelector(`#${idMessage} .loading`);
        //         chatLoading.style = "display: none"
    
        //         let img = CE("img", "img-created")
        //         img.src = response?.data[0].url;
        //         let img2 = CE("img", "img-created")
        //         img2.src = response?.data[1].url;
    
        //         chatContent.appendChild(img)
        //         chatContent.appendChild(img2)
    
    
        //     })
        //     .catch(err =>   {
        //         receiveMessage("Sorry, I can't to respond you now, try later!")
        //         console.log(err)
        //     });

        // })
        
    } else {
        fetch("./JS/config.json")
        .then(res => res.json())
        .then(data => {
            let infoSession = JSON.parse(sessionStorage.getItem("info-session"));
            let messages = JSON.stringify(infoSession.messages)
            const options = {   
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': data.token,
                    'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
                },
                body: `{"model":"gpt-3.5-turbo","messages":${messages}}`
            };
            
            fetch('https://openai80.p.rapidapi.com/chat/completions', options)
            .then(response => response.json())
            .then(response => {
                let textContent = document.querySelector(`#${idMessage} .text-content`);
                textContent.innerHTML = response?.choices ? response?.choices[0].message.content : "Seguinte, a api deu o limite kkkkkkkkkkk";
                let chatContent = document.querySelector(`#${idMessage} .chat-content`);
                chatContent.style = "display: flex"
                let chatLoading = document.querySelector(`#${idMessage} .loading`);
                chatLoading.style = "display: none"
                let nameChat = document.querySelector(`#${idMessage} .user-name`);
                response?.choices ? "" : nameChat.innerHTML = "Admin";
                document.getElementById("mode").innerHTML = response?.choices[0].message.role;
    
                if (response?.choices) {
                    let infoSession = JSON.parse(sessionStorage.getItem("info-session"));
                    let Role = response?.choices[0].message.role;
                    let Content = response?.choices[0].message.content;
                    infoSession.messages.push({role: Role, content: Content});
                    let infoUpdated = JSON.stringify(infoSession);
                    sessionStorage.setItem("info-session", infoUpdated);
                }
    
            })
            .catch(err => {
                console.log(err)
            })
            
        });    
    }
}