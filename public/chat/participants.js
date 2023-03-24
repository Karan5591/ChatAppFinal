
const participants=document.querySelector('.participants')
const button=document.getElementById('button')


document.getElementById('back').addEventListener('click',event=>{
    event.preventDefault();
    location.replace('./chat.html')
})
function showPaticipans(participant){
    console.log(participant.isAdmin);
    if(participant.isAdmin==true || participant.isAdmin=='true'){
    participants.innerHTML+=`<hr><h2 style="color:white;font-size:large;margin:15px;">${participant.name}-- admin</h2>`
    }else{
    participants.innerHTML+=`<hr><div id="row"><h2 style="color:white;font-size:large;margin:15px;">${participant.name}</h2><button id='admin' class=${participant.userId}>admin</button> <button id='remove' class=${participant.userId}>remove</button></div>`

    }

}

function members(){
    const id=localStorage.getItem('groupId');
    const token=localStorage.getItem('token');
axios.get(`http://localhost:4000/getmembers/${id}`,{headers:{'Authorization':token}})
.then((result) => {
    console.log(result);
    result.data.result.forEach(element => {
        showPaticipans(element)
    });
}).catch((err) => {
    console.log(err);
});
}
members()


button.addEventListener('click',event=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const option=document.getElementById('options').value;
    const id=localStorage.getItem('groupId');
    const token=localStorage.getItem('token');
    axios.post(`http://localhost:4000/addparticipants/${id}`,{
        email:email,
        option:option
    },{headers:{'Authorization':token}})
    .then(result=>{
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
    })
})


participants.addEventListener('click',event=>{
    const id=localStorage.getItem('groupId');
    const token=localStorage.getItem('token');
    event.preventDefault();
    console.log(event.target.innerHTML);
    if(event.target.id='admin'){
        console.log(event.target.classList.value)
        const userId=event.target.classList.value
        axios.post(`http://localhost:4000/admin/${id}`,{userId:userId},{headers:{'Authorization':token}})
        .then(result=>{
            console.log(result);
            location.reload();
        })
        .catch(err=>{
            console.log(err);
        })
    }
    if(event.target.id='remove'){
        console.log(event.target.classList.value)
        const userId=event.target.classList.value
        axios.post(`http://localhost:4000/remove/${id}`,{userId:userId},{headers:{'Authorization':token}})
        .then(result=>{
            console.log(result);
            location.reload();
        })
        .catch(err=>{
            console.log(err);
        })
    }
})