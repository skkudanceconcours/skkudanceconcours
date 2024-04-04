import { create } from "zustand";
interface LoginState {
    loginState: 'admin'|'anonymous'
    login: () => void
    logout: () => void
}

const useLoginStore = create<LoginState>((set) => ({
    loginState: 'anonymous',
   
    login: () => set({ loginState: 'admin' }),
    logout: () => set({ loginState:'anonymous' })
  }));
  
  export default useLoginStore;