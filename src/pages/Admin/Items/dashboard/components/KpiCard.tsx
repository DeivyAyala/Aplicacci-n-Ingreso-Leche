import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface KpiCardProps {
  title: string
  value: string
  icon: React.ReactNode
  badge?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export const KpiCard = ({
  title,
  value,
  icon,
  badge,
  footer,
  className,
}: KpiCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 shadow-sm">
            {icon}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-semibold">{value}</div>
          {badge}
        </div>
        {footer && (
          <div className="rounded-xl bg-white/70 px-3 py-2 text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
