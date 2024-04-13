const router = require('express').Router();
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
  console.log('This is your get post');
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

// DELETE

// POST

module.exports = router;
