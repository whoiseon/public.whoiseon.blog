import { create, createStore, useStore as useZustandStore } from 'zustand';
import { createContext, useContext } from 'react';
import { PreloadedStoreInterface } from '@/lib/store/store';
import { useShallow } from 'zustand/react/shallow';

export interface User {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
}

export interface UserStoreInterface {
  user: User | null;
  setUser: (user: User) => void;
}

function getDefaultInitialState() {
  return {
    user: null,
  };
}

export type UserStoreType = ReturnType<typeof initializeStore>;

const userStoreContext = createContext<UserStoreType | null>(null);

export const Provider = userStoreContext.Provider;

export function useUserStore<T>(selector: (state: UserStoreInterface) => T) {
  const store = useContext(userStoreContext);

  if (!store) throw new Error('User store is missing the provider');

  return useZustandStore(store, selector);
}

export function initializeStore(preloadedState: PreloadedStoreInterface) {
  return createStore<UserStoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    setUser: (user: User) => set((state) => ({ ...state, user })),
  }));
}

export function useUser() {
  return useUserStore(
    useShallow((state) => ({
      user: state.user,
    })),
  );
}
