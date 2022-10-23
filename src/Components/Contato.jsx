import React from "react";
import './Contato.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneVolume, faTrashAlt, faUser } from "@fortawesome/free-solid-svg-icons";

//import { v4 as chave } from 'uuid';

export default function Contato(props) {
    return (
        <>
            <div className="mx-2">
                <div className="container componente-contato my-4">
                    <div className="row">
                        <div className="col p-2">
                            <h4>
                                <FontAwesomeIcon icon={faUser} className='me-3' />
                                {props.nome}</h4>
                        </div>
                        <div className="col p-2 ">
                            <h4><FontAwesomeIcon icon={faPhoneVolume} className='me-3' />
                                {props.telefone}</h4>
                        </div>
                        <div className="col p-2 text-end">
                            {/* <button onClick={()=>{props.remover({nome: props.nome, telefone: props.telefone})}}>
                            Remover</button> - método sem id*/}
                            <h4><FontAwesomeIcon
                                icon={faTrashAlt}
                                className='me-3'
                                onClick={() => { props.remover(props.id) }} />
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}