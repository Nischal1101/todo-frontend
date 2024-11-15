import { create } from "zustand";
type NewTodoState = {
  isUpdateOpen: boolean;
  onUpdateOpen: () => void;
  onUpdateClose: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewTodo = create<NewTodoState>()((set) => {
  return {
    isUpdateOpen: false,
    onUpdateOpen: () => set({ isOpen: true }),
    onUpdateClose: () => set({ isOpen: false }),
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});
