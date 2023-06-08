import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns';
const PersonDetail = () => {
    const { id } = useParams()
    const [person, setPerson] = useState([])
    const fetchData = async () => {
        const url = `http://localhost:8000/pessoas/${id}`
        try {
            const response = await fetch(url);
            const jsonData = await response.json();
            setPerson(jsonData);
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    const deletePerson = (() => {
        const url = `http://localhost:8000/pessoas/${id}`;  // Substitua pelo URL correto da sua API
        fetch(url, { method: 'DELETE' }).catch(error => {
            console.error('Erro:', error);
        })
    })
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }} className="person">
                <h2>Detalhes da Pessoa: {person.nome}</h2>

                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}>
                    < div className="content">
                        None: <p>{person.nome}</p>
                        Data de Nascimento:<p>{person.data_nascimento}</p>
                        Data de Admissão: <p>{person.data_admissao}</p>
                        CPF: <p>{person.cpf}</p>
                        RG: <p>{person.rg}</p>
                        FUNÇÃO: <p>{person.funcao}</p>
                    </div>
                    <div style={{ width: '100vw', display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                        <Link to={'/'}>
                            <button style={{ backgroundColor: '#000' }}>Voltar</button>
                        </Link>
                        <Link to={`/${person.id_pessoa}/edit`}>
                            < button style={{ margin: '5px' }} className='detail'>Editar</button >
                        </Link>
                        <Link to={'/'}>
                            < button onClick={deletePerson} className='remove'>Excluir</button >

                        </Link>
                    </div>
                </div >
            </div >

        </>
    )
}

export default PersonDetail
