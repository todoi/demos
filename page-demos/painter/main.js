let board = document.querySelector('main.board');
board.addEventListener('touchmove',function(e){
    let clientX = e.touches[0].clientX;
    let clientY = e.touches[0].clientY;
    let div = document.createElement('div');
    div.className += 'dot';
    div.style.position = 'absolute';
    div.style.top =  clientY-5+'px';
    div.style.left = clientX-5+'px';
    board.appendChild(div)
})
