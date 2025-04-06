import { db, sql, isUsingNeon } from "../db/db.js";

const query = async (queryText, values = []) => {
  return isUsingNeon
    ? await sql.unsafe(queryText, values)
    : await db.query(queryText, values);
};

// Create a Todo
export const createTodo = async (req, res) => {
  try {
    const { description } = req.body;
    // const newTodo = await pool.query(
    //   "INSERT INTO todo (description) VALUES($1) RETURNING *",
    //   [description]
    // );
    // res.json(newTodo.rows[0]);
    const result = await query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    const todo = isUsingNeon ? result[0] : result.rows[0];
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get all Todos
export const getTodos = async (req, res) => {
  try {
    // const allTodos = await pool.query("SELECT * FROM todo");
    // res.json(allTodos.rows);
    const result = await query("SELECT * FROM todo");
    const todos = isUsingNeon ? result : result.rows;
    res.json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get a single Todo
export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    // const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
    //   id,
    // ]);
    // res.json(todo.rows[0]);

    const result = await query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    const todo = isUsingNeon ? result[0] : result.rows[0];
    res.json(todo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Update a Todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    // console.log("🔍 Received update request for ID:", id);
    // console.log("🔍 New Description:", description);

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    // const updatedTodo = await pool.query(
    //   "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
    //   [description, id]
    // );

    const result = await query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );

    const updatedTodo = isUsingNeon ? result[0] : result.rows[0];

    if (updatedTodo.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const rowCount = isUsingNeon ? (result.length ? 1 : 0) : result.rowCount;

    if (rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({
      message: "Todo updated successfully!",
      // todo: updatedTodo.rows[0],
      todo: updatedTodo,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete a Todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    // await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

    await query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json({ message: "Todo was deleted!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
};
