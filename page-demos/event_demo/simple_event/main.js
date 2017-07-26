/**
 * Created by Administrator on 2017/6/17.
 */

var parentDiv = document.querySelector('.parent');
var childDiv = document.querySelector('.child');
var rect = parentDiv.getBoundingClientRect();
let aleft = rect.left;
let atop = rect.top;

function moveHandler(event) {
    var clientX = event.clientX;
    var clientY = event.clientY;
    var offsetX = clientX - aleft - 300;
    var offsetY = -(clientY - atop - 200);
    childDiv.style.transform = 'rotateX(' + offsetY / 200 * 10 + 'deg)';
    childDiv.style.transform += 'rotateY(' + offsetX / 300 * 10 + 'deg)';

}

function leaveHandler(event) {
    childDiv.style.transform = 'rotateX(0)';
    childDiv.style.transform += 'rotateY(0)';
}
parentDiv.addEventListener('mousemove', moveHandler, false);
parentDiv.addEventListener('mouseleave', leaveHandler, false);

