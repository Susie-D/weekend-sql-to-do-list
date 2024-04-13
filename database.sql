DROP TABLE IF EXISTS "task_list";

CREATE TABLE task_list (
-- column name
	id SERIAL PRIMARY KEY, 
	description VARCHAR(100),
	due_date DATE,
	isCompleted BOOLEAN  
);

INSERT INTO task_list
(description, due_date, isCompleted)
VALUES 
('Do dishes', '4/18/2024', true),
('Vaccuum', '4/17/2024', false),
('Clean out closet', '4/15/2024', false);

SELECT * FROM task_list; 


-- INITIAL CODE
DROP TABLE IF EXISTS "todos";

CREATE TABLE "todos" (
	"id" SERIAL PRIMARY KEY,
	"text" TEXT,
	"isComplete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "todos"
  ("text")
  VALUES 
  ('Build a CRUD app'),
  ('Make my app look nice');