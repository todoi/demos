let canvas = document.querySelector('#board');
let html = document.documentElement;
canvas.width = html.clientWidth;
canvas.height = html.clientHeight;

let context = canvas.getContext('2d');
let previousPoint;
let action = 'pen'
let size = 3
let previousElement

let nav = document.querySelector('nav.tools');
let clear = document.querySelector('#clear')
let pen = document.querySelector('#pen')
let sizeElement = document.querySelector('#size')

nav.addEventListener('click',function(e){
    let element = e.target;
    while (element.tagName.toLowerCase() !== 'a'){
        if (element === nav){
            element = null;
            break
        }
        element = element.parentNode;
    }
    if ((element !== null) && (!element.classList.contains('deactive')) && (element !== sizeElement)){
        for(let i=0;i<nav.children.length;i++){
            //if(nav.children[i].classList.contains('active')){
                //previousElement = nav.children[i]
            //}
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
        let newWindow = window.open()
        //let newWindow = window.open('about:blank','image from canvas') 会有一个bug 没两次中间一次保存是不行的
        newWindow.document.write('<img src="'+dataURL+'" alt="from canvas">')
        pen.classList.add('active')
        element.classList.remove('active')
        action = 'pen'
    }else if(action === 'download'){
        element.href = canvas.toDataURL();
        element.download = 'mypainting.png';
        element.classList.remove('active')
        action = 'pen'
    //}else if(action === 'size'){
        //previousElement.classList.add('active')
        //action = previousElement.id
        //element.classList.remove('active')
    }
})

canvas.addEventListener('touchstart',function(e){
    previousPoint = e.touches[0];
    size = document.querySelector('#selectSize>option:checked').value
})

canvas.addEventListener('touchmove',function(e){
    e.preventDefault()
    let {clientX,clientY} = e.touches[0];
    if (action === 'pen'){
        if(previousPoint){
            context.strokeStyle = 'red';
            context.lineWidth = size;
            context.beginPath();
            context.moveTo(previousPoint.clientX,previousPoint.clientY);
            context.lineTo(clientX,clientY);
            context.stroke();
        }
        previousPoint = e.touches[0]
    }else if(action === 'eraser'){
        context.clearRect(clientX-size,clientY-size,size*2,size*2);
    }
    clear.classList.remove('deactive')
})


