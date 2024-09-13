import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

const buttonVariants = cva(
  'inline-flex relative items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // Improved dark hover color
        destructive: 'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-600 dark:text-slate-50 dark:hover:bg-red-700', // Better contrast in dark mode
        outline: 'border border-primary bg-white hover:bg-primary hover:text-primary-foreground dark:border-primary/50 dark:bg-primary/10 dark:hover:bg-primary dark:hover:text-primary-foreground', // Consistent border and text contrast
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-700 dark:text-slate-50 dark:hover:bg-slate-600', // Refined dark mode background and hover
        ghost: 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-slate-50', // Enhanced hover effect in dark mode
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50 dark:hover:text-slate-200', // Slightly lighter hover text for better visibility
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-14 rounded-md px-8 text-xl md:text-3xl font-bold',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loaderSize?: number
  absoluteLoaderPosition?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, disabled, loaderSize = 18, children, absoluteLoaderPosition = true, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp disabled={loading || disabled} className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
        {loading && <Loader2 size={loaderSize} className={cn('animate-spin', absoluteLoaderPosition ? 'absolute right-4' : 'ml-2')} />}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }