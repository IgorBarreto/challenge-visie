import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns';
const PersonEdit = () => {
    const { id } = useParams()
    const [person, setPerson] = useState([])
    const fetchData = async () => {
        const url = `http://localhost:8000/pessoas/${id}`
        try {
            const response = await fetch(url);
            const jsonData = await response.json();
            setName(jsonData['nome'])
            setRg(jsonData['rg'])
            setCpf(jsonData['cpf'])
            setBirth(jsonData['data_nascimento'])
            setAdmission(jsonData['data_admissao'])
            setFunc(jsonData['funcao'] || '')
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    const [name, setName] = useState("")
    const [rg, setRg] = useState("")
    const [cpf, setCpf] = useState("")
    const [birth, setBirth] = useState("")
    const [admission, setAdmission] = useState("")
    const [func, setFunc] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        sendPerson(name, cpf, rg, birth, admission, func)
        alert('DADOS SALVOS')

    }
    const sendPerson = (name, cpf, rg, birth, admission, func) => {
        const url = `http://localhost:8000/pessoas/${id}`;  // Substitua pelo URL correto da sua API
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
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        })
            .then(response => response.json())
            .then(data => {
                fetchData()
                // Faça algo com a resposta da requisição
            })
            .catch(error => {
                console.error('Erro:', error);
                // Faça algo com o erro ocorrido durante a requisição
            });
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='person-form'>
            <form onSubmit={handleSubmit}>
                <div className='form-row'>
                    <label className='form-label' htmlFor="name">Nome Completo: </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className='form-input' type="text" placeholder='Seu Nome' />
                </div>
                <div className='form-row'>
                    <label className='form-label' htmlFor="rg">RG: </label>
                    <input value={rg} onChange={(e) => setRg(e.target.value)} className='form-input' type="text" placeholder='99.999.999-9' />
                </div>
                <div className='form-row'>
                    <label className='form-label' htmlFor="cpf">CPF: </label>
                    <input value={cpf} onChange={(e) => setCpf(e.target.value)} className='form-input' type="text" placeholder='999.999.999-99' />
                </div>
                <div className='form-row'>
                    <label className='form-label' htmlFor="dt-birth">Data Nascimento: </label>
                    <input value={birth} onChange={(e) => setBirth(e.target.value)} className='form-input' type="date" placeholder='01/01/1990' />
                </div >
                <div className='form-row'>
                    <label className='form-label' htmlFor="dt-admission">Data Admissão: </label>
                    <input value={admission} onChange={(e) => setAdmission(e.target.value)} className='form-input' type="date" placeholder='01/01/1990' />
                </div>
                <div className='form-row'>
                    <label className='form-label' htmlFor="function">Função: </label>
                    <input value={func} onChange={(e) => setFunc(e.target.value)} className='form-input' type="text" placeholder='Desenvolvedor web' />
                </div>
                <div style={{ width: '100vw', display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                    <Link to={`/${id}/detail`}>
                        <button style={{ marginRight: '5px', backgroundColor: '#000' }}>Voltar</button>
                    </Link>
                    <Link to={`/${id}/detail`} onClick={(e) => { if (window.confirm('Você quer cancelar?')) deleteIntent(e, id) }}>
                        <button style={{ marginRight: '5px' }} className='remove'>Cancelar Edição</button>
                    </Link>

                    <button type="submit">Salvar Edição</button>


                </div>
            </form >
        </div >
    )
}

export default PersonEdit
