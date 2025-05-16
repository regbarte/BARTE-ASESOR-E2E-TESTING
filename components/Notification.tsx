
import type { ReactNode } from "react"
import { AlertCircle } from "lucide-react"

interface NotificationProps {
  children: ReactNode
}

export function Notification({ children }: NotificationProps) {
  return (
    <div className="absolute -top-4 right-0 bg-destructive text-destructive-foreground text-sm px-3 py-1 rounded-md flex items-center gap-1 shadow-md">
      <AlertCircle className="h-3 w-3" />
      {children}
    </div>
  )
}
