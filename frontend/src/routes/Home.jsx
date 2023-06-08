import { useEffect, useState } from 'react'
import "../App.css"
import Person from "../components/Person"
import PersonForm from "../components/PersonForm"
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
  const sendPerson = (name, cpf, rg, birth, admission, func) => {
    const url = 'http://localhost:8000/pessoas/';  // Substitua pelo URL correto da sua API
    console.log('ESTOU ENTRANDO')
    const person =

    {
      "nome": name,
      "rg": rg,
      "cpf": cpf,
      "data_nascimento": birth,
      "data_admissao": admission,
      "funcao": func,
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(person)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Resposta:', data);
        const newPersons = [...persons, data]
        setPersons(newPersons)
        // Faça algo com a resposta da requisição
      })
      .catch(error => {
        console.error('Erro:', error);
        // Faça algo com o erro ocorrido durante a requisição
      });
  }

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
      <h1>Cadastrar Nova Pessoa</h1>
      <PersonForm sendPerson={sendPerson} />

    </div >
  )
}

export default Home
