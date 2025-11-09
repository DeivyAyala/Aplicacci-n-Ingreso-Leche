import type { User } from '@/pages/Registro/Items/Usuarios/types/User'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action'
import { checkAuthAction } from '../actions/check-auth.action'
import { registerAction } from '../actions/register.action'

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
  //Propities 
  user: User | null,
  token: string | null,
  AuthStatus: AuthStatus

  // Getters

  //Actions
  login: (email: string, password: string ) => Promise<boolean>
  logout: () => void
  checkAuthStatus: () => Promise<boolean>
  register: (name: string, 
    lastName: string, 
    email: string, 
    password: string ) => Promise<boolean>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  //Implementacion del Store
  user: null,
  token: null,
  AuthStatus: 'checking',

  // Getters
  isAdmin : ( ) => {
    const rol = get().user?.rol || null;
    return rol === 'Administrador';
  },

  //Actions\
  login: async(email: string, password: string) => {
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
  },
  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({
        user: user,
        token: token,
        AuthStatus: 'authenticated'
      })
      return true
    } catch (error) {
      set({
        user: undefined,
        token: undefined,
        AuthStatus: 'not-authenticated'
      })
      return false
    }
  },
  register:async(name: string, lastName: string, email: string, password: string ) => {
    try {
      const data = await registerAction(name, lastName, email, password);
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
  }


}))

