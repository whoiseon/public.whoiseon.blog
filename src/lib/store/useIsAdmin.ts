import { create } from 'zustand';

type IsAdminStore = {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
};

const useIsAdmin = create<IsAdminStore>((set) => ({
  isAdmin: false,
  setIsAdmin: (isAdmin) => set((state) => ({ ...state, isAdmin })),
}));

export default useIsAdmin;
