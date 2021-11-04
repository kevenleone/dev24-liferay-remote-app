import React, { useEffect, useState } from "react";
import baseFetch from "../../../common/services/liferay/api";
import Layout from "../../../common/components/layout";
import { getUserEmailAddress } from "../../../common/services/liferay/ThemeDisplay";

const HelloWorld = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    baseFetch("o/c/todos")
      .then(({ items = [] }) => {
        setTodos(items);
      })
      .catch(console.error);
  };

  const onAddTodo = async () => {
    const data = await baseFetch("o/c/todos", {
      method: "POST",
      body: { task, completed: false, email: getUserEmailAddress() },
    });

    setTask("");

    setTodos((prevState) => [...prevState, data]);
  };

  const onRemoveTodo = async (id) => {
    await baseFetch(`o/c/todos/${id}`, {
      method: "DELETE",
    });

    setTodos((prevState) => prevState.filter((state) => state.id !== id));
  };

  return (
    <Layout>
      <div className="todos">
        <h1>Todo App</h1>

        <div className="d-flex">
          <input
            className="form-control"
            onChange={({ target: { value } }) => setTask(value)}
            placeholder="Add your new todo"
            value={task}
          />
          <button className="ml-4 btn btn-primary" onClick={onAddTodo}>
            Add
          </button>
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <div
              className="align-items-center d-flex justify-content-between"
              key={todo.id}
            >
              <span>{todo.task}</span>
              <button
                className="btn btn-danger"
                onClick={() => onRemoveTodo(todo.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>

        <p>You have {todos.length} pending tasks</p>
      </div>
    </Layout>
  );
};

export default HelloWorld;
