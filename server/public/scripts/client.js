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
  for (todo of todoList) {
    document.getElementById('todoList').innerHTML += `
    <tr id="todoRow" data-testid="toDoItem">
        <td class="row-line">
        ${
          todo.is_completed
            ? ` <button onclick="editTodo(${todo.id}, ${todo.is_completed})" class="emo-button">✅</button>`
            : `<button onclick="editTodo(${todo.id}, ${todo.is_completed})" class="emo-button">🔴</button>`
        }
    </td>
        <td>${todo.description}</td>
        <td>${new Date(todo.due_date).toLocaleDateString()}</td>
        <td> <button onclick="editTodo(${todo.id}, ${
      todo.is_completed
    })" class="emo-button">✏️</button></td>
        <td>
            <button onclick="deleteTodo(${
              todo.id
            })" class="emo-button" data-testid="deleteButton">❌
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
  let completed = false;
  let todoObj = { description, dueDate, completed };
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
  console.log('todoId', todoId);
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
editTodo = (todoId, isCompleted) => {
  axios({
    method: 'PUT',
    url: `/todos/is_completed/${todoId}`,
    data: {
      is_completed: isCompleted,
    },
  })
    .then(function (response) {
      getTodos();
    })
    .catch(function (error) {
      alert('Updating item has an error. Please try again later.');
    });
};

getTodos();
