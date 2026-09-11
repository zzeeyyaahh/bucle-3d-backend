import { create } from 'zustand'

export const useStore = create((set) => ({
  activeService: null,
  setActiveService: (service) => set({ activeService: service }),
  cameraFocus: [0, 0, 5],
  setCameraFocus: (focus) => set({ cameraFocus: focus }),
}))