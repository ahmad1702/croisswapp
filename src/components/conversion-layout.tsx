/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { forwardRef, useRef } from "react";

import ShowHide from "@/components/ui/show-hide";
import { Textarea } from "@/components/ui/text-area";
import { cn } from "@/utils/cn";
import React from 'react';
import ConversionPageHeader, { ConversionPageHeaderProps } from "./conversion-page-header";

type ConversionLayoutProps = ConversionPageHeaderProps & {
    collapsed: boolean;
    secondEditor: React.ReactNode;
    children: React.ReactNode | React.ReactNodeArray;
    onFromContentsChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ConversionLayout = forwardRef<HTMLTextAreaElement, ConversionLayoutProps>(({
    collapsed,
    children,
    onFromContentsChange,
    secondEditor,
    ...conversionPageHeaderProps
}, ref) => {
    const inputRef = ref || useRef<HTMLTextAreaElement>(null)
    return (
        <section
            className={cn(
                "overflow-hidden h-[calc(100vh-4rem)] flex items-center flex-col container",
                collapsed ? 'p-5 gap-4' : 'gap-6 pb-8 pt-6 md:py-10',
            )}
        >
            <ShowHide show={!collapsed}>
                <ConversionPageHeader {...conversionPageHeaderProps} />
            </ShowHide>
            {children}
            <div className="w-full flex-1 flex flex-col items-center justify-center gap-2">
                <div className={cn("flex flex-1 w-full", collapsed && 'gap-2')}>
                    <div
                        className={cn(
                            "duration-500",
                            collapsed ? 'w-1/2' : 'w-full',
                        )}
                    >
                        <Textarea
                            ref={inputRef}
                            className="h-full resize-none"
                            placeholder="Drag and drop or Paste in the contents of a .ipynb or .py file here"
                            onChange={onFromContentsChange}
                        />
                    </div>
                    <div
                        className={cn(
                            "duration-500 h-full",
                            collapsed ? 'w-1/2' : 'w-0'
                        )}
                    >
                        {collapsed && secondEditor}
                    </div>
                </div>
            </div>
        </section>
    )
})

ConversionLayout.displayName = 'ConversionLayout'

export default ConversionLayout