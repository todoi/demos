let canvas = document.querySelector('#board');
let html = document.documentElement;
canvas.width = html.clientWidth;
canvas.height = html.clientHeight;

let action = 'pen'
let context = canvas.getContext('2d');
let previousPoint;
let nav = document.querySelector('nav.tools');
let clear = document.querySelector('#clear')
let pen = document.querySelector('#pen')
let download = document.querySelector('#download')

nav.addEventListener('click',function(e){
    let element = e.target;
    e.preventDefault()
    while (element.tagName.toLowerCase() !== 'a'){
        if (element === nav){
            element = null;
            break
        }
        element = element.parentNode;
    }
    if ((element !== null) && (!element.classList.contains('deactive'))){
        for(let i=0;i<nav.children.length;i++){
            nav.children[i].classList.remove('active')
        }
        element.classList.add('active')
        action = element.id
    }
    if (action === 'clear'){
        context.clearRect(0,0,canvas.width,canvas.height);
        clear.className = 'deactive'
        pen.classList.add('active')
        action = 'pen'
    }else if(action === 'save'){
        let dataURL = canvas.toDataURL('image/png')
        let newWindow = window.open('about:blank','image from canvas')
        newWindow.document.write('<img src="'+dataURL+'" alt="from canvas">')
    }
})

download.onclick = function(e){
    download.href = canvas.toDataURL();
    download.download = 'image.png';
}

canvas.addEventListener('touchstart',function(e){
    previousPoint = e.touches[0];
})

canvas.addEventListener('touchmove',function(e){
    e.preventDefault()
    let {clientX,clientY} = e.touches[0];
    if (action === 'pen'){
        if(previousPoint){
            context.strokeStyle = 'red';
            context.beginPath();
            context.moveTo(previousPoint.clientX,previousPoint.clientY);
            context.lineTo(clientX,clientY);
            context.stroke();
        }
        previousPoint = e.touches[0]
    }else if(action === 'eraser'){
        context.clearRect(clientX-5,clientY-5,10,10);
    }
    clear.classList.remove('deactive')
})


