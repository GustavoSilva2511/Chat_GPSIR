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
    let res = ifCreate(text);
    let idMessage = receiveMessage("...");

    if (res[0]) {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '1dd352a2ccmshaf2288499304910p10232cjsn25c75ddc300b',
                'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
            },
            body: `{"prompt":"${res[1]}","n":2,"size":"1024x1024"}`
        };
        
        fetch('https://openai80.p.rapidapi.com/images/generations', options)
        .then(response => response.json())
        .then(response => {
            let textContent = document.querySelector(`#${idMessage} .text-content`);
            textContent.innerHTML = "Aqui estão duas imagens que consegui criar!";
            let chatContent = document.querySelector(`#${idMessage} .chat-content`);
            chatContent.style = "display: flex"
            let chatLoading = document.querySelector(`#${idMessage} .loading`);
            chatLoading.style = "display: none"

            let img = CE("img", "img-created")
            img.src = response.data[0].url;
            let img2 = CE("img", "img-created")
            img2.src = response.data[1].url;

            chatContent.appendChild(img)
            chatContent.appendChild(img2)


        })
        .catch(err =>   {
            receiveMessage("Sorry, I can't to respond you now, try later!")
            console.log(err)
        });

    } else {
        const options = {   
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '1dd352a2ccmshaf2288499304910p10232cjsn25c75ddc300b',
                'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
            },
            body: `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"${text}"}]}`
        };
        
        fetch('https://openai80.p.rapidapi.com/chat/completions', options)
        .then(response => response.json())
        .then(response => {
            let textContent = document.querySelector(`#${idMessage} .text-content`);
            textContent.innerHTML = response.choices[0].message.content;
            let chatContent = document.querySelector(`#${idMessage} .chat-content`);
            chatContent.style = "display: flex"
            let chatLoading = document.querySelector(`#${idMessage} .loading`);
            chatLoading.style = "display: none"
            document.getElementById("mode").innerHTML = response.choices[0].message.role

        })
        .catch(err => {
            receiveMessage("Sorry, I can't to respond you now, try later!")
            console.log(err)
        });
    }


    

}