DROP TABLE IF EXISTS "task_list";

CREATE TABLE task_list (
-- column name
	id SERIAL PRIMARY KEY, 
	description VARCHAR(100),
	due_date DATE,
	is_completed BOOLEAN  
);

INSERT INTO task_list
(description, due_date, is_completed)
VALUES 
('Do dishes', '4/18/2024', true),
('Vaccuum', '4/17/2024', false),
('Clean out closet', '4/15/2024', false);

SELECT * FROM task_list; 