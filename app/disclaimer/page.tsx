import type { Metadata } from "next";
import { AlertCircle, Info, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const metadata: Metadata = {
  title: "Disclaimer - ToolFixo Web Tools",
  description:
    "Important disclaimer information about using ToolFixo's free web tools and calculators. Understand the limitations and proper use of our services.",
  keywords: [
    "disclaimer",
    "legal disclaimer",
    "toolfixo disclaimer",
    "tool limitations",
  ],
  openGraph: {
    title: "Disclaimer - ToolFixo Web Tools",
    description:
      "Important disclaimer information about using ToolFixo's free web tools and calculators.",
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Disclaimer", href: "/disclaimer" }]} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Disclaimer
          </h1>
          <p className="text-xl text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                General Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The information and tools provided on ToolFixo are for general
                informational and educational purposes only. While we strive to
                provide accurate and up-to-date information, we make no
                representations or warranties of any kind, express or implied,
                about the completeness, accuracy, reliability, suitability, or
                availability of the website or the information, tools, products,
                services, or related graphics contained on the website.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-primary" />
                No Professional Advice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  The tools and calculators provided on this website are not
                  intended to replace professional advice. Specifically:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>
                    • <strong>Medical Advice:</strong> BMI calculators and
                    health-related tools do not constitute medical advice.
                    Always consult with a qualified healthcare professional for
                    medical concerns.
                  </li>
                  <li>
                    • <strong>Financial Advice:</strong> Any financial
                    calculations or tools do not constitute financial advice.
                    Consult with a certified financial advisor for financial
                    decisions.
                  </li>
                  <li>
                    • <strong>Academic Advice:</strong> GPA calculators and
                    academic tools are for estimation purposes only. Refer to
                    your institution's official policies and advisors.
                  </li>
                  <li>
                    • <strong>Legal Advice:</strong> Nothing on this website
                    constitutes legal advice. Consult with a qualified attorney
                    for legal matters.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Accuracy of Calculations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  While we make every effort to ensure the accuracy of our
                  calculators and tools, we cannot guarantee that all
                  calculations will be error-free or suitable for your specific
                  needs. Users should:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>
                    • Verify important calculations independently before making
                    decisions
                  </li>
                  <li>
                    • Understand that results are estimates and may vary based
                    on input accuracy
                  </li>
                  <li>• Not rely solely on our tools for critical decisions</li>
                  <li>• Consult with relevant professionals when necessary</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Any reliance you place on information from ToolFixo is strictly
                at your own risk. In no event will we be liable for any loss or
                damage including without limitation, indirect or consequential
                loss or damage, or any loss or damage whatsoever arising from
                loss of data or profits arising out of, or in connection with,
                the use of this website or our tools.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>External Links</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Through this website, you may be able to link to other websites
                which are not under the control of ToolFixo. We have no control
                over the nature, content, and availability of those sites. The
                inclusion of any links does not necessarily imply a
                recommendation or endorse the views expressed within them.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Website Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every effort is made to keep the website up and running
                smoothly. However, ToolFixo takes no responsibility for, and
                will not be liable for, the website being temporarily
                unavailable due to technical issues beyond our control.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Responsibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  By using ToolFixo's tools and services, you acknowledge that:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>
                    • You are responsible for the accuracy of data you input
                  </li>
                  <li>
                    • You understand the limitations of automated calculations
                  </li>
                  <li>• You will seek professional advice when appropriate</li>
                  <li>
                    • You accept full responsibility for decisions made based on
                    tool results
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                If you have any questions about this disclaimer or require
                clarification on any point, please contact us through our
                website. We are committed to transparency and helping users
                understand the proper use of our tools.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
