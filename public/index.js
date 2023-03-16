const register=document.getElementById("RegisterButton")
register.addEventListener('click', async function()
{
    axios.post("http://localhost:3000/signup",{
        
    name:document.getElementsByName("name")[0].value,
    email:document.getElementsByName("email")[0].value,
    password:document.getElementsByName("password")[0].value,
    mobile: document.getElementsByName("mobile")[0].value
        
    })
    .then(response=>{
        console.log(response);
        alert(`${response.data}.. Login Now?`)
    })
        
})






