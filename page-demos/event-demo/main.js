
function autoRotate(){
    var deg = 30;
    var degX = parseInt(Math.random()*50, 10);
    var degY = parseInt(Math.random()*50, 10);
    var condition = Math.random();
    var rotateX = condition > 0.5 ? degX : -degX;
    var rotateY = condition > 0.5 ? degY : -degY;
    parentDiv.style.transform = 'rotateX(' + rotateX + 'deg)';
    parentDiv.style.transform += 'rotateY(' + rotateY + 'deg)';
    setTimeout(autoRotate, 2000);
}
var parentDiv = document.getElementsByClassName('parent')[0];
autoRotate();
