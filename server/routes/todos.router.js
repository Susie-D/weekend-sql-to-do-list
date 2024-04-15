const router = require('express').Router();
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
    const toDoTxt = `
    SELECT * FROM task_list
    ORDER BY isCompleted ASC;
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
    r.iscompleted = false;

    const addTodos = `
    INSERT INTO task_list 
      ("description", "due_date", "iscompleted")
	      VALUES ($1, $2, $3)
    `;

    const sqlValues = [r.description, r.due_date, r.isCompleted];

    pool
        .query(addTodos, sqlValues)
        .then((dbResult) => {
            res.sendStatus(201);
        })
        .catch((dbError) => {
            console.log('Error in adding item to the server', dbError);
        });
});

// DELETE
router.delete('/:todo_id', (req, res) => {
    const itemToDelete = req.params.todo_id;

    let deleteTodo = `
    DELETE FROM task_list
        WHERE id = $1
    `;

    const sqlValues = [itemToDelete];

    pool
        .query(deleteTodo, sqlValues)
        .then((dbResult) => {
            res.sendStatus(200);
        })
        .catch((dbError) => {
            console.log('DELETE /todo_id fail:', dbError);
            res.sendStatus(500);
        });
});

// PUT
router.put('/iscompleted/:id', (req, res) => {

    const todoId = req.params.id;
    let isCompleted = req.body.iscompleted;


    if (isCompleted) {
        updateTodo = `UPDATE task_list SET iscompleted = true WHERE id=$1`;
    } else if (isCompleted == true) {
        console.log('Error on /iscompleted/:id');
        res.sendStatus(500);
    }

    pool
        .query(updateTodo, [todoId])
        .then(() => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error on /iscompleted:id', error);
            res.sendStatus(500);
        });
});

module.exports = router;
