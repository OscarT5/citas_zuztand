import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {

  return (
    <>
      <div className="mx-auto mt-12 w-[92%] max-w-7xl pb-10">
          <h1 className="font-black text-5xl text-center md:w-2/3 md:mx-auto">
            Seguimiento de Pacientes {''}
            <span className="text-indigo-700">Veterinaria</span>
          </h1>

            <div className="mt-12 grid items-stretch gap-8 md:grid-cols-2">
              <Formulario />
              <ListadoPacientes />
          </div>
      </div>
    </>
  )
}

export default App