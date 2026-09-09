//practice loop and function

const numbers =[1,2,3,4,5]

function evenNums(numbers){
    let evens = []

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            evens.push(numbers[i])
        }
    }
    return evens;
}

console.log(evenNums(numbers))


const str = "hello"

function reverseStr(str){
    let reverse = ""

    for (let i = str.length-1; i >= 0; i--){
        reverse = reverse + str[i]
    }
    return reverse
}

console.log(reverseStr(str))


const arr = [1, 3, 3, 7, 3]
const target = 3

function countOccurrences(arr, target){
    let count = 0

    for (let i=0; i < arr.length; i++){
        if (arr[i] === target) {
            count = count + 1
        }
    }

    return count
}

console.log(countOccurrences(arr, target))


const str = "uyen"
const vowels = ["a", "e", "u", "i", "o"]

function countVowels(str){
    let count = 0

    for (let i=0; i < str.length; i++){
        if (vowels.includes(str[i])){
            count = count + 1
        }
    }
    return count
}

console.log(countVowels(str))


const arr = [1,2,3,4,5]

function sumOdds(arr){
    let sum = 0

    for (let i=0; i < arr.length; i++){
        if (arr[i] % 2 === 1){
            sum = sum + arr[i]
        }
    }
    return sum
}

console.log(sumOdds(arr))


const arr = [2,4,6]

function average(arr){
    let sum = 0
    let mean = 0

    for (let i=0; i < arr.length; i++){
        sum = sum + arr[i]
    }
    mean = sum / arr.length 
    return mean
}

console.log(average(arr))

const arr = [3,9,2]

function findMax(arr){
    let max = 0

    for (let i=0; i < arr.length; i++){
        if (max < arr[i]){
            max = arr[i]
        }
    }
    return max
}

console.log(findMax(arr))


// practice array methods

function upperNames(arr){
    return arr.map(n => n.toUpperCase());
} 
console.log(upperNames(["uyen", "minh", "lan"]));


function aboveThreshold(arr, threshold){
    return arr.filter(n => n>threshold);
}
console.log(aboveThreshold([1, 5, 10, 3], 4));

const people = [
  { name: "Uyen", age: 20 },
  { name: "Minh", age: 17 },
  { name: "Lan",  age: 25 },
];

function findOlderThan(people, minAge){
    return people.find(person => person.age > minAge);
}
console.log(findOlderThan(people, 18));  

const tasks = [
  { text: "wash dishes", done: false },
  { text: "study js",    done: true  },
  { text: "call mum",    done: false },
];

function unfinishedTasks(tasks){
    return tasks.filter(task => task.done === false);
}

console.log(unfinishedTasks(tasks));

const expenses = [
  { amount: 20, category: "food" },
  { amount: 50, category: "rent" },
  { amount: 15, category: "food" },
];

function totalFor(expenses, category){
    const matching = expenses.filter(expense => expense.category === category);

    let total = 0
    for (let i=0; i <matching.length; i++){
        total = total + matching[i].amount
    }
    return total
}

console.log(totalFor(expenses, "food")); 

const people = [
  { name: "uyen", age: 20, city: "hanoi" },
  { name: "minh", age: 17, city: "hue"   },
  { name: "lan",  age: 25, city: "hanoi" },
];

const expenses = [
  { amount: 20, category: "food" },
  { amount: 50, category: "rent" },
  { amount: 15, category: "food" },
];

function getNames(people){
    return people.map(person => person.name);
};

console.log(getNames("uyen"))

function adultNames(people, minAge){
    const matching = people.filter(person => person.age > minAge);

    return matching.map(matching => matching.name)
}

console.log(adultNames(people, 18))

//practice literal and ternary

const tasks = [
  { text: "buy milk",  done: false },
  { text: "study js",  done: true  },
  { text: "call mum",  done: false },
];

const people = [
  { name: "uyen", age: 20, active: true  },
  { name: "minh", age: 17, active: false },
];

const items = [
  { name: "Coffee", price: 4.5 },
  { name: "Tea",    price: 2   },
];

function greet(name){
    return `Hi, ${name}! Welcome back.`
}

console.log(greet(uyen))

function describe(person, age){
    return `${person.name} is ${person.age} years old`
}

console.log(describe(people[0]));

function priceTag(item, price){
    return `${item.name}: $${item.price.toFixed(2)}`
}

console.log(priceTag(items[0]))

function ageLabel(person){
    return `${person.name} (${person.age >= 18 ? 'adult' : 'minor'})`
}

console.log(ageLabel(people[0]))

const tasks = [
  { text: "buy milk",  done: false },
  { text: "study js",  done: true  },
  { text: "call mum",  done: false },
];

function formatTask(task){
    return `[${task.done ? 'x' : ' '}] ${task.text}`
}

console.log(formatTask(tasks[0]))

const people = [
  { name: "uyen", age: 20, active: true  },
  { name: "minh", age: 17, active: false },
];

function renderNames(person){
    return person
        .map(person => `<li>${person.name}</li>`)
        .join("");
}

console.log(renderNames(people))

const tasks = [
  { text: "buy milk",  done: false },
  { text: "study js",  done: true  },
  { text: "call mum",  done: false },
];

function renderTasks(task){
    return task
        .map(task => `<li>${formatTask(task)}</li>`)
        .join("");
}

console.log(renderTasks(tasks))


function checklist(task){
    return task
        .map(formatTask)
        .join("\n");
}

console.log(checklist(tasks))

const people = [
  { name: "uyen", age: 20, active: true  },
  { name: "minh", age: 17, active: false },
];

function renderTable(people){
    return people
        .map(person => `<tr><td>${person.name}</td><td>${person.age}</td></tr>`)
        .join("");
}

console.log(renderTable(people))

const tasks = [
  { text: "buy milk",  done: false },
  { text: "study js",  done: true  },
  { text: "call mum",  done: false },
];

function summary(tasks){
    return `${tasks.filter(tasks => tasks.done === true).length} of ${tasks.length} tasks done`
}
console.log(summary(tasks))

function summary(tasks){
    const doneCount = tasks.filter(task => task.done).length;
    return `${doneCount} of ${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} done`;
}
console.log(summary(tasks))


const tasks = [
  { text: "buy milk",  done: false },
  { text: "study js",  done: true  },
  { text: "call mum",  done: false },
];

function renderPage(tasks){
    return `<h2>${summary(tasks)}</h2><ul>${renderTasks(tasks)}</ul>`
}

console.log(renderPage(tasks))

