import type { Patient } from "../types"
import PacienteDetalle from "./PacienteDetalle"
import { usePacienteStore } from '../store/store'
import DialogModal from "./DialogModal"
import { useState } from "react"
import { toast } from "react-toastify"


type PacienteProps = {
    paciente: Patient
}

const Paciente = ({ paciente }: PacienteProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const eliminarPaciente = usePacienteStore((state) => state.eliminarPaciente)

    const establecerPacienteActivo =
    usePacienteStore((state) => state.establecerPacienteActivo)

    const handleClickEditar = () => {
        establecerPacienteActivo({ ...paciente })
    }

    const confirmarEliminacion = () => {
        eliminarPaciente(paciente.id)
        toast.success(`Paciente ${paciente.name} eliminado correctamente`) 
    }

    return (
        <article className="w-full rounded-xl border border-zinc-100 bg-white p-6 shadow-md">
            <PacienteDetalle label="ID" data={paciente.id} />
            <PacienteDetalle label="Nombre" data={paciente.name} />
            <PacienteDetalle label="Propietario" data={paciente.caretaker} />
            <PacienteDetalle label="Email" data={paciente.email} />
            <PacienteDetalle label="Fecha Alta" data={paciente.date || ''} />
            <PacienteDetalle label="Síntomas" data={paciente.symptoms} />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button
                    type="button"
                    className="w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 font-bold uppercase text-white transition duration-100 hover:bg-indigo-700 active:scale-95"
                    onClick={handleClickEditar}
                >Editar</button>

                <button
                    type="button"
                    className="w-full cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-bold uppercase text-white transition duration-100 hover:bg-red-700 active:scale-95"
                    onClick={() => setIsOpened(true)}
                >Eliminar</button>
                <DialogModal
                  title="Eliminar Paciente"
                  isOpened={isOpened}
                                    onProceed={confirmarEliminacion}
                  onClose={() => setIsOpened(false)}
                >
                                    <p>
                                        Estas a punto de eliminar al paciente {''}
                                        <span className="font-semibold text-zinc-900">{paciente.name} </span> 
                                        y su propietario {''}
                                        <span className="font-semibold text-zinc-900">{paciente.caretaker}</span>.
                                    </p>
                                    <p className="mt-2 text-sm text-zinc-500">
                                        Esta accion no se puede deshacer.
                                    </p>
                </DialogModal>
            </div>
                </article>
    )
}

export default Paciente