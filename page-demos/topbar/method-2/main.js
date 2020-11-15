function handler(e){
    let scrollY = window.scrollY 
    let $topbar = $('.topbar')
    //console.log(scrollY)
    //console.log(window.innerHeight)
    //console.log('body:'+ $('html').innerHeight())
    let containerY = $topbar.innerHeight()
    scrollY > containerY ? $topbar.addClass('active') : $topbar.removeClass('active')
}

window.addEventListener('scroll',handler);
