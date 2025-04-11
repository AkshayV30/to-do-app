import { db, sql, isUsingNeon } from "../db/db.js";

console.log(" Using Neon DB:", isUsingNeon);

const query = async (queryText, values = []) => {
  try {
    if (isUsingNeon) {
      // let textWithValues = queryText;

      // Neon doesn't use $1-style placeholders in `.unsafe`, so do direct substitution carefully
      // const parts = queryText.split(/\$\d+/);
      // const taggedQuery = parts.reduce((acc, part, i) => {
      //   if (i === 0) return [part];
      //   return [...acc, values[i - 1], part];
      // }, []);

      // const result = await sql(...taggedQuery);
      const result = await sql.query(queryText, values);
      console.log(" Neon SQL result:", result);

      return result.rows;
    } else {
      const result = await db.query(queryText, values);
      console.log(" Local PG result:", result.rows);
      return result.rows;
    }
  } catch (err) {
    console.error("❌ DB Query Error:", err.message);
    throw err;
  }
};

// const extractRows = (result) => (isUsingNeon ? result : result.rows);
// const extractOne = (result) => (isUsingNeon ? result[0] : result.rows?.[0]);

const extractRows = (result) => result;
const extractOne = (result) => result[0];

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
      `INSERT INTO todo (description) VALUES($1) RETURNING *`,
      [description]
    );

    res.status(201).json(extractOne(result));
  } catch (err) {
    console.error("Create Todo Error:", err.message);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

// Get all Todos
export const getTodos = async (req, res) => {
  try {
    // const allTodos = await pool.query("SELECT * FROM todo");
    // res.json(allTodos.rows);
    const result = await query(`SELECT * FROM todo`, []);

    console.log(" Raw query result:", result);
    // const todos = extractRows(result);
    // res.json(todos);
    res.json(result);
  } catch (err) {
    console.error("Get Todos Error:", err.message);
    res.status(500).json({ error: "Failed to fetch todos" });
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

    const result = await query(`SELECT * FROM todo WHERE todo_id = $1`, [id]);
    const todo = extractOne(result);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (err) {
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
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
      `UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *`,
      [description, id]
    );

    const updatedTodo = extractOne(result);
    const rowCount = isUsingNeon ? (result.length ? 1 : 0) : result.rowCount;

    if (rowCount === 0 || !updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({
      message: "Todo updated successfully!",
      // todo: updatedTodo.rows[0],
      todo: updatedTodo,
    });
  } catch (err) {
    console.error("Update Todo Error:", err.message);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

// Delete a Todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    // await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

    const result = await query(`DELETE FROM todo WHERE todo_id = $1`, [id]);

    const rowCount = isUsingNeon ? result.length : result.rowCount;

    if (rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo was deleted!" });
  } catch (err) {
    console.error("Delete Todo Error:", err.message);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
