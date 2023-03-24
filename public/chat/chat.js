const send_button=document.getElementById('send_button');
const message_container=document.getElementById('message-container');
const newgroup=document.getElementById('newgroup');
const groups=document.querySelector('.groups');
const msg=[]
let open=false;
function openForm() {
    if(open){
    document.querySelector('.form').style.display = "none"
    open=false
    } else{  
    open=true;

    document.querySelector('.form').style.display = "block"
    }
 }


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
    axios.post(`http://localhost:4000/groupmessage/${id}`,{
        message:message_input
    },{headers:{'Authorization':token}}).then((response) => {
        console.log(response);
    }).catch((err) => {
        console.log(err);
    });
})

window.addEventListener('DOMContentLoaded',event=>{

    // setInterval(messages,1000);
    // document.getElementById('name').innerHTML=localStorage.getItem('groupname')
    const token=localStorage.getItem('token');
    axios.get('http://localhost:4000/getgroups',{headers:{'Authorization':token}})
    .then(results=>{
        console.log(results);
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

// window.addEventListener('DOMContentLoaded',(event)=>{
//     document.querySelector('.grp1').addEventListener('click',event=>{
//         event.preventDefault();
    
//     setInterval(()=>{
//     const token=localStorage.getItem('token')
//     axios.get('http://localhost:4000/getmessages',{headers:{'Authorization':token}})
//     .then(result=>{
//         console.log(result);
//         message_container.innerHTML='';
//         result.data.messages.forEach(message => {
//             if(result.data.uid==message.userId){
//                 const div=document.createElement('div')
//                 div.appendChild(document.createTextNode(`You:${message.message}`))
//                 div.style.marginLeft='75%'
//                  div.style.backgroundColor='green'
//                 div.style.color='white'
//                 message_container.appendChild(div)
//                 // message_container.innerHtml+=`<div>You:${message.message}</div>`
//             }else{
//                 const div=document.createElement('div')
//                 div.appendChild(document.createTextNode(`${message.name}:${message.message}`))
//                 message_container.appendChild(div)
//                 // message_container.innerHtml+=`<div>${message.name}:${message.message}`
//             }
            
//         });
        
//     })
//     .catch(err=>{
//         console.log(err);
//     })
// },1000)

// })


newgroup.addEventListener('click',event=>{
    event.preventDefault();
    location.replace('../creategroup/create.html');
})

groups.addEventListener('click',event=>{
    event.preventDefault();
    console.log(event.target.innerHTML);
    localStorage.setItem('groupname',event.target.innerHTML)
    document.getElementById('name').innerHTML=event.target.innerHTML;
    const id=event.target.id;
    localStorage.setItem('groupId',id);
    setInterval(messages,1000);
})

if(localStorage.getItem('groupId')){
function messages(){
    document.querySelector('.rightside').style.display='block';
    const id=localStorage.getItem('groupId')
    const token=localStorage.getItem('token');
    axios.get(`http://localhost:4000/gropumessages/${id}`,{headers:{'Authorization':token}})
    .then(result=>{
        console.log(result);
        message_container.innerHTML='';
        result.data.messages.forEach(message => {
            if(result.data.uid==message.userId){
                const div=document.createElement('div')
                div.appendChild(document.createTextNode(`You:${message.message}`))
                div.style.marginLeft='75%'
                 div.style.backgroundColor='green'
                div.style.color='white'
                message_container.appendChild(div)
                // message_container.innerHtml+=`<div>You:${message.message}</div>`
            }else{
                const div=document.createElement('div')
                div.appendChild(document.createTextNode(`${message.name}:${message.message}`))
                message_container.appendChild(div)
                // message_container.innerHtml+=`<div>${message.name}:${message.message}`
            }
        });
    })
    .catch(err=>{
        console.log(err);
    })

}
}

document.getElementById('participants').addEventListener('click',event=>{
    event.preventDefault();
    location.replace('./participants.html');
})

document.getElementById('signout').addEventListener("click", () => {
  localStorage.clear();
  location.replace("../Login/login.html");
});