const router = require('express').Router();
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
  const toDoTxt = `
    SELECT * FROM task_list
    ORDER BY id;
  `;
  pool
    .query(toDoTxt)
    .then((dbResult) => {
      let todoData = dbResult.rows;
      res.send(todoData);
    })
    .catch((dbError) => {
      console.log('Error is:', dbError);
      alert('DB query failed in GET ROUTE');
      res.sendStatus(500);
    });
});

// POST
router.post('/', (req, res) => {
  const r = req.body;

  const addTodos = `
    INSERT INTO task_list 
      ("description", "due_date")
	      VALUES ($1, $2)
    `;

  const sqlValues = [r.description, r.due_date];

  pool
    .query(addTodos, sqlValues)
    .then((dbResult) => {
      res.sendStatus(201);
    })
    .catch((dbError) => {
      console.log('Error', dbError);
      alert('Error adding todo. Please try again later.');
    });
});

// DELETE
router.delete('/:todo_id', (req, res) => {
  console.log('req', req.params);

  const itemToDelete = req.params.todo_id;

  let deleteTodo = `DELETE FROM task_list
        WHERE id= $1
    `;

  const sqlValues = [itemToDelete];

  pool
    .query(deleteTodo, sqlValues)
    .then((dbResult) => {
      res.sendStatus(200);
    })
    .catch((dbError) => {
      console.log('DELETE /songs/:song_id fail:', dbError);
      res.sendStatus(500);
    });
});

// PUT

module.exports = router;
