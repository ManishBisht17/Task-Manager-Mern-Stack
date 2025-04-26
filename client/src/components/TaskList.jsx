import TaskItem from "./TaskItem";

function TaskList({ tasks, onUpdate, onDelete }) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
