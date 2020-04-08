import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";


function App() {
  const [repositories, setRepostitory] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepostitory(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Desafio ReactJS",
      url: "teste",
      techs: ["teste1", "teste2"]
    });

    const repository = response.data;

    setRepostitory([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const reps = repositories.filter((value,index,arr)=>{return id!==value.id});

    console.log(reps);

    setRepostitory(reps);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(rep => (
          <li key={rep.id}>
            {rep.title}

            <button onClick={() => handleRemoveRepository(rep.id)}>Remover</button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
