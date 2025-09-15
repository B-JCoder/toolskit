interface StatItem {
  value: string | number
  label: string
}

interface StatsGridProps {
  stats: StatItem[]
  columns?: number
}

export function StatsGrid({ stats, columns = 2 }: StatsGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-4`}>
      {stats.map((stat, index) => (
        <div key={index} className="p-4 rounded-lg bg-muted text-center">
          <div className="text-2xl font-bold text-foreground">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
