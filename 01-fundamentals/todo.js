//step1.js capstone 

let tasks = [];


function addTask(tasks, text) {
  if (text.trim() === "") return tasks;   // ← bail out, nothing else in here

  const ids = tasks.map(task => task.id);
  const newTask = { id: Math.max(0, ...ids) + 1, text, done: false };
  return [...tasks, newTask];
}


function formatTask(task){
    return `[${task.done ? 'x' : ' '}] ${task.text}`
}


function renderTasks(task){
    return task
        .map(task => `<li>${formatTask(task)}</li>`)
        .join("");
}

function renderPage(tasks){
    return `<h2>${summary(tasks)}</h2><ul>${renderTasks(tasks)}</ul>`
}

function summary(tasks){
    const doneCount = tasks.filter(task => task.done).length;
    return `${doneCount} of ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} done`;
}

function removeTask(tasks, id){ 
    return tasks.filter(task => task.id != id)
}

function clearCompleted(tasks){
    return tasks.filter(task => task.done != true)
}

function toggleTask(tasks, id){
    return tasks.map(task => task.id === id
        ? { ...task, done: !task.done }
        // which is equivalent to { id: task.id, text: task.text, done: !task.done }
        : task
        // REMEMBER THE ? : combo for ${task.done ? 'x' : ' '}
);
}

tasks = addTask(tasks, "buy milk");
tasks = addTask(tasks, "study js");
tasks = addTask(tasks, "call mum");
console.log(renderPage(tasks));
console.log(summary(tasks));

tasks = toggleTask(tasks, 2);
console.log(renderPage(tasks));
console.log(summary(tasks));

tasks = removeTask(tasks, 1);
console.log(renderPage(tasks));

tasks = clearCompleted(tasks);
console.log(renderPage(tasks));