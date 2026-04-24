import React, { useEffect } from 'react'
import type { Patient } from '../types'

type Props = {
  paciente: Patient | null
  onConfirmar: () => void
  onCancelar: () => void
}

const ModalConfirmacion = ({ paciente, onConfirmar, onCancelar }: Props) => {

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancelar()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onCancelar])

  if (!paciente) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={onCancelar}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-modal"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center mb-5">
          <div className="bg-red-100 rounded-full p-4">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>
        </div>

        <h3 className="text-2xl font-black text-center text-gray-800 mb-2">
          Confirmar eliminación
        </h3>

        <p className="text-center text-gray-500 mb-1">
          Estas a punto de eliminar al paciente:
        </p>

        <p className="text-center text-indigo-700 font-bold text-lg mb-1">
          {paciente.name}
        </p>
        <p className="text-center text-gray-400 text-sm mb-6">
          Dueño: {paciente.caretaker}
        </p>

        <p className="text-center text-sm text-red-500 font-medium mb-8">
          Esta acción no se puede deshacer.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onCancelar}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 active:scale-95 transition-all shadow-md shadow-red-200"
          >
            eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirmacion
