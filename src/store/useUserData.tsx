import { create } from "zustand";

interface UserData {
  profileImg: string | null;
  name: string | null;
}
interface UserStore {
  userData: UserData;
  setUserData: (newData: Partial<UserData>) => void;
  clearUserData: () => void;
}
const useUserData = create<UserStore>((set) => ({
  userData: {
    profileImg: null,
    name: null,
  },
  setUserData: (newData) =>
    set((state) => ({
      userData: {
        ...state.userData,
        ...newData,
      },
    })),

  clearUserData: () =>
    set({
      userData: {
        profileImg: null,
        name: null,
      },
    }),
}));

export default useUserData;