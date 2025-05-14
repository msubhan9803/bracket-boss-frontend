import { Columns4 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const ColumnButton = ({ table }: any) => {
  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className='flex justify-center items-center gap-x-1'>
            <Columns4 />
            <span className='uppercase'>Columns</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0 z-50' align='start'>
          <div className='inline-block rounded-md border bg-popover text-popover-foreground shadow-md p-2'>
            <div className='py-2 border-b border-gray-200 mb-2'>
              <label className='flex items-center gap-x-2 hover:bg-muted p-2 rounded-md cursor-pointer'>
                <Checkbox
                  checked={table.getIsAllColumnsVisible()}
                  onCheckedChange={(checked) => {
                    table.getToggleAllColumnsVisibilityHandler()({ target: { checked } })
                  }}
                />
                <span className='ml-2'>Toggle All</span>
              </label>
            </div>

            {table.getAllLeafColumns().map((column: any) => {
              return (
                <div key={column.id}>
                  <label className='flex items-center gap-x-2 hover:bg-muted p-2 rounded-md cursor-pointer'>
                    <Checkbox
                      checked={column.getIsVisible()}
                      onCheckedChange={(checked) => {
                        column.getToggleVisibilityHandler()({ target: { checked } })
                      }}
                    />
                    <span className='ml-2'>{column.columnDef.header}</span>
                  </label>
                </div>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default ColumnButton