import { useState } from "react"
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom'
const Person = ({ person }) => {
    return (
        <div className="person">
            <div className="content">
                <p>{person.nome.split(" ")[0]}</p>
                <p>{format(parseISO(person.data_admissao), 'dd/MM/yyyy')}</p>

            </div>
            <div>

                <Link to={`${person.id_pessoa}/detail`}>
                    < button className='detail'>Editar / Excluir</button >

                </Link>



            </div>
        </div >
    )
}

export default Person
