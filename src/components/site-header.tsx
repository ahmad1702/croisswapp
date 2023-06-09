import Link from "next/link";

import { siteConfig } from "@/app/site-config";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileDropdown } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

export function SiteHeader() {
    return (
        <header className="bg-background sticky top-0 z-50 w-full border-b h-16">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <Link href="/" className="items-center space-x-2 flex mr-6">
                    <Icons.logo className="h-6 w-6" />
                    <span className="hidden font-bold text-lg sm:inline-block animate-fade-up bg-gradient-to-br from-yellow-500 to-orange-500 bg-clip-text">
                        {siteConfig.name}
                    </span>
                </Link>

                <MainNav items={siteConfig.mainNav} />
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={buttonVariants({
                                    size: "sm",
                                    variant: "ghost",
                                })}
                            >
                                <Icons.gitHub className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>
                        <ThemeToggle />
                        <MobileDropdown
                            items={{ main: siteConfig.mainNav, docs: siteConfig.sidebarNav }}
                        />
                    </nav>
                </div>
            </div>
        </header>
    );
}