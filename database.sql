--creates the task table
CREATE TABLE "tasks" (
	id SERIAL PRIMARY KEY,
	"description" VARCHAR(100) NOT NULL,
	"completed" BOOLEAN DEFAULT false
);

--Use for adding new task (POST request)
INSERT INTO "tasks" ("description", "completed")
VALUES ('Weekend Challenge #3', false);
