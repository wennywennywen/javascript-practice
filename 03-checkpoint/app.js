
function loadItems(){
    return JSON.parse(localStorage.getItem("books")) ?? []
}

function saveItems(){
    localStorage.setItem("books", JSON.stringify(books))
}


let books = loadItems()
let loading = false

function formatBooks(book){
    return `[${book.done ? "x" : " "}] ${book.text}`
}
//IMPORTANT!! understand that formatBooks are for showing the one line on the page

function renderBooks(books){
    return books
        .map(book => `<li>${formatBooks(book)} <button class = "del-btn" data-id = ${book.id}>Delete</button> <button class = "tog-btn" data-id = ${book.id}>Read/Unread</button> </li>`)
        .join("")
}
//IMPORTANT!!! remember rendering is looping each book item, REQUIRE ID for each book 
//IMPORTANT!! the different between class and data-id (EXACTLY THIS WORD BY WORD) for these button!!


function summary(books){
    if (books.length === 0)
        return `Nothing to read yet`
    const doneCount = books.filter(book => book.done).length
    //IMPORTANT filter NEED A FUNCTION LIKE book => !book.done
    //.filter is for KEEPING stuff, so .filter(book => !book.done) means keep those book.done or keep the ones that are done
    return `${doneCount} out of ${books.length} read`
}

function renderPage(book){
    return `<ul>${renderBooks(book)}</ul> <h2>${summary(books)}</h2>`
}

function addBooks(books, text){
    if (text.trim() === "") return books

    const ids = books.map(book => book.id)
    const newBook = {id : Math.max(0, ...ids) + 1, text : text.trim(), done : false}
    return [...books, newBook]
    //IMPORTANT dont forget addBooks are for adding in MORE so [...books, newBook] is neccessary
}

function deleteBooks(books, id){
    return books.filter(book => book.id !== id)
}

function toggleBooks(books, id){
    return books.map(book => 
        book.id === id ? {...book, done : !book.done} : book)
}
//PERFECT for both deleteBooks and toggleBooks

const app = document.querySelector("#app")
const form = document.querySelector("#list-form")
const input = document.querySelector("#list-input")
const load = document.querySelector("#suggestions")

function render(){
    app.innerHTML = renderPage(books)
    saveItems()
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    books = addBooks(books, input.value);
    input.value = ""
    render()
})
//IMPORTANT remember here is for the Add button so "submit"!!!

app.addEventListener("click", (e) => {
    const delBtn = e.target.closest(".del-btn")

    if (delBtn) {
        books = deleteBooks(books, Number(delBtn.dataset.id))
        render()
        return
    }

    const togBtn = e.target.closest(".tog-btn")
    if (togBtn){
        books = toggleBooks(books, Number(togBtn.dataset.id))
        render()
    }
})

render()

//REMEMBER about Number(btn.dataset.id) TO CALL FOR THE ID OF EACH BUTTON


async function getSuggestions(){
    const get = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")

    const response = await get.json()
    //IMPORTANT!! never forget to always parse .json() into string again!!
    const suggestions = response.map(web => ({
        id : web.id,
        text : web.title,
        done : false,
    }))
    return suggestions
}

load.addEventListener("click", () => {
    loadSuggestions()
    return
})
render()

async function loadSuggestions(){
    if (loading) return

    try{
        books = await getSuggestions()
    }
    catch(err){
        console.log(err.message)
    }
    finally{
        loading = false 
        render()
    }
}