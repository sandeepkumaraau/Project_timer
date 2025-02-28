// src/App.js
import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import Timer from './components/Timer';
import './styles/App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Add a new project
  const addProject = (name) => {
    const newProject = {
      id: Date.now(),
      name,
      totalTime: 0,
      sessions: []
    };
    setProjects([...projects, newProject]);
  };

  // Handle click for Add Project button (using prompt for simplicity)
  const handleAddProjectClick = () => {
    const name = prompt("Enter project name:");
    if (name && name.trim()) {
      addProject(name.trim());
    }
  };

  // Delete a project and clear selection if needed
  const deleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject(null);
    }
  };

  // Add a new session to a project, storing both raw seconds and formatted time.
  const addSessionToProject = (projectId, sessionTime, formattedTime) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          totalTime: project.totalTime + sessionTime,
          sessions: [...project.sessions, { duration: sessionTime, formatted: formattedTime }]
        };
      }
      return project;
    }));
  };

  // Select a project when clicked
  const selectProject = (project) => {
    setSelectedProject(project);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Project Timer</h1>
        <button className="add-project-button" onClick={handleAddProjectClick}>
          Add Project
        </button>
      </div>
      <div className="layout">
        {/* Left Panel: Project List */}
        <div className="left-panel">
          <ProjectList
            projects={projects}
            onSelectProject={selectProject}
            onDeleteProject={deleteProject}
          />
        </div>

        {/* Center Panel: Timer */}
        <div className="center-panel">
          {selectedProject ? (
            <Timer
              onSessionEnd={(sessionTime, formattedTime) =>
                addSessionToProject(selectedProject.id, sessionTime, formattedTime)
              }
            />
          ) : (
            <div className="placeholder">Select a project to time</div>
          )}
        </div>

        {/* Right Panel: Session Details */}
        <div className="right-panel">
          {selectedProject ? (
            <div>
              <h2>{selectedProject.name} Sessions</h2>
              <p>
                Total Time: {selectedProject.sessions.reduce((acc, session) => acc + session.duration, 0)}s
              </p>
              {selectedProject.sessions.length > 0 ? (
                <ul>
                  {selectedProject.sessions.map((session, index) => (
                    <li key={index}>Session: {session.formatted}</li>
                  ))}
                </ul>
              ) : (
                <p>No sessions recorded yet.</p>
              )}
            </div>
          ) : (
            <div className="placeholder">No project selected</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
