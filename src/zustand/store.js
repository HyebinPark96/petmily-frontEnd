import { create } from "zustand";

const useStore = create((set) => ({
    bears: 10,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),

    // (로그인 및 세션 테스트용) 유저 state
    userId: '',
    userPassword: '',
    updateUserId: (userId) => set(() => ({ userId: userId })),
    updateUserPassword: (userPassword) => set(() => ({ userPassword: userPassword })),

    // 다이얼로그 state
    open: false,
    dialogName: '',
    openDialog: (dialogName) => set(() => ({ open: true, dialogName: dialogName })),
    updateOpen: (open) => set(() => ({ open: open })),


}));

export default useStore;