export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Jupyswapp",
    description:
        "Convert ipynb files to py files and vice versa.",
    mainNav: [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "JSX <-> JSON",
            href: "https://www.npmjs.com/package/jsx-to-json",
        },
    ],
    sidebarNav: [
        {
            title: "Getting Started",
            items: [
                {
                    title: "Introduction",
                    href: "/docs/introduction",
                    items: [
                        {
                            title: "What is Jupyswapp?",
                            href: "/docs/introduction#what-is-jupyswapp",
                        }
                    ],
                },
                {
                    title: "Installation",
                    href: "/docs/installation",
                    items: [],
                },
                {
                    title: "Recipes",
                    href: "/docs/recipes",
                    items: [],
                },
            ],
        },
        {
            title: "Guides",
            items: [
                {
                    title: "Framework Agnostic",
                    href: "/docs/core",
                    label: "New",
                    items: [],
                },
                {
                    title: "Next.js",
                    href: "/docs/nextjs",
                    items: [],
                },
                {
                    title: "Customization",
                    href: "/docs/customization",
                    label: "New",
                    items: [],
                },
            ],
        },
    ],
    links: {
        // twitter: "https://twitter.com/",
        github: "https://github.com/ahmad1702/jupyswapp",
        docs: "/docs",
    },
};