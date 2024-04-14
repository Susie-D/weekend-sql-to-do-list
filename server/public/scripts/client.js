// GET
getTodos = () => {
    axios({
        method: 'GET',
        url: '/todos',
    })
        .then((response) => {
            renderToDo(response.data);
        })
        .catch((error) => {
            console.log('Axios GET error', error);
            alert('Error retrieving todo list. Please try again later.');
        });
};

// RENDER GET
renderToDo = (todoList) => {
    document.getElementById('todoList').innerHTML = '';
    if (todoList.length === 0) {
        document.getElementById('todoList').innerHTML = 'No tasks available';

    }

    for (todo of todoList) {
        document.getElementById('todoList').innerHTML += `
    <tr id="todoRow" data-testid="toDoItem">
        <td class="row-line">
        ${todo.iscompleted
                ? ` <button class="emo-button completed" data-testid="completeButton">✅</button>`
                : `<button onclick="completeTodo(${todo.id}, ${todo.iscompleted})" class="emo-button">🔴</button>`
            }
        </td>
        <td>${todo.iscompleted ? `<s>${todo.description}</s>` : `${todo.description}`}
        </td>
        <td>
        ${todo.iscompleted
                ? `<s>${new Date(todo.due_date).toLocaleDateString()}</s>`
                : `${new Date(todo.due_date).toLocaleDateString()}`
            }
        </td>
        <td>
            <button onclick="deleteTodo(${todo.id})" class="emo-button" data-testid="deleteButton">✖️
            </button>
        </td>
    </tr>
    `;
    }
};

// ADD
addTodo = () => {
    // Values to send to server
    const description = document.getElementById('description').value;
    let dueDate = document.getElementById('dueDate').value;
    let iscompleted = false;
    let todoObj = { description, dueDate, iscompleted };
    axios({
        method: 'POST',
        url: '/todos',
        data: todoObj,
    })
        .then((response) => {
            getTodos();
            clearInputs();
        })
        .catch((error) => {
            console.log('Axios ADD error', error);
            alert('Error adding an item to todo list. Please try again later.');
        });
};

clearInputs = () => {
    document.getElementById('description').value = '';
    document.getElementById('dueDate').value = '';
};

deleteTodo = (todoId) => {
    if (confirm('Are you sure you want to delete this task?')) {
        deleteTodoConfirmed(todoId)
    }
}

deleteTodoConfirmed = (todoId) => {
    axios({
        method: 'DELETE',
        url: `/todos/${todoId}`,
    })
        .then((response) => {
            getTodos();
        })
        .catch((error) => {
            console.log('Axios DELETE error', error);
            alert('Error deleting an item to todo list. Please try again later.');
        });
};

// EDIT
completeTodo = (todoId, isCompleted) => {
    axios({
        method: 'PUT',
        url: `/todos/iscompleted/${todoId}`,
        data: {
            iscompleted: isCompleted,
        },
    })
        .then(function (response) {
            getTodos();
        })
        .catch(function (error) {
            alert('Updating item has an error. Please try again later.');
        });
}

getTodos();
