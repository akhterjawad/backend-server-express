import Todos from "../models/todos.models.js";
import mongoose from "mongoose";

// add todo
const addTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({
      message: "title or description required",
    });
    return;
  }
  const todo = Todos.create({
    title,
    description,
  });
  res.status(201).json({
    message: "user added to database successfully",
  });
};

// get all todo
const getAllTodos = async (req, res) => {
  const todos = await Todos.find({});
  res.status(200).json({
    todos: todos,
  });
};

// get single todo
const getTodoWithId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not valid Id" });
  }

  const todo = await Todos.findById(id);
  if (!todo) {
    res.status(404).json({
      message: "no todo found!",
    });
    return;
  }
  res.status(200).json(todo);
};

// delete todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not valid Id" });
  }

  const todo = await Todos.findOneAndDelete({ _id: id });
  if (!todo) {
    res.status(404).json({
      message: "no todo found!",
    });
    return;
  }

  res.status(200).json({
    message: "todo deleted successfully",
    todo,
  });
};

// edit todo
const editTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not valid Id" });
  }
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({
      message: "You must enter both fields",
    });
    return;
  }
  try {
    let updatetodo = await Todos.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "todo edit successfully",
      updatetodo
    });
  } catch (error) {
    console.log(error);
  }
};

export { addTodo, getAllTodos, getTodoWithId, deleteTodo, editTodo };
