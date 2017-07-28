let board = document.querySelector('#board')
let canvas = document.querySelector('#canvas');
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
let textarea

nav.addEventListener('click',function(e){
    let element = e.target;
    while (element.tagName.toLowerCase() !== 'a'){
        if (element === nav){
            element = null;
            break
        }
        element = element.parentNode;
    }
    if ((element !== null) && (!element.classList.contains('deactive')) && (element !== sizeElement)){ //element !== sizeElement避免action 不为pen或eraser或textarea
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
        let newWindow = window.open()
        //let newWindow = window.open('about:blank','image from canvas') 会有一个bug 两次中间一次保存是不行的
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
function stopEventPropagation(e){
        e.stopPropagation()
}

board.addEventListener('touchstart',function(e){
    let {clientX,clientY} = e.touches[0]
    previousPoint = e.touches[0];
    size = document.querySelector('#selectSize>option:checked').value
    if(action === 'textarea'){ //点击画板，出现文本款
        textarea = document.createElement('textarea')
        textarea.className = 'text-input'
        board.appendChild(textarea)
        textarea.style['font-size'] = size*5 + 'px';
        textarea.style['line-height'] = size*5 + 'px';
        textarea.style.left= clientX + 'px';
        textarea.style.top = clientY+ 'px';
        textarea.focus()
        textarea.addEventListener('touchstart',stopEventPropagation,false) //在文本框内点击禁止创建新的文本框
        textarea.addEventListener('touchmove',stopEventPropagation,false) // 在文本框内移动禁止resize 文本框 
        textarea.addEventListener('blur',function(e){
            let textarea = document.querySelectorAll('textarea.text-input')[0] //如果没有重写textarea 那么textarea 就会是后面的一个textarea 
            if (textarea.value){
                let style = window.getComputedStyle(textarea,null)
                let text = textarea.value;
                let maxWidth = textarea.offsetWidth;
                let x = textarea.offsetLeft;
                let y = textarea.offsetTop;
                let lineHeight = parseFloat(style.lineHeight)
                context.fillStyle = style.color;
                context.font = style.fontSize + ' '+ style.fontFamily
                drawText(context,text,x,y,lineHeight,maxWidth)
            }
            textarea.remove()
        },false)

    }
})

board.addEventListener('touchmove',function(e){
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
    }else if(action === 'textarea'){ //resize文本框
        textarea.style.width = clientX - textarea.offsetLeft +'px'
        textarea.style.height = clientY - textarea.offsetTop +'px'
    }
    clear.classList.remove('deactive') //激活clear功能
})

function drawText( context, text, x, y, lineHeight, maxWidth){
    maxWidth = maxWidth || 0;
    
    if (maxWidth <= 0){
        context.fillText( text, x, y );
        return;
    }
    var words = text.split('');
    var currentLine = 1;
    var index = 1;
    while (words.length > 0 && index <= words.length){
        var str = words.slice(0,index).join('');
        var w = context.measureText(str).width;
        if ( w > maxWidth ){
            if (index==1){
                index=2;
            }
            context.fillText( words.slice(0,index-1).join(''), x, y + (lineHeight*currentLine) );
            currentLine++;
            words = words.splice(index-1);
            index = 1;
        }else{
            index++;
        }
    }
    if(index > 0){
        context.fillText( words.join(''), x, y + (lineHeight*currentLine) );
    }
}

