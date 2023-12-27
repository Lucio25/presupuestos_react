/* eslint-disable react/prop-types */
import Gasto from "./Gasto"


const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, gastosFiltrados, filtro}) => {
  return (
    <div className="listado-gastos contenedor">

        {
          filtro ? ( 
            <>
            <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoria'}</h2>
              {gastosFiltrados.map( gasto => (
              <Gasto
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
              />
              ))}
             </>
        ):(
          <>

            <h2>{gastos.length ? 'Gastos' : 'No hay gastos'}</h2>
            {gastos.map( gasto => (
            <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
            />
            ))}
          </>
        ) 
      }

    </div>
  )
}

export default ListadoGastos