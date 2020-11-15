/*
 *buttonClickEvent 函数是为弹出框按钮添加点击事件
 *contentSelector 是弹出框css选择器
 *buttonSelector 是按钮css选择器
 *removeDisable 用于设定点击按钮是否收回弹出框，为true时点击按钮不会收回，false 会收回。
 */
let index = 0;
let value = 0
function buttonEvent( contentSelector, buttonSelector, removeDisable){
    let popupContent = $(contentSelector)

    $( buttonSelector ).on('click',fn)

    function fn(event){
        if (popupContent.hasClass('active')){
            if (!removeDisable){
                remove(event);
            }else{
                //用于当按钮捕获到click事件，但没有调用remove函数阻止冒泡，添加阻止冒泡
                event.stopPropagation()
            }
        }else{
            add(event);
        }
    }

    function remove(event){
        popupContent.removeClass('active')
        console.log('关闭body监听' + value)
        value += 1;
        $('body').off('click',remove)
    }

    function add(event){
        $('.content').removeClass('active')
        popupContent.addClass('active')
        event.stopPropagation();
        console.log('开启body监听' + index)
        index += 1;
        $('body').on('click',remove);
    }

    return undefined
}

//一号容器 popover 控制
let contentSelector1 = '.container>.content-1';
let buttonSelector1 = '.container>.btn-1';
buttonEvent(contentSelector1, buttonSelector1)

//三号容器 popover 控制
let contentSelector6 = '.container>.content-6';
let buttonSelector6 = '.container>.btn-6';
buttonEvent(contentSelector6, buttonSelector6, true)

//二号容器 popover 控制
function position(selector){
    let result = {};
    result.left = $(selector).position().left;
    result.right = $(selector).position().right;
    result.top = $(selector).position().top;
    result.bottom = $(selector).position().bottom;
    return result
}
function innerSize(selector){
    let result = {};
    result.width = $(selector).innerWidth();
    result.height = $(selector).innerHeight();
    return result
}
function outerSize(selector){
    let result ={};
    result.width = $(selector).outerWidth();
    result.height = $(selector).outerHeight();
    return result
}
function getData(contentSelector,buttonSelector){
    let result = {};
    result.position = position(buttonSelector)
    result.buttonInnerSize = innerSize(buttonSelector)
    result.buttonOuterSize = outerSize(buttonSelector)
    result.contentInnerSize = innerSize(contentSelector)
    result.contentOuterSize = outerSize(contentSelector)
    return result
}
//二号容器 一号弹出框
{
    let containerSelector = '.container.container-2'
    let contentSelector = '.content.content-2' 
    let buttonSelector = '.btn.btn-2' 
    let containerHeight = innerSize(containerSelector).height
    let contentHeight = outerSize(contentSelector).height
    $(contentSelector).css('top',(containerHeight-contentHeight)/2)
    buttonEvent(contentSelector, buttonSelector)
}

//二号容器 二号弹出框
{
    let buttonSelector = '.btn.btn-3';
    let contentSelector =  '.content.content-3';
    let buttonLeft = position(buttonSelector).left;
    let contentLeft = position(contentSelector).left;
    let contentTop = position(contentSelector).top;
    let contentHeight = outerSize(contentSelector).height + 10;
    let contentWidth = outerSize(contentSelector).width;
    $(contentSelector).css({'top':contentTop-contentHeight,'left':(buttonLeft+contentLeft-contentWidth)/2})
    buttonEvent(contentSelector, buttonSelector)
}

//二号容器 三号弹出框
{
    let buttonSelector = '.btn.btn-4';
    let contentSelector = '.content.content-4';
    let buttonPosition = position(buttonSelector);
    let buttonLeft = buttonPosition.left;
    let buttonTop = buttonPosition.top;
    let buttonHeight = outerSize(buttonSelector).height;
    let contentLeft = position(contentSelector).left;
    let contentWidth = outerSize(contentSelector).width;
    $(contentSelector).css({'top':buttonTop+buttonHeight+10,'left':(buttonLeft+contentLeft-contentWidth)/2})
    buttonEvent(contentSelector,buttonSelector)
}
 
//二号容器 四号弹出框
{
    let buttonSelector = '.btn.btn-5';
    let contentSelector = '.content.content-5';
    let data = getData(contentSelector,buttonSelector)
    $(contentSelector).css({'top':data.position.top-data.contentOuterSize.height/2+data.buttonOuterSize.height/2,'left':data.position.left-data.contentOuterSize.width-10})
    buttonEvent(contentSelector,buttonSelector)
}































