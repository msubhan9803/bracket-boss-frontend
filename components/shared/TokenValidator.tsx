import { toast } from 'sonner'
import useTokenValidation from '@/hooks/useTokenValidation'
import { useEffect } from 'react'

export default function TokenValidator(): JSX.Element {
  const { error } = useTokenValidation()

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`)
    }
  }, [error])

  return <></>
}
