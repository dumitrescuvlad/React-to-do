export function TodoItem({ completed, id, title, toggleTodo, deleteTodo, isDeleted }) {
  return (
    <li>
      <label>
        {!isDeleted && (
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => toggleTodo(id, e.target.checked)}
          />
        )}
        {title}
      </label>
      <button onClick={() => deleteTodo(id)} className="btn btn-danger">
        {isDeleted ? "Restore" : "Delete"}
      </button>
    </li>
  );
}