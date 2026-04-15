type DetallePacienteProps = {
    label: string
    data: string
}

export default function PacienteDetalle({label, data} : DetallePacienteProps) {
  return (
    <p className="mb-3 wrap-break-word font-bold uppercase text-gray-700">{label}: {''}
        <span className="font-normal normal-case">{data}</span>
    </p>
  )
}