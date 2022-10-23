import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faList, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useState, useRef, useEffect } from "react";
import Contato from "./Components/Contato";
//import ListaContatos from "./Components/ListaContatos";
import { v4 as chave } from 'uuid';


export default function App() {


    //states
    const [contato, setContato] = useState({ id: '', nome: '', telefone: '' })
    const [listaContatos, setListaContatos] = useState([])

    //useRef
    const inputNome = useRef()
    const inputTelefone = useRef()

    //métodos
    function definirNome(event) {
        setContato({ ...contato, nome: event.target.value })
    }

    function definirTelefone(event) {
        setContato({ ...contato, telefone: event.target.value })
    }

    function adicionarContatos() {
        //validação
        if (contato.nome === '' || contato.telefone === '') {
            inputNome.current.focus()
            return
        }

        //verificar se o contato já existe
        let duplicado = listaContatos.find((ct) => ct.nome === contato.nome && ct.telefone === contato.telefone)
        if (typeof duplicado !== 'undefined') {
            inputTelefone.current.focus()
            return
        }

        //adicionar novo contato a lista
        setListaContatos([...listaContatos, { ...contato, id: chave() }])


        //limpar o contato
        setContato({ nome: '', telefone: '' })

        //colocar focus no input nome
        inputNome.current.focus()
    }

    function enterAdicionarContato(event) {
        if (event.code === 'Enter') {
            adicionarContatos()
        }
    }

    // peristênciado state

    //carregar listaContatos do localStorage
    useEffect(() => {
        if (localStorage.getItem('meus_contatos') !== null) {
            setListaContatos(JSON.parse(localStorage.getItem('meus_contatos')))
        }
    }, [])

    //atualizar a lista de contatos no lcaStorage
    useEffect(() => {
        localStorage.setItem('meus_contatos', JSON.stringify(listaContatos))
    }, [listaContatos])

    //limpar toda a Lista
    function limparStorage() {
        setListaContatos([])
    }

    //remover um contato da lista - método sem id, usando props
    /*     function removerContato(ctRemover){
            let tmp = listaContatos.filter(ct => ct.nome !== ctRemover.nome && ct.telefone !== ctRemover.telefone)
            setListaContatos(tmp)
        } */

    function removerContato(id) {
        let tmp = listaContatos.filter(ct => ct.id !== id)
        setListaContatos(tmp)
    }


    return (
        <>
            <div className="container-fluid titulo">
                <div className="row">
                    <div className="col text-center">
                        <h4 className="text-center"><FontAwesomeIcon icon={faList} className='me-3' />LISTA DE CONTATOS</h4>

                    </div>
                </div>
            </div>

            <div className="container-fluid formulario">
                <div className="row">
                    <div className="col p-3">

                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                                <div className="mb-3">
                                    <label className="form-label">Nome:</label><br />
                                    <input type="text"
                                        className="form-control"
                                        ref={inputNome} onChange={definirNome} value={contato.nome} />
                                </div>
                                <div>
                                    <label className="form-label">Telefone:</label><br />
                                    <input className="form-control"
                                        type="text" ref={inputTelefone} onChange={definirTelefone}
                                        onKeyUp={enterAdicionarContato} value={contato.telefone} />
                                </div>
                                <div className="row mt-3">
                                    <div className="col text-start">

                                        <button onClick={adicionarContatos} className='btn btn-outline-info'>
                                            <FontAwesomeIcon icon={faCirclePlus} className='me-2' />
                                            Adicionar
                                        </button>
                                    </div>

                                    <div className="col text-end">
                                        <button onClick={limparStorage} className='btn btn-outline-warning'>
                                            <FontAwesomeIcon icon={faTrash} className='me-2' />
                                            Limpar Lista</button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                    {/* apresentação da lista de contatos */}
                    {listaContatos.map(ct => {
                        return <Contato key={ct.id} id={ct.id} nome={ct.nome} telefone={ct.telefone} remover={removerContato} />
                    })}

                </div>

            </div>


        </>
    )
}