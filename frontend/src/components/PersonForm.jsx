import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const PersonForm = () => {
    const [name, setName] = useState("")
    const [rg, setRg] = useState("")
    const [cpf, setCpf] = useState("")
    const [birth, setBirth] = useState("")
    const [admission, setAdmission] = useState("")
    const [func, setFunc] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !cpf || !rg || !birth || !admission) return;

        sendPerson(name, cpf, rg, birth, admission, func)

        // clear fields
        setName('')
        setRg('')
        setCpf('')
        setBirth('')
        setAdmission('')
        setFunc('')
        alert('Dados Cadastrados')
    }
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
        <div className='person-form'>
            <h1>Cadastrar Nova Pessoa</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-row'>
                    <label className='form-label' htmlFor="name">Nome Completo: </label>
                    <input required value={name} onChange={(e) => setName(e.target.value)} className='form-input' type="text" placeholder='Seu Nome' />
                </div>
                <div className='form-row'>
                    <label className='form-label' htmlFor="rg">RG: </label>
                    <input required value={rg} onChange={(e) => setRg(e.target.value)} className='form-input' type="text" placeholder='99.999.999-9' />
                </div>
                <div className='form-row'>
                    <label className='form-label' htmlFor="cpf">CPF: </label>
                    <input required value={cpf} onChange={(e) => setCpf(e.target.value)} className='form-input' type="text" placeholder='999.999.999-99' />
                </div>
                <div className='form-row'>
                    <label className='form-label' htmlFor="dt-birth">Data Nascimento: </label>
                    <input required value={birth} onChange={(e) => setBirth(e.target.value)} className='form-input' type="date" placeholder='01/01/1990' />
                </div >
                <div className='form-row'>
                    <label className='form-label' htmlFor="dt-admission">Data Admissão: </label>
                    <input required value={admission} onChange={(e) => setAdmission(e.target.value)} className='form-input' type="date" placeholder='01/01/1990' />
                </div>
                <div className='form-row'>
                    <label className='form-label' htmlFor="function">Função: </label>
                    <input value={func} onChange={(e) => setFunc(e.target.value)} className='form-input' type="text" placeholder='Desenvolvedor web' />
                </div>
                <Link to={'/'}>
                    <button style={{ marginRight: "5px", backgroundColor: "#000" }} >Voltar</button>
                </Link>
                <button type="submit">Adicionar Pessoa</button>

            </form >
        </div >
    )
}

export default PersonForm
