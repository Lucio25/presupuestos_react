/* eslint-disable react/prop-types */
import ControlPresupuesto from "./ControlPresupuesto"
import NuevoPresupuesto from "./NuevoPresupuesto"



const Header = ({presupuesto , setPresupuesto, 
              isValidPresupuesto, setIsValidPresupuesto, 
              gastos, setGastos}) => {
  return (
    <>
        <header>
            <h1>
                Planificador de gastos
            </h1>

                {/* Condicional, primero la variable a revisar, si es verdadero, entra en el parentesis que le sigue al ?,
                y si es falso, al parentesis que le sigue a : */}
            {isValidPresupuesto ? (
              <p>
                <ControlPresupuesto
                presupuesto = {presupuesto}
                setPresupuesto={setPresupuesto}
                gastos = {gastos}
                setGastos={setGastos}
                setIsValidPresupuesto={setIsValidPresupuesto}
                />
              </p>
            ):(
              <NuevoPresupuesto
              presupuesto = {presupuesto}
              setPresupuesto = {setPresupuesto}
              setIsValidPresupuesto={setIsValidPresupuesto}
              />
            )}
           
        </header>
    </>
  )
}

export default Header