const messageArea= document.querySelector(".message__area");
document.addEventListener("DOMContentLoaded", (event)=>
{
    
    event.preventDefault();
    const username= localStorage.getItem("name");
    let checkid=0;
    if(localStorage.getItem("chat"))
    {
        const checkdata= JSON.parse(localStorage.getItem("chat"));
        const len1=checkdata.length;
         checkid=checkdata[len1-1].id;
         

         for(var i=0;i<len1;i++)
        {
            let mainDiv= document.createElement('div')
        let className='outgoing';
         mainDiv.classList.add(className, 'message')
    let markup= `
        <h4>${checkdata[i].name}</h4>
        <p>${checkdata[i].text}</p>
        
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
        }
    }
    
    axios.get("http://localhost:3000/getAllMessage",{
        params:{ids: checkid},
    })
    .then(response=>{
        console.log(response.data);
        for(var i=0;i<response.data.length;i++)
        {
            let mainDiv= document.createElement('div')
        let className='outgoing';
         mainDiv.classList.add(className, 'message')
    let markup= `
        <h4>${response.data[i].user.name}</h4>
        <p>${response.data[i].message}</p>
        
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
        }
        

    })
    addName(username);
});
function addName(message) 
{
    
    const label = document.createElement("Label");
    label.innerHTML = message+" "+"Joined";
   messageArea.appendChild(label);
}

let textarea= document.querySelector("#textarea")
const sendBtn= document.querySelector("#SendMessage");

//=============================Send Message================

sendBtn.addEventListener('click', (e)=>{
   let textmsg= document.getElementById("textarea").value;
   document.getElementById("textarea").value='';
    sendMessage(textmsg);
})

function sendMessage(message)
{
    let msg={
        user: localStorage.getItem("name"),
        message:message
    }
    //append
    appendMesaage(msg, 'outgoing')
}

function appendMesaage(msg, type)
{
    let mainDiv= document.createElement('div')
    let className=type
    mainDiv.classList.add(className, 'message')
    let markup= `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)

    //==============Sending msg to DB===========
    axios.post("http://localhost:3000/message",
{
   message: msg.message,
   token: document.cookie,
}).then(response=>{
    const lar=response.data[0];
    const larger=lar["MAX(`id`)"];

    //===========Adding message to localstorage==========

    if(!localStorage.getItem("chat")){
        localStorage.setItem("chat", JSON.stringify([]));
        }
        var chatHistory = JSON.parse(localStorage.getItem("chat"));
        var send = document.getElementById('sendMessage');

        var message={
            
            id : larger,
            name: localStorage.getItem("name"),
            text : msg.message,
            
        };
        localData = localStorage.getItem("chat");
        localData = JSON.parse(localData);
        if(localData.length>10)
        {
           chatHistory.shift();
           chatHistory.push(message);
        document.getElementById('textarea').value = "";
        localStorage.setItem("chat", JSON.stringify(chatHistory));
       }
       else
       {
           chatHistory.push(message);
        document.getElementById('textarea').value = "";
        localStorage.setItem("chat", JSON.stringify(chatHistory));
       }

})
}








