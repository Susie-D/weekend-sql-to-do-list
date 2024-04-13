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
      console.log('DB query failed inside GET /songs!');
      console.log('Error is:', dbError);
      res.sendStatus(500);
    });
});

// POST
router.post('/', (req, res) => {
  console.log('req.body', req.body);
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
    });
});

// DELETE

// PUT

module.exports = router;
