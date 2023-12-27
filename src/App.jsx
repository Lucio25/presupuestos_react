import {useState, useEffect} from 'react'

import Header from './Components/Header'
import Modal from './Components/Modal';
import Filtros from './Components/Filtros';
import ListadoGastos from './Components/ListadoGastos';

import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarID } from './helpers';


function App() {

  // lo q estamos haciendo es decirle que a presupuesto lo inicialice con el valor de presupuesto que tenemos en localStorage, y si no hay, que sea 0
  const [presupuesto, setPresupuesto]= useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    )

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    {/*
      (Object.keys(gastoEditar).length > 0) verifica si el objeto gastoEditar tiene al menos una propiedad (es decir, si no está vacío)
      Object.keys(gastoEditar) devuelve un array con las claves (propiedades) del objeto gastoEditar.
  */}
    if(Object.keys(gastoEditar).length > 0){
      console.log("Click")
      setModal(true)
    
      setTimeout(()=>{
        setAnimarModal(true)
      }, 500)
    }
  }, [gastoEditar])


  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])

  useEffect(() =>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
      if(presupuestoLS>0){
        setIsValidPresupuesto(true)
      }
  },[])


  useEffect(() => {
    if(filtro){
      // filtramos la lista de gastos por la categoria seleccionada en el filtro
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro, gastos])


  const handleNuevoGasto = () =>{
    console.log("Click")
    setModal(true)
   
    setTimeout(()=>{
      setAnimarModal(true)
    }, 500)

    setGastoEditar({})
  }

  const guardarGasto = gasto => {

    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      gasto.id= generarID();
      gasto.fecha = Date.now()
      /* ...gastos crea una nueva matriz que toma todos los elementos de la matriz gastos original y agrega al final el nuevo elemento gasto*/
      setGastos([...gastos, gasto ])
    }
    setAnimarModal(false)

    setTimeout(()=>{
        setModal(false)
    }, 500)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      
      <Header
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto ={isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
        gastos = {gastos}
        setGastos={setGastos}
      />
      
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>
          {/* boton + */}
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto}
              alt='icono nuevo gasto'
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
        {/* Esto sirve para corroborar que "modal" sea verdadero, si lo es ejecuta el codigo despues del && */}
      {modal && 
        <Modal
          setModal = {setModal}
          animarModal = {animarModal}
          setAnimarModal = {setAnimarModal}
          guardarGasto = {guardarGasto}
          gastoEditar = {gastoEditar}
          setGastoEditar = {setGastoEditar}
        />
      }
      
    </div>
  )
}

export default App
