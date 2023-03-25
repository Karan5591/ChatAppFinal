const cbutton=document.querySelector('#LoginButton');
const newUser=document.querySelector('#NewUser')

newUser.addEventListener('click', ()=>{
    window.location.href='/SignUp/signup.html';
})

cbutton.addEventListener('click',event=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    console.log(email,password);

    axios.post('http://localhost:4000/login',{
        email:email,
        password:password
    }).then((response) => {
        console.log(response);
        localStorage.setItem('token',response.data.token)
        alert(response.data.msg)
        document.getElementById('email').value=''
        document.getElementById('password').value=''
        window.location.href='../chat/chat.html';
    }).catch((err) => {
        console.log(err);
        alert(err.response.data.msg)
    });
    
})