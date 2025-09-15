'use client'
import { useAuth as useAuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { User } from '@/types'

interface UseRequireAuthReturn {
  user: User | null
  token: string | null
  loading: boolean
}

export function useRequireAuth(): UseRequireAuthReturn {
  const { user, token, loading } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  return { user, token, loading }
}