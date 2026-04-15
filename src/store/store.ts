import { create } from 'zustand'
import type { DraftPatient, Patient } from '../types'
import { v4 as uuidv4 } from 'uuid'


// 1. Definir el tipo del estado
type PacientesState = {
    pacientes: Patient[];
    pacienteActivo: Patient | null;
    agregarPaciente: (data: DraftPatient) => void;
    eliminarPaciente: (id: Patient['id']) => void;
    establecerPacienteActivo: (paciente: Patient) => void;
    actualizarPaciente: (id: Patient['id'], data: DraftPatient) => void;
    limpiarPacienteActivo: () => void;
}


// 2. Función auxiliar para crear un paciente con ID
const crearPaciente = (data: DraftPatient): Patient => {
    return {
        id: uuidv4(),
        ...data
    }
}


// 3. Crear el store
export const usePacienteStore = create<PacientesState>((set) => ({
    pacientes: [],
    pacienteActivo: null,

    agregarPaciente: (data) => set((state) => ({
        pacientes: [...state.pacientes, crearPaciente({ ...data })]
    })),
    eliminarPaciente: (id) => set((state) => ({
        pacientes: state.pacientes.filter(paciente => paciente.id !== id),
        pacienteActivo: state.pacienteActivo?.id === id ? null : state.pacienteActivo
    })),

    establecerPacienteActivo: (paciente) => {
        set(() => ({
            pacienteActivo: paciente
        }))
    },

    actualizarPaciente: (id, data) => {
        const payload = { ...data }
        set((state) => ({
            pacientes: state.pacientes.map(paciente =>
                paciente.id === id
                    ? { id: paciente.id, ...payload }
                    : paciente
            ),
            pacienteActivo: null
        }))
    },

    limpiarPacienteActivo: () => {
        set(() => ({
            pacienteActivo: null
        }))
    }
}))
