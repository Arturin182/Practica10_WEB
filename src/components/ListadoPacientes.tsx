import React, { useState } from 'react'
import { usePacienteStore } from '../store/store'
import ModalConfirmacion from './ModalConfirmacion'
import type { Patient } from '../types'

const ListadoPacientes = () => {
  const pacientes = usePacienteStore(state => state.pacientes)
  const eliminarPaciente = usePacienteStore(state => state.eliminarPaciente)
  const showToast = usePacienteStore(state => state.showToast)
  const establecerPacienteActivo = usePacienteStore(state => state.establecerPacienteActivo)

  const [pacienteAEliminar, setPacienteAEliminar] = useState<Patient | null>(null)

  const handleEliminarClick = (paciente: Patient) => {
    setPacienteAEliminar(paciente)
  }

  const handleConfirmar = () => {
    if (!pacienteAEliminar) return
    eliminarPaciente(pacienteAEliminar.id)
    showToast(` Paciente "${pacienteAEliminar.name}" eliminado exitosamente.`)
    setPacienteAEliminar(null)
  }

  const handleCancelar = () => {
    setPacienteAEliminar(null)
  }

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      <h2 className="font-black text-3xl text-center">Lista de Pacientes</h2>
      <p className="text-xl mt-5 text-center mb-10">
        Administra tus {''}
        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
      </p>

      {pacientes.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No hay pacientes registrados aún.</p>
      ) : (
        pacientes.map(paciente => (
          <div key={paciente.id} className="mx-5 my-10 bg-white shadow-md rounded-xl py-10 px-5">
            <p className="font-bold mb-3 text-gray-700 uppercase">
              ID: <span className="font-normal normal-case text-indigo-600">{paciente.id}</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
              Nombre: <span className="font-normal normal-case">{paciente.name}</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
              Dueño: <span className="font-normal normal-case">{paciente.caretaker}</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
              Email: <span className="font-normal normal-case">{paciente.email}</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
              Fecha: <span className="font-normal normal-case">{paciente.date}</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
              Síntomas: <span className="font-normal normal-case">{paciente.symptoms}</span>
            </p>


            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => establecerPacienteActivo(paciente)}
                className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-bold py-2 px-5 rounded-lg transition-all shadow-md shadow-indigo-100"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Editar
              </button>
              <button
                onClick={() => handleEliminarClick(paciente)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold py-2 px-5 rounded-lg transition-all shadow-md shadow-red-100"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}

      <ModalConfirmacion
        paciente={pacienteAEliminar}
        onConfirmar={handleConfirmar}
        onCancelar={handleCancelar}
      />
    </div>
  )
}

export default ListadoPacientes