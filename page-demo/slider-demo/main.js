
jQuery('.controls').on('click','li',function(e){
    let li=e.currentTarget;
    let jQueryLi=jQuery(li);
    let index = jQueryLi.index();
    go(index)
    //jQueryLi.addClass('active');
    //jQueryLi.siblings('.active').removeClass('active');
    //let width = jQuery('.window').width();
    //jQueryLi.parent().prev().children().css({
    //    transform: 'translate(' + (-width * index) + 'px)'
    //    })//让.window 所有儿子都移动index * width
})

function go(index){
    $('.controls li').eq(index).addClass('active').siblings('.active').removeClass('active');
    let width = $('.window').width();
    $('.window').children().css({
        transform: 'translate(' + (-width * index) + 'px)'
    })
}
let nextIndex = 1;
setInterval(function(){
    if (nextIndex > 3){
        nextIndex = 0;
    };
    go(nextIndex);
    nextIndex += 1
},3000)
