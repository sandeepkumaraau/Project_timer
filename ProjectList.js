// src/components/ProjectList.js
import React from 'react';
import '../styles/ProjectList.css'; // Ensure this path is correct

const ProjectList = ({ projects, onSelectProject, onDeleteProject }) => {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <div
          key={project.id}
          className="project-item"
          onClick={() => onSelectProject(project)}
        >
          <h3>{project.name}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteProject(project.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
