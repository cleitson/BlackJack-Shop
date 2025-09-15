'use client'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>
}

export function useAuthFetch() {
  const { token, logout } = useAuth()
  const router = useRouter()

  const authFetch = async (url: string, options: FetchOptions = {}): Promise<Response> => {
    if (!token) {
      router.push('/login')
      throw new Error('Token não encontrado')
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      }
    })

    // Se receber 401, fazer logout automático
    if (response.status === 401) {
      await logout()
      router.push('/login')
      throw new Error('Token expirado')
    }

    return response
  }

  const authFetchBackend = async (endpoint: string, options: FetchOptions = {}): Promise<Response> => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
    return authFetch(`${backendUrl}${endpoint}`, options)
  }

  return { authFetch, authFetchBackend }
}