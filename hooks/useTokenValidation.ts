import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { deleteCookie } from 'cookies-next'

export default function useTokenValidation() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const logout = searchParams.get('logout')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      if (logout === '1') {
        deleteCookie('auth-token')
        router.replace('/login')
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    }
  }, [logout, router])

  return { error }
}
