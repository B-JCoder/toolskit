"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, AlertCircle } from "lucide-react"
import { useState } from "react"
import { ToolCard } from "@/components/tool-card"

export function GrowAGarden() {
  const [iframeError, setIframeError] = useState(false)
  const growAGardenUrl = "https://growagarden.com"

  const handleIframeError = () => {
    setIframeError(true)
  }

  const openExternal = () => {
    window.open(growAGardenUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <ToolCard
      title="GrowAGarden Calculator Tool"
      description="Plan your garden layout with optimal plant spacing and calculate growing requirements."
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-2 mb-4">
        <Button onClick={openExternal} variant="outline" size="sm" className="gap-1 bg-transparent ml-auto">
          <ExternalLink className="h-3 w-3" />
          Open Full Site
        </Button>
      </div>

      {!iframeError ? (
        <div className="w-full">
          <iframe
            src={growAGardenUrl}
            className="w-full h-[600px] border rounded-lg"
            title="GrowAGarden Calculator"
            onError={handleIframeError}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">Having trouble with the embedded calculator?</p>
            <Button onClick={openExternal} variant="outline" size="sm" className="gap-2 bg-transparent">
              <ExternalLink className="h-4 w-4" />
              Open in New Tab
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-yellow-500/10">
              <AlertCircle className="h-12 w-12 text-yellow-500" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Unable to load embedded calculator</h3>
            <p className="text-muted-foreground mb-4">
              The GrowAGarden calculator couldn't be embedded. Click below to access it directly.
            </p>
            <Button onClick={openExternal} size="lg" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Visit GrowAGarden.com
            </Button>
          </div>
          <div className="mt-6 p-4 rounded-lg bg-muted text-left">
            <h4 className="font-medium mb-2">About GrowAGarden:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Calculate optimal plant spacing for your garden size</li>
              <li>• Plan garden layouts with companion planting suggestions</li>
              <li>• Estimate harvest yields and growing requirements</li>
              <li>• Track planting schedules and seasonal timing</li>
            </ul>
          </div>
        </div>
      )}
    </ToolCard>
  )
}
