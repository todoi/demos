let ul1 = document.querySelectorAll('.tabs>ul')[0];
let ul2 = document.querySelectorAll('.contents>ul')[0];
let index;

function handler(e) {
    let li = e.target;
    let items1 = ul1.children;
    for(var i=0;i<items1.length;i++){
        if (items1[i].className){
            items1[i].className='';
        }
    }//把tabs ul中所以li 的active 去掉
    li.className = 'active';
    index = [].indexOf.call(items1, li);
    let items2 = ul2.children;
    for(var i=0;i<items2.length;i++){
        if (items2[i].className){
            items2[i].className='';
        }
    }//把contents ul中所以li 的active 去掉
    items2[index].className = 'active';
}

ul1.addEventListener('click', handler, false);

