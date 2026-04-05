import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-inter text-xs font-medium tracking-[0.12em] uppercase text-brand-green',
        className
      )}
    >
      <span className="w-5 h-[0.5px] bg-brand-green" />
      {children}
    </span>
  )
}
