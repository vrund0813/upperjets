'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-inter font-medium tracking-wide transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg disabled:opacity-40 disabled:pointer-events-none cursor-pointer'

    const variants = {
      primary:
        'btn-primary bg-brand-green text-brand-bg hover:bg-brand-green/90',
      outline:
        'border border-[0.5px] border-brand-cream/20 text-brand-cream hover:border-brand-green hover:text-brand-cream',
    }

    const sizes = {
      sm: 'h-9 px-5 text-xs',
      md: 'h-11 px-7 text-sm',
      lg: 'h-13 px-9 text-base',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button }
