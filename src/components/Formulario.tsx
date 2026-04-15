import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import Error from './Error'
import { usePacienteStore } from '../store/store'
import type { DraftPatient } from '../types'

type FormErrors = Partial<Record<keyof DraftPatient, string>>

const Formulario = () => {

    const emptyFormValues: DraftPatient = {
        name: '',
        caretaker: '',
        email: '',
        date: '',
        symptoms: '',
    }

    const pacienteActivo = usePacienteStore((state) => state.pacienteActivo)
    const agregarPaciente = usePacienteStore((state) => state.agregarPaciente)
    const actualizarPaciente = usePacienteStore((state) => state.actualizarPaciente)
    const limpiarPacienteActivo = usePacienteStore((state) => state.limpiarPacienteActivo)

    const [formValues, setFormValues] = useState<DraftPatient>(emptyFormValues)
    const [errors, setErrors] = useState<FormErrors>({})

    useEffect(() => {
        if (pacienteActivo) {
            setFormValues({
                name: pacienteActivo.name,
                caretaker: pacienteActivo.caretaker,
                email: pacienteActivo.email,
                date: pacienteActivo.date,
                symptoms: pacienteActivo.symptoms,
            })
        } else {
            setFormValues(emptyFormValues)
        }
        setErrors({})
    }, [pacienteActivo])

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = event.target
        setFormValues((prev) => ({ ...prev, [id]: value }))
    }

    const validateForm = (data: DraftPatient): FormErrors => {
        const nextErrors: FormErrors = {}

        if (!data.name.trim()) {
            nextErrors.name = 'El nombre es obligatorio'
        } else if (data.name.trim().length < 3) {
            nextErrors.name = 'El nombre debe tener al menos 3 caracteres'
        }

        if (!data.caretaker.trim()) {
            nextErrors.caretaker = 'El nombre del propietario es obligatorio'
        }

        if (!data.email.trim()) {
            nextErrors.email = 'El email es obligatorio'
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(data.email)) {
            nextErrors.email = 'El email no es válido'
        }

        if (!data.date) {
            nextErrors.date = 'La fecha es obligatoria'
        }

        if (!data.symptoms.trim()) {
            nextErrors.symptoms = 'Los síntomas son obligatorios'
        }

        return nextErrors
    }

    const registrarPaciente = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const validationErrors = validateForm(formValues)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const payload: DraftPatient = {
            name: formValues.name.trim(),
            caretaker: formValues.caretaker.trim(),
            email: formValues.email.trim(),
            date: formValues.date,
            symptoms: formValues.symptoms.trim(),
        }

        if (pacienteActivo) {
            actualizarPaciente(pacienteActivo.id, payload)
        } else {
            agregarPaciente(payload)
        }

        setFormValues(emptyFormValues)
        setErrors({})
    }

    const handleCancelar = () => {
        limpiarPacienteActivo()
        setFormValues(emptyFormValues)
        setErrors({})
    }

    return (
    <section className="mx-5 w-full md:mx-0 md:h-[72vh]">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form 
            className="mb-10 rounded-lg bg-white px-5 py-10 shadow-md md:mb-0 md:min-h-[calc(72vh-96px)]"
            noValidate
            onSubmit={registrarPaciente}
        >
              <div className="mb-5">
                  <label htmlFor="name" className="text-sm uppercase font-bold">
                      Paciente 
                  </label>
                  <input  
                        id="name"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Paciente"
                                                value={formValues.name}
                                                onChange={handleChange}
                  />
                                {errors.name && <Error>{errors.name}</Error>}

              </div>
              <div className="mb-5">
                <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                    Propietario 
                </label>
                <input  
                    id="caretaker"
                    className="w-full p-3  border border-gray-100"  
                    type="text" 
                    placeholder="Nombre del Propietario" 
                    value={formValues.caretaker}
                    onChange={handleChange}
                />
                {errors.caretaker && <Error>{errors.caretaker}</Error>}
              </div>
            <div className="mb-5">
              <label htmlFor="email" className="text-sm uppercase font-bold">
                  Email 
              </label>
              <input  
                  id="email"
                  className="w-full p-3  border border-gray-100"  
                  type="email" 
                  placeholder="Email de Registro" 
                  value={formValues.email}
                  onChange={handleChange}
              />
              {errors.email && <Error>{errors.email}</Error>}
            </div>

            <div className="mb-5">
                <label htmlFor="date" className="text-sm uppercase font-bold">
                    Fecha Alta 
                </label>
                <input  
                    id="date"
                    className="w-full p-3  border border-gray-100"  
                    type="date" 
                    value={formValues.date}
                    onChange={handleChange}
                />
                {errors.date && <Error>{errors.date}</Error>}
            </div>
            
            <div className="mb-5">
                <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                Síntomas 
                </label>
                <textarea  
                    id="symptoms"
                    className="w-full p-3  border border-gray-100"  
                    placeholder="Síntomas del paciente" 
                    value={formValues.symptoms}
                    onChange={handleChange}
                ></textarea>
                {errors.symptoms && <Error>{errors.symptoms}</Error>}
            </div>

            <input
                type="submit"
                className="w-full cursor-pointer bg-indigo-600 p-3 font-bold uppercase text-white transition duration-100 hover:bg-indigo-700 active:scale-95"
                value={pacienteActivo ? "Actualizar Paciente" : "Agregar Paciente"}
            />
            
            {pacienteActivo && (
                <button
                    type="button"
                    className="mt-3 w-full cursor-pointer bg-gray-600 p-3 font-bold uppercase text-white transition duration-100 hover:bg-gray-700 active:scale-95"
                    onClick={handleCancelar}
                >
                    Cancelar Edición
                </button>
            )}

        </form> 
    </section>
  )

}

export default Formulario