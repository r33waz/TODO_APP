import Todo from "../model/todolist.model.js";

//*API to create newtodo
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(title);
    console.log(description);
    if (!title && !description) {
      return res.status(400).json({
        status: false,
        message: "Please provide title and description",
      });
    } else {
      const newTodo = new Todo(req.body);
      await newTodo.save();

      return res.status(201).json({
        status: true,
        data: newTodo,
        message: "New todo created",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error" + error,
    });
  }
};

//* API to getall todo
export const getAllTodos = async (req, res) => {
  try {
    //* sort by date in descending order
    const todos = await Todo.find().sort("-createdAt");
    console.log(todos);
    if (todos) {
      return res.status(200).json({
        status: true,
        data: todos,
        message: "Successfully fetched all todos",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "No todos found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error" + error,
    });
  }
};
//* API to gettodo by id
export const getTodoById = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById({ _id: id });
    if (todo) {
      return res.status(200).json({
        status: true,
        data: todo,
        message: "Successfully fetched the todo",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "No todo found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error" + error,
    });
  }
};
//* API to deletetodo
export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const todo = await Todo.findById({ _id: id });
    if (!todo) {
      return res.status(400).json({
        status: false,
        message: "No todo Found",
      });
    } else {
      const deleteTodo = await Todo.findByIdAndDelete({ _id: id });
      if (deleteTodo) {
        return res.status(200).json({
          status: true,
          message: "Todo Deleted Successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error" + error,
    });
  }
};
//* API to updatetodo
export const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById({ _id: id });
    if (!todo) {
      return res.status(400).json({
        staus: false,
        message: "No todo Found",
      });
    } else {
      const updateTodo = await Todo.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            ...req.body,
          },
        },
        {
          new: true,
        }
      );
      if (updateTodo) {
        return res.status(200).json({
          stauts: true,
          data: updateTodo,
          message: "Todo Updated Successfully",
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Error in updating the todo",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error" + error,
    });
  }
};
