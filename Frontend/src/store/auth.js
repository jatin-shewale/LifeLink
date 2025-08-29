import { create } from 'zustand'

const persisted = (key, initial) => {
  const fromStorage = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null
  return fromStorage ? JSON.parse(fromStorage) : initial
}

export const useAuthStore = create((set, get) => ({
  user: persisted('ll_user', null),
  token: persisted('ll_token', null),

  login: async ({ email, password }) => {
    const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!res.ok) throw new Error('Login failed')
    const data = await res.json()
    localStorage.setItem('ll_user', JSON.stringify(data.user))
    localStorage.setItem('ll_token', JSON.stringify(data.token))
    set({ user: data.user, token: data.token })
  },

  register: async (payload) => {
    const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Registration failed')
    return res.json()
  },

  logout: () => {
    localStorage.removeItem('ll_user')
    localStorage.removeItem('ll_token')
    set({ user: null, token: null })
  },

  hasRole: (roles) => {
    const current = get().user
    if (!current) return false
    if (Array.isArray(roles)) return roles.includes(current.role)
    return current.role === roles
  },
}))

export const requireRole = (user, roles) => {
  if (!user) return false
  if (Array.isArray(roles)) return roles.includes(user.role)
  return user.role === roles
}


