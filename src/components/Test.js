"use client";
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
    const docRef = await _add('todos',{ task: newTodo });
    console.log('docRef',docRef)
    fetchTodos();
    setNewTodo("");
  }

  async function deleteTodo(id) {
    await _delete('todos',id)
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
  useEffect(()=>{
    fetchTodos()
  },[])
  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      {editId ? <button onClick={editTodo}>Update</button> : <button onClick={addTodo}>Add</button>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => {
              setNewTodo(todo.task);
              setEditId(todo.id)
            }}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
