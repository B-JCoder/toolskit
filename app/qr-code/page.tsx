import type { Metadata } from "next";
import { ScanLine } from "lucide-react";
import { ToolPageLayout } from "@/components/tool-page-layout";
import { QRCodeGenerator } from "@/components/qr-code/qr-code-generator";
import { StructuredData } from "@/components/seo/structured-data";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const metadata: Metadata = {
  title: "Free QR Code Generator - Create Custom QR Codes Online",
  description:
    "Generate free, custom QR codes instantly. Customize colors, size, and error correction. format for URLs, text, email, and more. No sign-up required.",
  keywords: [
    "QR code generator",
    "create QR code",
    "custom QR code",
    "online QR generator",
    "free QR code",
    "QR code maker",
  ],
  openGraph: {
    title: "Free QR Code Generator - Create Custom QR Codes",
    description:
      "Generate free, custom QR codes instantly. Customize colors, size, and error correction. Download in high quality.",
    type: "website",
  },
};

export default function QRCodePage() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="QR Code Generator"
        description="Free online tool to generate custom QR codes for URLs, text, and more."
        url="https://toolfixo.online/qr-code"
        applicationCategory="UtilityApplication"
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[{ label: "QR Code Generator", href: "/qr-code" }]}
        />

        <ToolPageLayout
          icon={ScanLine}
          title="QR Code Generator"
          description="Create customized QR codes instantly for your links, text, or business."
        >
          <QRCodeGenerator />

          <div className="mt-16 space-y-8 prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">
                How to use this QR Code Generator
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Enter your URL or text in the content field</li>
                <li>Adjust the size slider to your preferred dimension</li>
                <li>
                  Customize foreground and background colors to match your brand
                </li>
                <li>
                  Select error correction level (High is better for printed
                  codes)
                </li>
                <li>Download your QR code as PNG or copy it to clipboard</li>
              </ol>
            </div>
          </div>
        </ToolPageLayout>
      </div>
    </>
  );
}
