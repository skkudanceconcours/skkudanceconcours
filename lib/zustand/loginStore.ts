import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
interface LoginState {
  loginState: "admin" | "anonymous"
  login: () => void
  logout: () => void
}

const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      loginState: "anonymous",
      login: () => set({ loginState: "admin" }),
      logout: () => set({ loginState: "anonymous" }),
    }),
    { 
        name: "loginState", 
        storage: createJSONStorage(() => sessionStorage) 
    },
  ),
);

export default useLoginStore;
