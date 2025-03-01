"use client";
import { DeleteIcon, EditIcon } from "@/assets/icons";
import { _add, _delete, _edit, _fetch } from "@/util/firebaseActions/actions";
import { useEffect, useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState()

  async function fetchTodos() {
    const data = await _fetch('todos')
    setTodos(data);
  }

  async function addTodo() {
    if (newTodo.trim() === "") return;
    const docRef = await _add('todos', { task: newTodo });
    console.log('docRef', docRef)
    fetchTodos();
    setNewTodo("");
  }

  async function deleteTodo(id) {
    await _delete('todos', id)
    fetchTodos();
  }

  async function editTodo() {
    if (!newTodo.trim()) return; // Prevent empty edits
    const success = await _edit("todos", editId, { task: newTodo });
    if (success) {
      fetchTodos();
      setNewTodo("");
      setEditId()
    } else {
      console.error("Failed to update todo");
    }
  }
  useEffect(() => {
    fetchTodos()
  }, [])
  return (
    <div className="max-w-[430px] w-full">
      <h1>To-Do List</h1>
      <div className="flex justify-between">
        <input
          className="w-[80%] p-2"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        {editId ?
          <button className="bg-blue-400 p-2 px-4 rounded-lg cursor-pointer" onClick={editTodo}>Update</button> :
          <button className="bg-blue-400 p-2 px-4 rounded-lg cursor-pointer" onClick={addTodo}>Add</button>
        }
      </div>
      <ul className="py-5">
        {todos.map((todo) => (
          <li className="bg-amber-300 my-1 p-2 px-4 border-2 rounded-2xl" key={todo.task}>
            <input className="w-[70%]" defaultValue={todo.task} readOnly />
            <button
              className="p-2 mx-1 rounded-full bg-red-400"
              onClick={() => deleteTodo(todo.id)}
            >
              <DeleteIcon />
            </button>
            <button
              className="p-2 mx-1 rounded-full bg-green-400"
              onClick={() => {
                setNewTodo(todo.task);
                setEditId(todo.id)
              }}
            >
              <EditIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
