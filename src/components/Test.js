"use client";

import { useEffect, useState } from "react";
import { db } from "../../firebasedb.config";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const todosData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTodos(todosData);
  }

  async function addTodo() {
    if (newTodo.trim() === "") return;
    const docRef = await addDoc(collection(db, "todos"), { task: newTodo });
    setTodos([...todos, { id: docRef.id, task: newTodo }]);
    setNewTodo("");
  }

  async function deleteTodo(id) {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
