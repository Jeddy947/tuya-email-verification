const getCode = ()=>{
    const email = document.getElementById("email").value
    fetch("/receivecode",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                emailaddress: email
            })
        })
}
const confirm = () =>{
    const enteredCode = document.getElementById("confirm").value
    fetch("/confirm",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            verificationCode : enteredCode
        })
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        if(data.confirm){
            window.alert("VERIFIED")
        }
        else{
            window.alert("WRONG CODE")
        }
    }) 
}