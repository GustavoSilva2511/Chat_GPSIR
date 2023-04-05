async function getAnswer(){
    let text = sendMessage()
    let idMessage = receiveMessage("...")
    let encypt = sha256(idMessage)
    console.log(encypt)
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