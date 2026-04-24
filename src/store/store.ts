import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DraftPatient, Patient } from '../types'
import { v4 as uuidv4 } from 'uuid'


type PacientesState = {
    // Estados
    pacientes: Patient[];
    pacienteActivo: Patient | null;
    // Funciones
    agregarPaciente: (data: DraftPatient) => void;
    eliminarPaciente: (id: string) => void;
    establecerPacienteActivo: (paciente: Patient) => void;
    actualizarPaciente: (data: DraftPatient) => void;
    limpiarPacienteActivo: () => void;
    // Toast
    toastMsg: string;
    showToast: (msg: string) => void;
    hideToast: () => void;
}


const crearPaciente = (data: DraftPatient): Patient => {
    return {
        id: uuidv4(),
        ...data
    }
}


export const usePacienteStore = create<PacientesState>()(   // <-- () extra
    persist(
        (set) => ({
            pacientes: [],
            pacienteActivo: null,
            agregarPaciente: (data) => set((state) => ({
                pacientes: [...state.pacientes, crearPaciente(data)]
            })),
            eliminarPaciente: (id) => set((state) => ({
                pacientes: state.pacientes.filter(p => p.id !== id)
            })),
            establecerPacienteActivo: (paciente) => {
                set({ pacienteActivo: paciente })
            },
            actualizarPaciente: (data) => {
                set((state) => ({
                    pacientes: state.pacientes.map(paciente =>
                        paciente.id === state.pacienteActivo?.id
                            ? { id: paciente.id, ...data }
                            : paciente
                    ),
                    pacienteActivo: null
                }))
            },
            limpiarPacienteActivo: () => {
                set({ pacienteActivo: null })
            },
            // Toast
            toastMsg: '',
            showToast: (msg) => set({ toastMsg: msg }),
            hideToast: () => set({ toastMsg: '' }),
        }),
        {
            name: 'pacientes-storage',          // <-- clave en localStorage
            partialize: (state) => ({           // <-- solo persiste pacientes
                pacientes: state.pacientes
                // pacienteActivo, toastMsg y funciones NO se persisten
            }),
        }
    )
)
