import { create } from 'zustand';

export interface PublishInterface {
  id?: number | null;
  title: string;
  body: string;
  tags: string[];
  urlSlug: string;
  description: string;
  isTemp: boolean;
  thumbnail: string;
}

interface PublishStoreInterface extends PublishInterface {
  setPublishStore: (publishStore: PublishStoreInterface) => void;
}

const usePublishStore = create<PublishStoreInterface>((set) => ({
  id: null,
  title: '',
  body: '',
  tags: [],
  urlSlug: '',
  description: '',
  isTemp: false,
  thumbnail: '',
  setPublishStore: (publishData: PublishInterface) => set(publishData),
}));

export default usePublishStore;
