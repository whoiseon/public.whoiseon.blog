import { createStore, useStore as useZustandStore } from 'zustand';
import { createContext, useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { PreloadedStoreInterface } from '@/lib/store/store';

export interface Publish {
  id?: number;
  title: string;
  body: string;
  tags: string[];
  urlSlug: string;
  description: string;
  isTemp: boolean;
  thumbnail: string;
}

export interface PublishStoreInterface {
  post: Publish | null;
  setPublishStore: (publish: Publish) => void;
}

function getDefaultInitialState() {
  return {
    post: null,
  };
}

export type PublishStoreType = ReturnType<typeof initializeStore>;

const publishStoreContext = createContext<PublishStoreType | null>(null);

export const Provider = publishStoreContext.Provider;

export function usePublishStore<T>(
  selector: (state: PublishStoreInterface) => T,
) {
  const store = useContext(publishStoreContext);

  if (!store) throw new Error('Publish store is missing the provider');

  return useZustandStore(store, selector);
}

export function initializeStore(preloadedState: PreloadedStoreInterface) {
  return createStore<PublishStoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    setPublishStore: (publish: Publish) =>
      set((state) => ({ ...state, post: publish })),
  }));
}

export function usePublish() {
  return usePublishStore(
    useShallow((state) => ({
      post: state.post,
      setPublishStore: state.setPublishStore,
    })),
  );
}
