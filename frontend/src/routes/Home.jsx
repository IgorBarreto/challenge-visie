import { useEffect, useState } from 'react'
import "../App.css"
import Person from "../components/Person"
import PersonForm from "../components/PersonForm"
import { Link } from 'react-router-dom'
function Home() {
  const [persons, setPersons] = useState([])
  const fetchData = async () => {
    const url = 'http://localhost:8000/pessoas'
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      setPersons(jsonData);
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="app">
      <h1>Lista de Pessoas</h1>
      <div className="person-list">

        <div className="content">
          <p>Nome</p>
          <p>Data de Admissão</p>
        </div>

        {persons.map((person) => (
          <Person key={person.id_pessoa} person={person} />
        ))}
      </div>
      <Link to={'/new-person'}>
        <button>Adicionar novo registro</button>
      </Link>
      {/* <h1>Cadastrar Nova Pessoa</h1> */}
      {/* <PersonForm sendPerson={sendPerson} /> */}

    </div >
  )
}

export default Home
