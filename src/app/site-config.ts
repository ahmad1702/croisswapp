import { NestedNavItem } from "@/components/mobile-nav";

export type SiteConfig = typeof siteConfig;

const baseNavLinks: NestedNavItem[] = [
  {
    title: "Home",
    href: "/",
    items: [],
  },
  {
    title: "Jupyter Notebook <-> Python",
    href: "/jupyter-python",
    items: [],
  },
  {
    title: "JSX <-> JSON",
    href: "/jsx-json",
    items: [],
  },
];
export const siteConfig = {
  name: "Croisswapp",
  description: "Convert ipynb files to py files and vice versa.",
  mainNav: baseNavLinks,
  sidebarNav: baseNavLinks,
  links: {
    // twitter: "https://twitter.com/",
    github: "https://github.com/ahmad1702/jupyswapp",
    docs: "/docs",
  },
};
