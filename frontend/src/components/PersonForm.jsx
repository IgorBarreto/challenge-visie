import React, { useState } from 'react'

const PersonForm = ({ sendPerson }) => {
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
    return (
        <div className='person-form'>
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
                <button type="submit">Adicionar Pessoa</button>

            </form >
        </div >
    )
}

export default PersonForm
