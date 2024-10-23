import React, { useEffect, useState } from "react";

function App() {
  const [toDos, setToDos] = useState([]);

  // Load data from https://jsonplaceholder.typicode.com/todos?userId=3

  useEffect(() => {

    const abortController = new AbortController;

    async function loadUser () {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?userId=3",
          { signal: abortController.signal }
        );
        const data = await response.json();
        setToDos(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch request aborted.");
        } else {
          console.error("Fetch error:", error);
        }
      }
    }

    loadUser();

    return () => abortController.abort();

  }, []);

  return (
    <div className="App">
      <h1>To Do List</h1>
      <ul className="todo-list">
        {toDos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "",
            }}
          >
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
