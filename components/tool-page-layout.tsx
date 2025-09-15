import type React from "react"

interface ToolPageLayoutProps {
  children: React.ReactNode
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export function ToolPageLayout({ children, icon: Icon, title, description }: ToolPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-2 sm:p-3 rounded-full bg-primary/10">
              <Icon className="h-8 w-8 sm:h-12 sm:w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance px-2">{title}</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty px-2">{description}</p>
        </div>
        {children}
      </div>
    </div>
  )
}
