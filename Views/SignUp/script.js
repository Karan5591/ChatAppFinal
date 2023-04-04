const registerbutton=document.querySelector('#RegisterButton');
const login=document.querySelector('#LoginButton');

login.addEventListener('click', ()=>{
    window.location.href='./index.html';
})


registerbutton.addEventListener('click',event=>{
    event.preventDefault();
    const username=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const phone=document.getElementById('mobile').value;
    const password=document.getElementById('password').value;

    console.log(username,email,phone,password);
    axios.post('http://localhost:4000/signup',{
        username:username,
        email:email,
        phone:phone,
        password:password
    }).then((response) => {
        console.log(response);
        alert(response.data.msg)
        document.getElementById('name').value=''
        document.getElementById('email').value=''
        document.getElementById('mobile').value=''
        document.getElementById('password').value=''
        window.location.href='../Login/login.html'
    }).catch((err) => {
        console.log(err);
        alert(err.response.data.msg)
    });
    
})