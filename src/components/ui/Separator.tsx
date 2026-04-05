import { cn } from '@/lib/utils'

interface SeparatorProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export function Separator({ className, orientation = 'horizontal' }: SeparatorProps) {
  return (
    <div
      className={cn(
        orientation === 'horizontal'
          ? 'w-full h-[0.5px]'
          : 'h-full w-[0.5px]',
        className
      )}
      style={{ backgroundColor: 'rgba(242,239,230,0.07)' }}
    />
  )
}
