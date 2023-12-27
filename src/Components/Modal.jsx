/* eslint-disable react/prop-types */

import CerrarBtn from '../img/cerrar.svg'
import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [nombre, setNombre] = useState("")
    const [cantidad, setCantidad] = useState("")
    const [categoria, setCategoria] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [id, setID] = useState("")
    const [fecha, setfecha] = useState("")

    useEffect(() =>{
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setID(gastoEditar.id)
            setfecha(gastoEditar.fecha)
        }


    }, []);

    const ocultarModal = () => {
        
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(()=>{
            setModal(false)
          }, 500)
        
    }

    const handleSubmit = e =>{
        e.preventDefault();
        console.log("JOIA")

        if ([nombre, cantidad, categoria].includes("")){
            setMensaje("Todos los campos son requeridos")
            return
        }
        setMensaje("")
        guardarGasto({nombre, cantidad, categoria, id, fecha})
        
    }

  return (
    <>
    <div className="modal">
        <div className="cerrar-modal">
            <img
                src={CerrarBtn}
                alt='cerrar modal'
                onClick={ocultarModal}
            />
        </div>
        <form 
        className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
        onSubmit={handleSubmit}
        >
            <legend>{Object.keys(gastoEditar).length > 0 ? "Editar" : "Nuevo Gasto"}</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor='nombre'>Nombre Gasto</label>

                <input
                    id='nombre'
                    type='text'
                    placeholder='Añade el Nombre del Gasto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className='campo'>
                <label htmlFor='cantidad'>Cantidad</label>

                <input
                    id='cantidad'
                    type='number'
                    placeholder='Añade la Cantidad del Gasto'
                    value={cantidad}
                    onChange={ e => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor='categoria'>Categoria</label>

                <select
                    id='categoria'
                    value={categoria}
                    onChange={ e => setCategoria(e.target.value)}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
               
            </div>

            <input
                type='submit'
                    id='categoria'
                    value={Object.keys(gastoEditar).length > 0 ? "Confirmar Cambios" : 'Añadir Gasto'}
            />
        </form>
    </div>
    </>
  )
}

export default Modal