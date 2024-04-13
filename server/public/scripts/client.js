// GET
getTodos = () => {
  axios({
    method: 'GET',
    url: '/todos',
  })
    .then((response) => {
      renderToDo(response.data);
    })
    .catch(() => {});
};

// RENDER GET
renderToDo = (todoList) => {
  document.getElementById('todoList').innerHTML = '';
  for (todo of todoList) {
    document.getElementById('todoList').innerHTML += `
    <tr id="todoRow">
        <td class="row-line">${todo.is_completed}</td>
        <td>${todo.description}</td>
        <td>${new Date(todo.due_date).toLocaleDateString()}</td>
        <td><button onclick="editTodo()" class="emo-button">✏️</button></td>
        <td><button onclick="deleteTodo()" class="emo-button">❌</button></td>
    </tr>
    `;
  }
};

// ADD
addTodo = () => {
  // Values to send to server
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;
  const todoObj = { description, dueDate };

  axios({
    method: 'POST',
    url: '/todos',
    data: todoObj,
  }).then((response) => {
    console.log('response data', response.data);
    getTodos();
  });
};

deleteTodo = () => {
  console.log('delete');
};

// EDIT
editTodo = () => {
  console.log('edit');
};

getTodos();
