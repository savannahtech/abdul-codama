import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Profile } from '../model'

// auth state interface
interface AuthState {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void
  profile: Profile | null
  setProfile: (profile: Profile) => void
  logout: () => void
}

// auth store
const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuth: false,
      setIsAuth: (isAuth: boolean) => set({ isAuth: isAuth }),
      profile: null,
      setProfile: (profile: Profile | null) => set({ profile: profile }),
      logout: () => {
        set({ isAuth: false, profile: null })
      },
    }),
    {
      name: 'react_test_app',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useAuth
