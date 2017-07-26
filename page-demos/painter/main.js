let canvas = document.querySelector('#board');
let html = document.documentElement;
canvas.width = html.clientWidth;
canvas.height = html.clientHeight;

let action = 'pen'
let pen = document.querySelector('#pen');
let eraser = document.querySelector('#eraser')
let clear = document.querySelector('#clear');

let context = canvas.getContext('2d');
let previousPoint

pen.addEventListener('click',function(e){
    action = 'pen';
    e.currentTarget.classList.add('active')
})
eraser.addEventListener('click',function(e){
    action = 'eraser';
    e.currentTarget.classList.add('active')
})

canvas.addEventListener('touchstart',function(e){
    previousPoint = e.touches[0];
})

canvas.addEventListener('touchmove',function(e){
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
})

clear.onclick = function(e){
    e.currentTarget.classList.add('active')
    context.clearRect(0,0,canvas.width,canvas.height);
}

