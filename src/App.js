import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => { 
    api.get('repository').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repository', {
      url: "https://github.com/cleytonrs/back-end-repository",
	    title: `New repository ${Date.now()}`,
	    techs: ["Node", "Express", "TypeScript"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repository/${id}`, {});
    
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      
      <button onClick={handleAddRepository}>Add</button>
    </div>
  );
}