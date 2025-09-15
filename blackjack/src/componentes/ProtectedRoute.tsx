'use client'
import { useRequireAuth } from '@/hooks/useAuth'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useRequireAuth()

  if (loading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      )
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}