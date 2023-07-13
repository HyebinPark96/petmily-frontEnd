import { create } from "zustand";

const useStore = create((set) => ({
    // 유저 state
    userId: '',
    updateUserId: (userId) => set(() => ({ userId: userId })),

    // 다이얼로그 state
    open: false,
    dialogName: '',

    missingAnimalDetail: {
        desertionNo: 0,
        errorMsg: '',
        filename: '',
        happenDt: '',
        happenPlace: '',
        kindCd: 0,
        colorCd: 0,
        age: '',
        weight: '',
        noticeNo: '',
        noticeSdt: '',
        noticeEdt: '',
        popfile: '',
        processState: '',
        sexCd: '', 
        neuterYn: '',
        specialMark: '',
        careNm: '',
        careTel: '',
        careAddr: '',
        orgNm: '',
        chargeNm: '',
        officetel: '',
        noticeComment: '',
    },
    
    openDialog: (dialogName) => set(() => ({ open: true, dialogName: dialogName })),
    openMissingAnimalDetailDialog: (dialogName, missingAnimalDetail) => set(() => ({ open: true, dialogName: dialogName, missingAnimalDetail: {...missingAnimalDetail} })),
    
    closeDialog: () => set(() => ({ open: false })),
    
    clearDialog: () => set(() => ({ open: false, dialogName: '' })),

}));

export default useStore;