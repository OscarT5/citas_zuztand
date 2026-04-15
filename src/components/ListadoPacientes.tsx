import { usePacienteStore } from '../store/store'
import Paciente from './Paciente'

const ListadoPacientes = () => {
   
    const pacientes = usePacienteStore(state => state.pacientes)

    return (
        <section className="mx-5 md:mx-0 md:flex md:h-[72vh] md:flex-col">
            <h2 className="text-3xl font-black text-center">Listado de Pacientes</h2>
            <p className="mt-3 mb-8 text-center text-lg text-zinc-700">
                Administra tus {''}
                <span className="font-bold text-indigo-600">Pacientes y Citas</span>
            </p>

            {pacientes.length === 0 ? (
                <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center text-zinc-500 shadow-sm">
                    No hay pacientes aún, agrega uno desde el formulario.
                </div>
            ) : (
                <div className="space-y-5 overflow-y-auto pr-2 md:min-h-0 md:flex-1">
                    {pacientes.map(paciente => (
                        <Paciente paciente={paciente} key={paciente.id}/>
                    ))}
                </div>
            )}
        </section>
    )
}


export default ListadoPacientes