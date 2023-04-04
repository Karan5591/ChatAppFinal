const back=document.getElementById('back')
const create=document.getElementById('create')


back.addEventListener('click',event=>{
    event.preventDefault();
    location.replace('../chat/chat.html');
})
create.addEventListener('click',event=>{
    const token=localStorage.getItem('token');
    event.preventDefault();
    const groupname=document.getElementById('groupname').value;
    
    document.getElementById('groupname').value='';

    axios.post('http://localhost:4000/creategroup',
    {groupname:groupname},
    {headers:{'Authorization':token}})
    .then((response) => {
        console.log(response);
        alert('Group created successfully..');
        location.replace('../chat/chat.html')
    }).catch((err) => {
        console.log(err);
    });

    

})