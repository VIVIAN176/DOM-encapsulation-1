// window.dom = {
//     create(tagName) {
//         return document.createElement(tagName)
//     }
// }

//对象法封装
window.dom = {
    //增
    create(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        //trim把字符串两边的空格清楚掉，如果有空格没trim的话第一个
        //孩子就是一个文本节点（空格）
        console.log(container)
        // return container.children[0]
        return container.content.firstChild
    },
    //把node2插在node的后面
    after(node, node2) {
        // node.parentNode.insertBefore(node2, node)
        console.log(node.nextSibling)
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    //dom默认支持的接口
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, node) {
        parent.appendChild(node)
    },
    //先把parent(安置)放在node前面，再把node移到parent
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },

    //删
    remove(node) {
        node.parentNode.removeChild(node)
        //节点删除了  但是人想获得被删除节点的引用
        return node
    },
    empty(node) {
        // node.innerHTML=''
        //节点删除了  但是人想获得被删除节点的引用 只能下面这种
        const { childNodes } = node //新语法 从node获得childNodes
        const array = []
        let x = node.firstChild
        //在下面的for循环中 remove节点之后 节点长度在变化就不能用
        //i < childNodes.length so用while循环
        while (x) {

            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        //遍历所有子节点
        // for (let i = 0; i < childNodes.length ; i++) {
        //     dom.remove(childNodes[i])
        //     // 把删除的节点追加到数组里面
        //     array.push(childNodes[i])
        // }
        //返回被删除的节点们组成的数组
        return array
    },


    //改

    //设置title属性
    attr(node, name, value) {//重载 根据参数个数不同写代码
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }

    },
    text(node, string) {// 适配
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string
            }
            else {
                node.innerContent = string
            }
        } else if (arguments.length === 1) {

            if ('innerText' in node) {
                return node.innerText
            }
            else {
                return node.innerContent
            }
        }
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        }
        else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            //dom.style(div,'color','red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                return node.style[name]
            } else if (name instanceof Object) {
                //dom.style(div,{'color':'red'})
                const object = name
                for (let key in object) {
                    // key: border/color
                    //node.style.border
                    //node.style.color
                    //key是个变量 如果用.key .key直接就变成字符串了
                    node.style[key] = object[key]
                }
            }
        }

    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    //dom.on dom.off用于添加 删除监听事件
    //test.addEventListener('click',fn) dom自带的api
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },

    // 查
    find(selector, scope) {
        //All读取的是全部 一个数组
        //scope 限定范围 制定范围里面的selector 
        // a||b 如果a真就执行，否真b 保底值b
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        //伪数组转换为数组，， 才有数组的方法filter   
        //(n => n !== node)这个节点不等于你传过来的节点   是就过滤掉
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        //存在 而且不是文本的情况执行while循环
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        //存在 而且不是文本的情况执行while循环
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    // dom.each  dom.index
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    // index(node) {
    //     const list = dom.children(node.parentNode)
    //     for (let i = 0; i < list.length; i++) {
    //         if (list[i] === node) { break }
    //     }
    //     return i
    // }

    index(node) {
        const list = dom.children(node.parentNode)
        let i  //let i的作用域问题
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) { break }
        }
        return i
    }

}



