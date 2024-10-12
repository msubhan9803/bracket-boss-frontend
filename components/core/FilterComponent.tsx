import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const FilterComponent = ({
  columns,
  filterBy,
  setFilterBy,
  setFilter,
}: {
  columns: {
    header: string
    accessorKey: string
  }[]
  filterBy: string
  setFilterBy: any
  setFilter: any
}) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)

  const handleFilterBy = (val: string) => {
    setFilterBy(val)
    handleClose()
  }

  return (
    <div className='flex'>
      <Popover open={open}>
        <PopoverTrigger asChild>
          <Button variant='outline' className='flex justify-center items-center gap-x-1 border-slate-200 bg-slate-50 !outline-none !ring-0 rounded-r-none rounded-s-lg' onClick={() => setOpen(true)}>
            {filterBy ? (columns.find((column) => column.accessorKey == filterBy)?.header as React.ReactNode) : 'Filter by'}

            <svg className='w-2.5 h-2.5 ms-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
            </svg>
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-auto p-0 z-50' align='start' onInteractOutside={handleClose}>
          <div className='inline-block rounded-md border bg-popover text-popover-foreground shadow-md p-2'>
            <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
              {columns.map((column, index) => (
                <li key={index} onClick={() => handleFilterBy(column.accessorKey)}>
                  <div className='block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'>{column.header}</div>
                </li>
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>

      <input
        type="text"
        className={cn(
          "w-full p-2.5 z-20 text-sm h-10 !rounded-e-lg",
          "outline-none focus:outline-none ring-0 !ring-offset-0",
          "border-t border-b border-e",
          // Light mode colors
          "text-gray-900 bg-white border-slate-200",
          // Dark mode colors
          "dark:text-white dark:bg-slate-950 dark:border-slate-800"
        )}
        placeholder="Search"
        required
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  )
}

export default FilterComponent;