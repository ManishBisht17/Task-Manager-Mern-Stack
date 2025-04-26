export default function ProjectItem({ project }) {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow">
      <h3 className="text-lg font-semibold">{project.title}</h3>
    </div>
  );
}
