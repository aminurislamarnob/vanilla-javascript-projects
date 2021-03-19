//selector
const toDoInput = document.querySelector('.todo-input');
const toDoButton = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const filterSelect = document.querySelector('#filterTo');


// const toDoDelete = document.querySelector('.trash-btn');

//Events
document.addEventListener('DOMContentLoaded', getTodo);
// document.addEventListener('DOMContentLoaded', activeCompletedTask);
toDoButton.addEventListener('click', createToDoList);
toDoList.addEventListener('click', deleteCheckTodo);
filterSelect.addEventListener('click', filterTodo);

//Functions
function createToDoList(event) {
    //prevent default action
    event.preventDefault();

    //create div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = toDoInput.value;

    //set local storage
    saveTodoLocalStorage(toDoInput.value);

    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //complete button
    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-btn');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completeButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);

    //Apend to list
    toDoList.appendChild(todoDiv);
    
    //empty input box
    toDoInput.value = '';

}


//Delete TODO
function deleteCheckTodo(e) {
    // console.dir(e.target)
    const item = e.target;

    if (item.classList[0] == 'trash-btn') {
        const todo = item.parentNode;
        todo.classList.add('fall');
        deleteTodFromStorage(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    if (item.classList[0] == 'complete-btn') {
        item.classList.toggle('completed_task');
        item.parentNode.classList.toggle('completed');
        // saveCompletedTodo(item.parentNode.children[0].innerText);
    }

    // if (item.classList[1] == 'completed_task') {
    //     const completedBtn = document.querySelector('.'+item.classList[1]);
    //     completedBtn.addEventListener('click', removeFromCompStorage);
    //     console.log('hello');
    // }
}


//Filter todo
function filterTodo(e) {
    const todos = toDoList.childNodes;
    
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}


//Save on localstorage
function saveTodoLocalStorage(todo) {
    let todos;

    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


//Show todo from local storage
function getTodo() {
    let todos;

    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    //completed Todo
    let ctodos;

    if (localStorage.getItem('completed_todos') == null) {
        ctodos = [];
    } else {
        ctodos = JSON.parse(localStorage.getItem('completed_todos'));
    }


    todos.forEach(function (todo) {
        //create div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //check completed todo
        // if (ctodos.includes(todo)) {
        //     todoDiv.classList.add('completed');
        // }

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;

        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //complete button
        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-btn');
        //check completed todo
        // if (ctodos.includes(todo)) {
        //     completeButton.classList.add('completed_task');
        // }
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completeButton);

        //trash button
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-btn');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashButton);

        //Apend to list
        toDoList.appendChild(todoDiv);
    });
}


//Delete todo from localstorage
function deleteTodFromStorage(todo) {
    let todos;

    if (localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todovalue = todo.children[0].innerText;
    todos.splice(todos.indexOf(todovalue), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


//save completed task on local storage
function saveCompletedTodo(todo) {
    let ctodos;

    if (localStorage.getItem('completed_todos') == null) {
        ctodos = [];
    } else {
        ctodos = JSON.parse(localStorage.getItem('completed_todos'));
    }
    if (!ctodos.includes(todo)) {
        ctodos.push(todo);
        localStorage.setItem('completed_todos', JSON.stringify(ctodos));
    }
}

// localStorage.removeItem('completed_todos')



//Remove from local storage completed array
// function removeFromCompStorage(e) {
//     let ctodos;

//     if (localStorage.getItem('completed_todos') == null) {
//         ctodos = [];
//     } else {
//         ctodos = JSON.parse(localStorage.getItem('completed_todos'));
//     }

//     const item = e.target;
//     const completedTask = item.parentNode.children[0].innerText;
//     console.log(ctodos.indexOf(completedTask));
//     ctodos.splice(ctodos.indexOf(completedTask), 1);
//     localStorage.setItem('completed_todos', JSON.stringify(ctodos));
// }