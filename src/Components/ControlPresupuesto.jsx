/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useState } from "react"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0)


   
    useEffect(() => {
        

        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        setGastado(totalGastado);
        const totalDisponible = presupuesto - totalGastado;
        setDisponible(totalDisponible);
        const nuevoPorcentaje = ((gastado*100/presupuesto).toFixed(2))
        
        setTimeout(() =>{
            setPorcentaje(nuevoPorcentaje)
        }, 1000)
       
        

    }, [gastos, presupuesto, gastado])
    
    

    //funcion para pasar de 6000 => $6.000,00
    const formatearCantidad = (cantidad) =>{
        console.log(cantidad)
        return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD'
        })

    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')
        
        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

  return (
    <>
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            {gastado > presupuesto 
                ?(
                    <div>
                    <CircularProgressbar
                        styles={buildStyles({
                            pathColor: '#E62C11',
                            trailColor: '#DFDDDC',
                            textColor: '#E62C11'
                        })}
                        value={porcentaje}
                        text={`${porcentaje}% Gastado`}
                    />
                </div>
                ): (
                    <div>
                    <CircularProgressbar
                        styles={buildStyles({
                            pathColor: '#3B82F6',
                            trailColor: '#DFDDDC',
                            textColor: '#3B82F6'
                        })}
                        value={porcentaje}
                        text={`${porcentaje}% Gastado`}
                    />
                </div>
                )
                }

                
                {/* 
                tambien puede hacerse asi, pero me da problemas a la hora de actualizar el color

                <div>
                    <CircularProgressbar
                        styles={buildStyles({
                            pathColor: porcentaje > 100 ? 'red' : '#blue',
                            trailColor: '#DFDDDC',
                            textColor: porcentaje > 100 ? 'red' : '#blue'
                        })}
                        value={porcentaje}
                        text={`${porcentaje}% Gastado`}
                    />
                </div> */}
                
                <div className="contenido-presupuesto">
                    <button className="reset-app" type="button" onClick={handleResetApp}>
                        Resetear App
                    </button>
                    <p>
                        <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                    </p>

                    <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                        <span>Disponible: </span> {formatearCantidad(disponible)}
                    </p>

                    <p>
                        <span>Gastado: </span> {formatearCantidad(gastado)}
                        
                    </p>
                    
                </div>
                
        </div>
    </>
  )
}

export default ControlPresupuesto