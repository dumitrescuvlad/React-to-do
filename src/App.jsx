import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import "./styles.css";
import { TodoList } from "./TodoList";

export default function App() {
  
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  const [deletedTodos, setDeletedTodos] = useState(() => {
    const deletedValue = localStorage.getItem("DELETED_ITEMS");
    if (deletedValue == null) return [];
    return JSON.parse(deletedValue);
  });

  
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  
  useEffect(() => {
    localStorage.setItem("DELETED_ITEMS", JSON.stringify(deletedTodos));
  }, [deletedTodos]);

  
  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  
  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

 
  function deleteTodo(id) {
    setTodos((currentTodos) => {
      const todoToDelete = currentTodos.find((todo) => todo.id === id);
  
      
      setDeletedTodos((currentDeletedTodos) => {
        
        const isAlreadyDeleted = currentDeletedTodos.some(
          (deletedTodo) => deletedTodo.id === todoToDelete.id
        );
  
        
        if (!isAlreadyDeleted) {
          return [...currentDeletedTodos, todoToDelete];
        }
  
        return currentDeletedTodos; 
      });
  
      
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  
  function restoreTodo(id) {
    setDeletedTodos((currentDeletedTodos) => {
      const todoToRestore = currentDeletedTodos.find((todo) => todo.id === id);
      setTodos((currentTodos) => [...currentTodos, todoToRestore]);

      return currentDeletedTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />

      <h2 className="header">Deleted Todos</h2>
      <TodoList todos={deletedTodos} deleteTodo={restoreTodo} isDeleted={true} />
    </>
  );
}