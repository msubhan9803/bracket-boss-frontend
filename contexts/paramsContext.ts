import { PageProps } from '@/global'
import { createContext } from 'react'
export const ParamsContext = createContext<PageProps['params']>({} as PageProps['params'])
