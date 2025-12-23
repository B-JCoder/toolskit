import type { Metadata } from 'next'
import { KeyRound } from 'lucide-react'
import { ToolPageLayout } from '@/components/tool-page-layout'
import { PasswordGenerator } from '@/components/password-generator/password-generator'
import { StructuredData } from '@/components/seo/structured-data'
import { Breadcrumbs } from '@/components/seo/breadcrumbs'

export const metadata: Metadata = {
  title: 'Secure Password Generator - Strong & Random Passwords',
  description:
    'Generate strong, secure, and random passwords instantly. Client-side processing ensures your passwords never leave your browser. Customize format and length.',
  keywords: [
    'password generator',
    'secure password',
    'random password',
    'strong password',
    'password maker',
    'security tool',
  ],
  openGraph: {
    title: 'Secure Password Generator - Strong & Random Passwords',
    description:
      'Generate strong, secure, and random passwords instantly. Client-side processing ensuring 100% privacy.',
    type: 'website',
  },
}

export default function PasswordGeneratorPage() {
  return (
    <>
      <StructuredData
        type="WebApplication"
        name="Secure Password Generator"
        description="Free online tool to generate strong, secure, and random passwords instantly."
        url="https://toolkit.com/password-generator"
        applicationCategory="UtilityApplication"
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: 'Password Generator', href: '/password-generator' }]} />

        <ToolPageLayout
          icon={KeyRound}
          title="Secure Password Generator"
          description="Create strong, uncrackable passwords to keep your accounts safe."
        >
          <PasswordGenerator />

          <div className="mt-16 space-y-8 prose prose-gray dark:prose-invert max-w-none">
            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Why use this Password Generator?</h2>
              <ul className="space-y-4 text-muted-foreground">
                    <li className="flex gap-2">
                        <span className="font-bold text-primary">✓ 100% Client-Side:</span> 
                        Passwords are generated locally in your browser and never transmitted over the internet.
                    </li>
                    <li className="flex gap-2">
                        <span className="font-bold text-primary">✓ Customizable:</span> 
                        Choose custom length and character types to meet specific requirements.
                    </li>
                    <li className="flex gap-2">
                        <span className="font-bold text-primary">✓ Strong Entropy:</span> 
                        Uses cryptographic randomness for maximum security.
                    </li>
              </ul>
            </div>
          </div>
        </ToolPageLayout>
      </div>
    </>
  )
}
