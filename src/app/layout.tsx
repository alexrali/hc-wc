import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ThemeProvider } from "@/providers/theme-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hc",
  description: "hc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <body className={inter.className}>
    //     <SpeedInsights/>
    //     {children}
    //     <Toaster />
    //     </body>
    // </html>

    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SpeedInsights/>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AdminPanelLayout>
          {children}
          </AdminPanelLayout>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
