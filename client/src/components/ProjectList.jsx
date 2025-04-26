import ProjectItem from "./ProjectItem";

export default function ProjectList({ projects }) {
  return (
    <div className="space-y-4">
      {projects.map((p) => (
        <ProjectItem key={p._id} project={p} />
      ))}
    </div>
  );
}
