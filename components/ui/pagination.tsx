import { cn } from '@/lib/utils'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

type Props = { page: number; totalPages: number; pageSize: number; setPageSize: any; pageSizes: number[]; handlePrevBtn: () => void; handleNextBtn: () => void }

function Pagination({ page, totalPages, pageSize, setPageSize, pageSizes, handlePrevBtn, handleNextBtn }: Props) {
  return (
    <div className='flex gap-2 items-center text-xs text-gray-600 dark:text-gray-300 lg:text-md h-full'>
      <Select onValueChange={(value) => setPageSize(parseInt(value))} value={pageSize.toString()}>
        <SelectTrigger className='min-w-16'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {pageSizes.map((size: number) => (
            <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <button
        className={cn('text-gray-600 dark:text-gray-300 disabled:text-gray-300 dark:disabled:text-gray-500')}
        disabled={page === 1}
        onClick={handlePrevBtn}
      >
        <ChevronsLeft />
      </button>

      <span className='border border-gray-500 dark:border-gray-700 rounded-md py-1 px-3'>{page}</span>
      <span>of</span>
      <span>{totalPages}</span>

      <button
        className={cn('text-gray-600 dark:text-gray-300 disabled:text-gray-300 dark:disabled:text-gray-500')}
        disabled={page === totalPages}
        onClick={handleNextBtn}
      >
        <ChevronsRight />
      </button>
    </div>
  )
}

export default Pagination