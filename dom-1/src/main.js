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