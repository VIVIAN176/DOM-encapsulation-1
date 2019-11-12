// const div = dom.create("<div><span>1</span></div>")
// const div = dom.create("<td>2</td>")
const div = dom.create("<div>newDiv</div>")
// const div = dom.create("div")
console.log(div)

dom.after(test, div)

const div3 = dom.create("<div id='parent'></div>")

dom.wrap(test, div3)

const nodes = dom.empty(window.empty)
console.log(nodes)


dom.attr(test, 'title', 'hi,i am title')
const title = dom.attr(test, 'test')
console.log('title:${}')


dom.text(test, 'hello 这是`dom.text`新的内容')
dom.text(test)

//写 读 对象-设置 字符串-获取值
dom.style(test, { border: '1px solid blue', color: 'green' })  //设置
const jieshou = dom.style(test, 'border')  //读 设置
console.log(jieshou)
dom.style(test, 'border', '1px solid red') //设置

dom.class.add(test, 'red')
dom.class.add(test, 'blue')
dom.class.remove(test, 'blue')
console.log(dom.class.has(test, 'red'))

//test.addEventListener('click')
const fn = () => {
    console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

console.log(`--------找节点-------------`)
const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test2')[0]
//找到的多个节点 打出的是一个节点
console.log(dom.find('.red', test2))
console.log(dom.find('.red', test2)[0])

console.log(dom.parent(test))
console.log(`--------找兄弟姐妹-------------`)

// console.log(dom.siblings(dom.find('#e2')))
console.log(dom.siblings(dom.find('#s2')[0]))
console.log(`-----------找下一个节点----------`)
// console.log(dom.next(dom.find('#s2')))   //随时记得find返回的是多个节点的数组
console.log(dom.next(dom.find('#s2')[0])) //找到的是一个文本节点，我们其实要找的不是文本节点
console.log(`-----------找上一个节点----------`)
console.log(dom.previous(dom.find('#s2')[0]))

console.log(`-----------遍历----------`)
const t = dom.find('#travel')[0]
console.log(t)
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))

console.log(`-----------排行老几----------`)
console.log(dom.index(s2))