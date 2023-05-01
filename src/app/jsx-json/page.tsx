/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import { useMemo, useRef, useState } from "react";

import EditorToolbar from '@/components/EditorToolbar';
import JSXson from "@/components/jsxson/JSXToJSON";
import JSXsonHeader from "@/components/jsxson/JSXsonHeader";
import { Separator } from "@/components/ui/separator";
import ShowHide from "@/components/ui/show-hide";
import { Textarea } from "@/components/ui/text-area";
import { sampleJupyterNotebook } from '@/data/sampleJupyterNotebook';
import { cn } from "@/utils/cn";
import { jsonToJSX, jsxToJson } from "@/utils/jsx";



export type JSXsonEditMode = 'jsx-to-json' | 'json-to-jsx' | 'none'
export default function JSXsonPage() {
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const [error, setError] = useState<string | undefined>(undefined)
    const [editMode, setEditMode] = useState<JSXsonEditMode>('none')
    const [fromContents, setFromContents] = useState(sampleJupyterNotebook)


    const handleFromContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length === 0) {
            setEditMode('none')
        } else if (e.target.value.trim().startsWith('<')) {
            setEditMode('jsx-to-json')
        } else {
            setEditMode('json-to-jsx')
        }

        setFromContents(e.target.value)
    }

    const showSecondEditor = editMode !== 'none'

    const toContents = useMemo(() => {
        if (editMode === 'jsx-to-json') {
            return jsxToJson(fromContents)
        } else if (editMode === 'json-to-jsx') {
            return jsonToJSX(fromContents)
        } else {
            return null
        }
    }, [editMode, fromContents])

    const copy = async () => {
        if (toContents) {
            await navigator.clipboard.writeText(typeof toContents === 'string' ? toContents : JSON.stringify(toContents))
        }
    }

    const download = () => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(typeof toContents === 'string' ? toContents : JSON.stringify(toContents)));
        const fileName = 'jsxsonswapp' + (editMode === 'jsx-to-json' ? '.jsx' : '.json')
        element.setAttribute('download', fileName);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    const clear = () => {
        setFromContents('')
        setEditMode('none')

        const inputEl = inputRef.current
        if (inputEl) {
            inputEl.value = ''
        }
    }

    return (
        <section
            className={cn(
                "overflow-hidden h-[calc(100vh-4rem)] flex items-center flex-col container",
                showSecondEditor ? 'p-5 gap-4' : 'gap-6 pb-8 pt-6 md:py-10',
            )}
        >
            <ShowHide show={!showSecondEditor}>
                <JSXsonHeader />
            </ShowHide>
            <ShowHide show={showSecondEditor} className="w-full flex h-8">
                <div className="flex-1 font-bold text-xl flex justify-end">
                    {editMode === 'jsx-to-json' && 'JSX Props'}
                    {editMode === 'json-to-jsx' && 'JSON Attributes'}
                </div>
                <Separator
                    orientation="vertical"
                    className="mx-3"
                />
                <div className="flex-1 font-bold text-xl flex items-center justify-between">
                    {editMode === 'jsx-to-json' && 'JSON Attributes'}
                    {editMode === 'json-to-jsx' && 'JSX Props'}
                    <EditorToolbar
                        error={error}
                        copy={toContents !== null ? copy : undefined}
                        clear={clear}
                    />
                </div>
            </ShowHide>
            <div className="w-full flex-1 flex flex-col items-center justify-center gap-2">
                <div className={cn("flex flex-1 w-full", showSecondEditor && 'gap-2')}>
                    <div
                        className={cn(
                            "duration-500",
                            showSecondEditor ? 'w-1/2' : 'w-full',
                        )}
                    >
                        <Textarea
                            ref={inputRef}
                            className="h-full resize-none"
                            placeholder="Drag and drop or Paste in the contents of a .ipynb or .py file here"
                            onChange={handleFromContentsChange}
                        />
                    </div>
                    <div
                        className={cn(
                            "duration-500 h-full",
                            showSecondEditor ? 'w-1/2' : 'w-0'
                        )}
                    >
                        {showSecondEditor && (
                            <JSXson value={toContents} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
