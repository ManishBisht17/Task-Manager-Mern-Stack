function TaskItem({ task, onUpdate, onDelete }) {
  const toggleStatus = () => {
    const nextStatus =
      task.status === "Pending"
        ? "In Progress"
        : task.status === "In Progress"
        ? "Completed"
        : "Pending";
    onUpdate(task._id, { status: nextStatus });
  };

  return (
    <div className="card flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <p className="text-sm text-gray-500">{task.status}</p>
        <p className="text-xs text-gray-400">
          Created: {new Date(task.createdAt).toLocaleString()}
        </p>
        {task.completedAt && (
          <p className="text-xs text-green-400">
            Completed: {new Date(task.completedAt).toLocaleString()}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <button onClick={toggleStatus}>🔄</button>
        <button onClick={() => onDelete(task._id)}>🗑️</button>
      </div>
    </div>
  );
}

export default TaskItem;
