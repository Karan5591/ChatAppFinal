
const participants=document.querySelector('.participants')
const button=document.getElementById('button')


document.getElementById('back').addEventListener('click',event=>{
    event.preventDefault();
    location.replace('./chat.html')
})
function showPaticipants(participant){
    
    participants.innerHTML+=`<hr><div id="row"><h2 style="color:white;font-size:large;margin:15px;">${participant.name}</h2>`

    }



function members(){
    const id=localStorage.getItem('groupId');
    const token=localStorage.getItem('token');
axios.get(`http://localhost:4000/getmembers/${id}`,{headers:{'Authorization':token}})
.then((result) => {
    console.log(result);
    result.data.result.forEach(element => {
        showPaticipants(element)
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


