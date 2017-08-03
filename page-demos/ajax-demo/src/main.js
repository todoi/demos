loginForm.addEventListener('submit',function(e){
    e.preventDefault()
    let request = new XMLHttpRequest()
    request.onload = function(){
        console.log(request)
    }
    let username = loginForm.username.value
    let password = loginForm.password.value
    request.open('POST','/login')
    request.send(`username=${username}&password=${password}`)
    console.log(request)
},false)
