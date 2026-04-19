import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface LoginState {
  loginState: "admin" | "anonymous"
  _hasHydrated: boolean
  setHasHydrated: (state: boolean) => void
  login: () => void
  logout: () => void
}

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      loginState: "anonymous",
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      login: () => set({ loginState: "admin" }),
      logout: () => set({ loginState: "anonymous" }),
    }),
    { 
        name: "loginState", 
        storage: createJSONStorage(() => sessionStorage),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
    },
  ),
);

export default useLoginStore;
