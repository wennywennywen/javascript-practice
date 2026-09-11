let items = []

function formatItem(item){
    return `[${item.done ? 'x' : ' ' }] ${item.text}`
}

function renderItems(item){
    return item
        .map(item => 
        `<li>${formatItem(item)} <button class = "del-btn" data-id = ${item.id}> Delete </button> <button class = "tog-btn" data-id = ${item.id}> Got it! </button></li>`)
        //UNDERSTAND how to use map!!!! it stands for MAP THIS FORMAT FOR EVERY CALLBACK
        //UNDERSTAND the dataset's data-id
        .join("")
}

function summary(items){
    if (items.length === 0) return `no items are added`
    const boughtItem = items.filter(items => items.done === true).length
    //REMEMBER this .filter
    return `${boughtItem} out of ${items.length} is done`
}

function renderPage(items){ //
    return `<h2>${summary(items)}</h2> 
            <ul>${renderItems(items)}</ul>` 
            //where <li>items</li> are organized in <ul></ul>
}

function addItem(items, text){
    if (text.trim() === "") return items
    const ids = items.map(item => item.id)
    //UNDERSTAND how to use map again!!! assigning ids FOR EVERY ITEMS so map an ID FOR EVERY ITEMS USING ITEMS.ID
    const newItem = {id : Math.max(0, ...ids) + 1, text : text, done : false}
    //UNDERSTAND (items, text) so items is an array, text is a new parameter that we are adding in
    //differentiate when to use the item.id and item.text (calling text of one line in the array) vs text (new parameter)
    return [...items, newItem]
}

function removeItem(items, id){
    return items.filter(items => items.id !== id)
}

function toggleItem(items, id){
    return items.map(item => 
        item.id === id ? {...item, done : !item.done} : item
    )
}
//UNDERSTAND the structure ? : here

const form = document.querySelector("#task-form")
const input = document.querySelector("#task-input")
const app = document.querySelector("#app")

function render() {
    app.innerHTML = renderPage(items)
}
//UNDERSTAND the actual function of render 

form.addEventListener("submit", (e) => {
    e.preventDefault()

    items = addItem(items, input.value)
    //UNDERSTAND why need items = since without it render() will always return new array and not stored it to items!!!
    input.value = ""
    render()
})

app.addEventListener("click", (e) => {
    const delBtn = e.target.closest(".del-btn")

    if (delBtn){
        items = removeItem(items, Number(delBtn.dataset.id))
        render();
        return
    }

    const togBtn = e.target.closest(".tog-btn")
    if(togBtn){
        items = toggleItem(items, Number(togBtn.dataset.id))
        render()
    }
})

render();
