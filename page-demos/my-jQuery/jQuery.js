window.$=function(arg){
    var elements 
    
    if( typeof arg === 'string' ){
        elements = document.querySelectorAll(arg);
    }else if( arg instanceof HTMLElement ){
        elements = {
            0: arg,
            length: 1
        }
    }else if( arg instanceof Array ){
        elements = {
            length: 0
        }
        for(var i=0; i<arg.length; i++){
            elements[i] = arg[i];
            elements.length += 1;
        }
    }
    
    elements.on=function(event,handler,isCapture){
        for (var i=0; i<elements.length;i++){
            if(elements[i].addEventListener){
                elements[i].addEventListener(event,handler,isCapture);
            }else if(elements[i].attachEvent){
                elements[i].attachEvent('on'+event,handler);
            }else{
                elements[i]['on'+click]=handler;
            }
        }
        return elements
    }

    elements.addClass=function(className){
        for(var i=0;i<elements.length; i++){
            if(elements[i].classList){
                elements[i].classList.add(className);
            }else{
                elements[i].className += className;
            }
        }
        return elements
    }

    elements.removeClass = function(className){
        for(var i=0; i<elements.length; i++){
            elements[i].classList.remove(className);
        }
        return elements
    }

    elements.text=function(content){
        if(content){
            for(var i=0; i<elements.length; i++){
                if (elements[i].innerText){
                    elements[i].innerText = content;
                }else{
                    elements[i].textContent = content;
                }
            }
            return elements
        }else{
            let result = [];
            for(var i=0; i<elements.length; i++){
                if (elements[i].innerText){
                    result.push(elements[i].innerText);
                }else{
                    result.push(elements[i].textContent);
                }
            }
            return result
        }
    }

    elements.css=function(property,value){
        for(var i=0; i<elements.length; i++){
            elements[i].style[property] = value;
        }
        return elements
    }

    elements.attr=function(attribute,value){
        for(var i=0; i<elements.length; i++){
            elements[i].setAttribute(attribute,value)
        }
        return elements
    }

    elements.html=function(htmlContent){
        if(htmlContent){
            for(var i=0; i<elements.length; i++){
                elements[i].innerHTML = htmlContent;
            }
            return elements
        }else{
            let result = [];
            for(var i=0; i<elements.length; i++){
                result.push(elements[i].innerHTML);
            }
            return result
        }

    }

    elements.get=function(index){
        let length = elements.length;
        if (index>=(-length) && index<=length){
            return elements[index]
        }
    }

    elements.siblings=function(){
        if (elements.length === 1){
            var result = [];
            let parentNode = elements[0].parentNode;
            let brother = parentNode.children;
            for (var i=0; i<brother.length; i++){
                if (brother[i] !== elements[0]){
                    result.push(brother[i])
                }
            }
            return $(result)
        }
    }

    return elements
    }

//$('form>input').on('click',function(e){
    //var element=e.target;
    //element.classList.add('hidden');
//})

var items=$('ul>li')
//items.addClass('hi').on('dblclick', function(){
//}).addClass('hello').removeClass('vi').addClass('frank').addClass('jack') 

//items.text('<p>你好<p>');
//console.log(items.text()) 

//items.css('border', '1px solid red')
//items.attr('name', 'frank') 

//items.html('<p>你好</p>') 
//console.log(items.html())  

//items[0].style.border='1px solid blue' 

//items.get(1).style.border = '1px solid blue' 

console.log($(items[0]))

var item = $(items[1]) 
console.log(item.siblings())
item.siblings().addClass('s').css('border', '1px solid red')





