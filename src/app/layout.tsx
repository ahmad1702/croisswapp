import { siteConfig } from "@/app/site-config";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/ui/footer";
import "@/styles/globals.css";
import { cn } from "@/utils/cn";

import { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";



const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const fontCal = localFont({
    src: "../styles/calsans.ttf",
    variable: "--font-cal",
    display: "swap",
});

const fontMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    openGraph: {
        images: [{ url: "/opengraph-image.png" }],
    },
    twitter: {
        card: "summary_large_image",
        images: [{ url: "/opengraph-image.png" }],
    },
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body
                    className={cn(
                        "min-h-screen bg-background font-sans antialiased",
                        fontSans.variable,
                        fontCal.variable,
                        fontMono.variable
                    )}
                >
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <div className="relative flex min-h-screen flex-col">
                            <SiteHeader />
                            <div className="flex-1">
                                {children}
                            </div>
                        </div>
                        <TailwindIndicator />
                    </ThemeProvider>
                    <Footer />
                </body>
            </html>
        </>
    );
}