"use client";

import Link from "next/link";
import * as React from "react";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";

import { cn } from "@/utils/cn";
import { PopoverClose } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import { NavItem } from "./main-nav";
import { ThemeToggle } from "./theme-toggle";

export interface NestedNavItem extends NavItem {
  items: NestedNavItem[];
}

export function MobileDropdown(props: {
  items: { main: NavItem[]; docs: NestedNavItem[] };
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 hamburger space-x-2 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.menu className={cn("h-6 w-6", isOpen && "open")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-40 mt-2 h-[calc(100vh-4rem)] w-screen bg-background animate-none rounded-none border-none transition-transform md:hidden">
        <ScrollArea className="pb-8">
          {props.items.docs.map((item, index) => (
            <div key={index} className="flex flex-col space-y-3 pt-6">
              {item.href !== undefined ? (
                <Link
                  href={item.href}
                  className={cn(
                    "flex py-1 text-base font-medium text-muted-foreground transition-colors hover:text-primary",
                    item.href === pathname && "text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              ) : (
                <h4 className="font-bold">{item.title}</h4>
              )}
              {item?.items?.length > 0 &&
                item.items.map((subItem) => (
                  <PopoverClose asChild key={subItem.href}>
                    {subItem.href ? (
                      <Link
                        href={subItem.href}
                        className={cn(
                          "flex py-1 text-base font-medium text-muted-foreground transition-colors hover:text-primary",
                          subItem.href === pathname && "text-foreground"
                        )}
                      >
                        {subItem.title}
                      </Link>
                    ) : (
                      subItem.title
                    )}
                  </PopoverClose>
                ))}
            </div>
          ))}
        </ScrollArea>
        <div className="border-t pt-4">
          <ThemeToggle />
        </div>
      </PopoverContent>
    </Popover>
  );
}
