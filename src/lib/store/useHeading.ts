import { create } from 'zustand';

interface HeadingState {
  headingId: string;
  setHeadingId: (id: string) => void;
}

const useHeading = create<HeadingState>((set) => ({
  headingId: '',
  setHeadingId: (id: string) => set({ headingId: id }),
}));

export default useHeading;
