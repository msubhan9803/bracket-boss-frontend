import { ParamsContext } from '@/contexts/paramsContext'
import { useContext } from 'react'

export function useParams() {
  const params = useContext(ParamsContext)
  if (!ParamsContext) {
    throw new Error('Make sure to call useParams hook in components wrapped with <Providers/>')
  }
  return params
}
