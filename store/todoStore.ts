import { create } from "zustand";
type NewTodoState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewTodo = create<NewTodoState>()((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});
