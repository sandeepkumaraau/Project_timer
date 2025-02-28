import React from 'react';
import Timer from './Timer';
import { formatSecondsToHMS } from '../utils/timeUtils';

const Project = ({ project, onAddSession, onDeleteProject }) => {
  return (
    <div className="project">
      <h2>{project.name}</h2>
      <p>Total Time: {formatSecondsToHMS(project.totalTime)}</p>
      <Timer onSessionEnd={(sessionTime) => onAddSession(project.id, sessionTime)} />
      <button onClick={() => onDeleteProject(project.id)}>Delete Project</button>
      <h3>Sessions</h3>
      <ul>
        {project.sessions.map((session, idx) => (
          <li key={idx}>Session: {formatSecondsToHMS(session.duration)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Project;
