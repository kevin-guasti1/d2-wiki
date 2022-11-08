
import { useState } from 'react';
import Input from '../componentes/Input/index.js';
import Button from '../componentes/Button/index.js';
import ItemRepo from '../componentes/ItemRepo/index.js';
import { api } from '../services/api.js';

import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);


  const handleSearchRepo = async () => {

    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id){

      const isExist = repos.find(repo => repo.id === data.id);

      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      }

    }
    alert('Repositório não encontrado')

  }

  const handleRemoveRepo = (id) => {
    const newRepos = repos.filter((repo) => repo.id !== id);

    setRepos(newRepos);
  }


  return (
    <Container>
      <img src='https://img.icons8.com/ios-glyphs/512/github.png'  width={60} height={60} />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
