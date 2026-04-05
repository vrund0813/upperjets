import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IconProps {
  icon: LucideIcon
  size?: number
  className?: string
}

export function Icon({ icon: LucideIconComponent, size = 16, className }: IconProps) {
  return (
    <LucideIconComponent
      size={size}
      strokeWidth={1.5}
      className={cn(className)}
    />
  )
}
