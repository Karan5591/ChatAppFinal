const send_button=document.getElementById('send_button');
const message_container=document.getElementById('message_container');
const newgroup=document.getElementById('newgroup');
const groups=document.querySelector('.groups');
const msg=[]
let open=false;
const socket=io();

//===========================Send Message====================

send_button.addEventListener('click',event=>{
    event.preventDefault();
    const token=localStorage.getItem('token')
    const id=localStorage.getItem('groupId')
    const message_input=document.getElementById('message_input').value;
    msg.push(message_input)
    localStorage.setItem('messages',msg)
    document.getElementById('message_input').value=''
    console.log(message_input);
    console.log(token);
    const uNmae=localStorage.getItem("name");
    sendMessage(message_input)
    
    //Send msg to server

    function sendMessage(msg){
        let msg1={
            user:  uNmae,
            message:msg
        }
        console.log(msg1);

        //append message

        appendMessage(msg1)
        stayBottom();

        //Send to server using socket

        socket.emit("message",msg1);

    }

    function appendMessage(msgs)
    {
        let mainDiv= document.createElement('div')
        
    mainDiv.classList.add('message')
let markup= `
   <h5>${msgs.user}</h5>
   <p>${msgs.message}</p>
   
`
mainDiv.innerHTML=markup
message_container.appendChild(mainDiv)
    }
    
    //Recieve messages

    socket.on('message', (msg)=>{
        appendMessage(msg);
    })
    stayBottom();

    //Stay on bottom for new msg

    function stayBottom()
    {
        message_container.scrollTop=message_container.scrollHeight;
    }


    axios.post(`http://localhost:4000/groupmessage/${id}`,{
        message:message_input
    },{headers:{'Authorization':token}}).then((response) => {
        console.log(response);
    }).catch((err) => {
        console.log(err);
    });
})

//================================On page load=============================

window.addEventListener('DOMContentLoaded',event=>
{
  const token=localStorage.getItem('token');
    axios.get('http://localhost:4000/getgroups',{
        headers:{
            'Authorization':token
        }})
    .then(results=>{
        localStorage.setItem("name",results.data[0].name);
        results.data.forEach(result=>{
        const button=document.createElement('button');
        button.setAttribute('class','grp1');
        button.setAttribute('id',result.groupId);
        button.appendChild(document.createTextNode(`${result.groupname}`));
        groups.appendChild(button)

        })
    })
    .catch(err=>{
        console.log(err);
    })
})


//===================================Create Groups===============

newgroup.addEventListener('click',event=>{
    event.preventDefault();
    location.replace('../creategroup/create.html');
})

//================================ Check group details==========================

groups.addEventListener('click',event=>{
    event.preventDefault();
    console.log(event.target.innerHTML);
    localStorage.setItem('groupname',event.target.innerHTML)
    document.getElementById('name').innerHTML=event.target.innerHTML;
    const id=event.target.id;
    localStorage.setItem('groupId',id);
    //setInterval(messages,10000);
    messages();
})

if(localStorage.getItem('groupId'))
{
function messages(){
    const id=localStorage.getItem('groupId')

    const token=localStorage.getItem('token');
    axios.get(`http://localhost:4000/gropumessages/${id}`,{headers:{'Authorization':token}})
    .then(result=>{
        console.log(result);
        message_container.innerHTML='';
        result.data.messages.forEach(message => 
        {            
    let mainDiv= document.createElement('div')
        
    mainDiv.classList.add('message')
let markup= `
   <h5>${message.name}</h5>
   <p>${message.message}</p>
   
`
mainDiv.innerHTML=markup
message_container.appendChild(mainDiv)

    });
    })
    .catch(err=>{
        console.log(err);
    })

}
}

//=========================Check Participants====================

document.getElementById('participants').addEventListener('click',event=>
{
    event.preventDefault();
    location.replace('./participants.html');
})

//=============================Sign Out===================================

document.getElementById('signout').addEventListener("click", () => 
{
  localStorage.clear();
  location.replace("/index.html");
});