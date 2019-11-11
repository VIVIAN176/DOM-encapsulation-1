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
    }

} 
