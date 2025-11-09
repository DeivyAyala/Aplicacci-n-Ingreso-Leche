import type { User } from '@/pages/Registro/Items/Usuarios/types/User'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action'

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
  //Propities 
  user: User | null,
  token: string | null,

  // Getters

  AuthStatus: AuthStatus

  //Actions
  login: (email: string, password: string ) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  //Implementacion del Store
  user: null,
  token: null,
  AuthStatus: 'checking',

  //Actions\
  login: async(email: string, password: string) => {
    console.log('Store',{email, password})
    try {
      const data = await loginAction(email, password);
      localStorage.setItem('token', data.token)

      set({
        user: data.user, 
        token: data.token,
        AuthStatus: 'authenticated'
      })
      return true
     
    } catch (error) {
      localStorage.removeItem('token')
      set({user: null, token: null, AuthStatus: 'not-authenticated'})
      return false
    }
   
  },
  logout: () => {
    localStorage.removeItem('token')
    set({user: null, token: null, AuthStatus: 'not-authenticated' })
  }

}))

