import type { Metadata } from "next"
import { Shield, Eye, Database, Cookie } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

export const metadata: Metadata = {
  title: "Privacy Policy - Toolkit Web Tools",
  description:
    "Read our privacy policy to understand how Toolkit protects your data and respects your privacy while using our free web tools and calculators.",
  keywords: ["privacy policy", "data protection", "user privacy", "toolkit privacy"],
  openGraph: {
    title: "Privacy Policy - Toolkit Web Tools",
    description: "Read our privacy policy to understand how Toolkit protects your data and respects your privacy.",
    type: "website",
  },
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Our Commitment to Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                At Toolkit, we are committed to protecting your privacy and ensuring the security of your personal
                information. This privacy policy explains how we collect, use, and protect your data when you use our
                web tools.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <p className="text-muted-foreground">
                    We do not collect, store, or process any personal information. All calculations and data processing
                    occur locally in your browser.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Usage Analytics</h3>
                  <p className="text-muted-foreground">
                    We may collect anonymous usage statistics to improve our services, including page views and tool
                    usage patterns. This data cannot be used to identify individual users.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                How We Use Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• To provide and maintain our web tools</li>
                <li>• To improve user experience and tool functionality</li>
                <li>• To analyze usage patterns for service optimization</li>
                <li>• To ensure the security and reliability of our services</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-primary" />
                Cookies and Local Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground">
                    We use minimal essential cookies to ensure proper functionality of our tools, such as theme
                    preferences.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Local Storage</h3>
                  <p className="text-muted-foreground">
                    Some tools may use browser local storage to save your preferences and calculations locally on your
                    device. This data never leaves your browser.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Since all calculations are performed locally in your browser, your data remains on your device and is
                never transmitted to our servers. We implement industry-standard security measures to protect our
                website and services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may use third-party services for analytics and performance monitoring. These services have their own
                privacy policies and data handling practices. We ensure that any third-party services we use comply with
                privacy standards.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you have any questions about this privacy policy or our data practices, please contact us through our
                website.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
