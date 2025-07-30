import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/ui/header";
import {ClerkProvider} from '@clerk/nextjs';
import {dark} from '@clerk/themes'

const inter = Inter({subsets: ["latin"]}) ;

export const metadata = {
  title: "MediCare- HealthCare Management System",
  description: "Connect with doctors anytime, anywhere",
};

export default function RootLayout({children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ClerkProvider appearance={{
        baseTheme: dark,
      }}>
    <html lang="en" suppressHydrationWarning>
      <body className={'${inter.className}' }>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >

        {/*header */}
        <Header />

        <main className="min-h-screen">{children}</main>

        {/* footer*/}
        <footer className="bg-muted/50 py-6">
          <div className="container mx-auto px-4 text-center text-gray-20">
            <p>visit the clinic</p>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
