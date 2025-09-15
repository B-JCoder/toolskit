import type { Metadata } from "next"
import { FileText, AlertTriangle, Scale, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

export const metadata: Metadata = {
  title: "Terms of Service - Toolkit Web Tools",
  description:
    "Read our terms of service to understand the rules and guidelines for using Toolkit's free web tools and calculators.",
  keywords: ["terms of service", "terms of use", "toolkit terms", "user agreement"],
  openGraph: {
    title: "Terms of Service - Toolkit Web Tools",
    description: "Read our terms of service to understand the rules and guidelines for using Toolkit's free web tools.",
    type: "website",
  },
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Terms of Service", href: "/terms" }]} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By accessing and using Toolkit's web tools, you accept and agree to be bound by the terms and provision
                of this agreement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Use License
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Permission is granted to temporarily use Toolkit's web tools for personal and commercial purposes.
                  This is the grant of a license, not a transfer of title, and under this license you may:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>• Use our tools for personal calculations and tasks</li>
                  <li>• Use our tools for commercial purposes</li>
                  <li>• Share links to our tools with others</li>
                </ul>
                <p className="text-muted-foreground">
                  This license shall automatically terminate if you violate any of these restrictions and may be
                  terminated by us at any time.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  The information and tools on this website are provided on an 'as is' basis. To the fullest extent
                  permitted by law, Toolkit excludes all representations, warranties, obligations, and liabilities
                  arising out of or in connection with this website.
                </p>
                <p className="text-muted-foreground">Toolkit does not warrant that:</p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>• The website will be constantly available or available at all</li>
                  <li>• The information on this website is complete, true, accurate, or non-misleading</li>
                  <li>• The calculations provided are error-free or suitable for your specific needs</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Limitations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                In no event shall Toolkit or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on Toolkit's website, even if Toolkit or a Toolkit authorized representative has
                been notified orally or in writing of the possibility of such damage.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accuracy of Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The materials appearing on Toolkit's website could include technical, typographical, or photographic
                errors. Toolkit does not warrant that any of the materials on its website are accurate, complete, or
                current. Toolkit may make changes to the materials contained on its website at any time without notice.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Toolkit may revise these terms of service for its website at any time without notice. By using this
                website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably
                submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
