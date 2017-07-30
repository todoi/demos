/**
 * Created by Administrator on 2017/6/10.
 */

window.dom = {};

/**
 * 创建元素
 * @param tagName
 * @param children
 * @param attributes
 * @returns {Element}
 */
window.dom.create = function (tagName, children, attributes) {
    var tag = document.createElement(tagName);
    if (typeof children === 'string') {
        var child = document.createTextNode(children);
        tag.appendChild(child);
    } else if (children instanceof HTMLElement) {
        tag.appendChild(children);
    } else if (children instanceof Array) {
        for (var i = 0; i < children.length; i++) {
            if (typeof children[i] === 'string') {
                tag.appendChild(document.createTextNode(children[i]));
            } else if (children[i] instanceof HTMLElement) {
                tag.appendChild(children[i]);
            }
        }
    }
    if (attributes) {
        for (var key in attributes) {
            tag.setAttribute(key, attributes[key])
        }
    }
    return tag;
};

/**
 * 查找元素
 * @param tagName
 * @param scope
 * @returns {NodeList}
 */
window.dom.find = function (tagName, scope) {
    var tag;
    tag = (scope && scope.nodeType === 1) ? scope : document;
    return tag.querySelectorAll(tagName);
};

/**
 * 清空节点的children
 * @param node
 */
window.dom.empty = function (node) {
    var firstChild = node.childNodes[0];
    while (firstChild) {
        firstChild.remove();
        firstChild = node.childNodes[0];
    }
};

/**
 *显示节点内包含的子代标签
 * @param node
 */
window.dom.children = function (node) {
    console.log(node.children);
};

/**
 *显示节点内包含的子代文本
 * @param node
 */
window.dom.text = function (node) {
    var text = '';
    var children = node.childNodes;
    for (var i = 0; i < children.length; i++) {
        if (children[i].nodeType === 3) {
            text += children[i].textContent.trim();
        }
    }
    console.log(text)
};

/**
 * 显示上一个标签
 * @param node
 */
window.dom.elderBrother = function (node) {
    var previousNode = node.previousSibling;
    while ( previousNode && (previousNode.nodeType !== 1) && (previousNode !== 8) ) {
        previousNode = previousNode.previousSibling
    }
    console.log(previousNode)
};

/**
 * 显示下一个标签
 * @param node
 */
window.dom.youngerBrother = function(node) {
    var nextNode = node.nextSibling;
    while ( nextNode && (nextNode.nodeType !== 1) && (nextNode.nodeType !== 8) ) {
        nextNode = nextNode.nextSibling
    }
    console.log(nextNode)
};

/**
 * 为节点添加新的样式
 * @param node
 * @param styles
 */
window.dom.style = function(node, styles){
    for(var key in styles){
        node.style[key] = styles[key];
    }
};

window.dom.attr = function(node, attributes){
    for (var key in attributes){
        node.setAttribute(key, attributes[key])
    }
};
