import React, { useEffect } from 'react'
import { usePacienteStore } from '../store/store'

const Toast = () => {
  const toastMsg = usePacienteStore(state => state.toastMsg)
  const hideToast = usePacienteStore(state => state.hideToast)

  // Auto-dismiss after 3 s
  useEffect(() => {
    if (!toastMsg) return
    const timer = setTimeout(() => hideToast(), 3000)
    return () => clearTimeout(timer)
  }, [toastMsg, hideToast])

  if (!toastMsg) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl shadow-green-200 animate-toast"
    >
      {/* Check icon */}
      <div className="bg-white bg-opacity-25 rounded-full p-1 flex-shrink-0">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span className="font-semibold text-sm">{toastMsg}</span>
      {/* Manual close */}
      <button
        onClick={hideToast}
        className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
    </div>
  )
}

export default Toast
