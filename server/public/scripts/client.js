getTodos = () => {
  console.log('todos');
  axios({
    method: 'GET',
    url: '/todos',
  })
    .then((response) => {
      console.log(response.data);
      renderToDo(response.data);
    })
    .catch(() => {});
};

renderToDo = (todoList) => {
  console.log('items', todoList);
  for (todo of todoList) {
    document.getElementById('todoList').innerHTML += `
    <tr id="todoRow">
        <td class="row-line">${todo.is_completed}</td>
        <td>${todo.description}</td>
        <td>${new Date(todo.due_date).toLocaleDateString()}</td>
        <td><button class="emo-button">✏️</button></td>
        <td><button class="emo-button">❌</button></td>
    </tr>
    `;
  }
};

getTodos();
