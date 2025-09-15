export const getTokenFromCookies = (): string | null => {
  if (typeof document === 'undefined') return null
  
  const cookies = document.cookie.split(';')
  const tokenCookie = cookies.find(cookie => 
    cookie.trim().startsWith('jwt_token=')
  )
  
  return tokenCookie ? tokenCookie.split('=')[1] : null
}

export const setTokenCookie = (token: string): void => {
  const isProduction = process.env.NODE_ENV === 'production'
  document.cookie = `jwt_token=${token}; path=/; ${isProduction ? 'secure; ' : ''}samesite=strict; max-age=2592000` // 30 dias
}

export const removeTokenCookie = (): void => {
  document.cookie = 'jwt_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}