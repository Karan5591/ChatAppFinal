const messageArea= document.querySelector(".message__area");
document.addEventListener("DOMContentLoaded", (event)=>
{
    
    event.preventDefault();
    const username= localStorage.getItem("name");
    axios.get("http://localhost:3000/getAllMessage",{
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
    console.log(response);
})
}






//========================Send message=============
const message=document.getElementById("send-message");
message.addEventListener('click', (event)=>
{
    
   
})








