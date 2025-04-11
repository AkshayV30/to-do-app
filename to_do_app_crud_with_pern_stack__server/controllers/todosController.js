import { db, sql, isUsingNeon } from "../db/db.js";

console.log(" Using Neon DB:", isUsingNeon);

const query = async (queryText, values = []) => {
  try {
    if (isUsingNeon) {
      const result = await sql.query(queryText, values);
      console.log(" Neon SQL result:", result);

      return result;
    } else {
      const result = await db.query(queryText, values);
      console.log(" Local PG result:", result.rows);
      return result;
    }
  } catch (err) {
    console.error("❌ DB Query Error:", err.message);
    throw err;
  }
};

const extractRows = (result) => result;
const extractOne = (result) => result[0];

// Create a Todo
export const createTodo = async (req, res) => {
  try {
    const { description } = req.body;

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
    const result = await query(`SELECT * FROM todo`, []);

    console.log(" Raw query result:", result);

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

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

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

    const result = await query(`DELETE FROM todo WHERE todo_id = $1`, [id]);

    // const rowCount = isUsingNeon ? result.length : result.rowCount;

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo was deleted!" });
  } catch (err) {
    console.error("Delete Todo Error:", err.message);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
