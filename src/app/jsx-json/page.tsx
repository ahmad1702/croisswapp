/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import { useMemo, useRef, useState } from "react";

import EditorToolbar from '@/components/EditorToolbar';
import ConversionInput from "@/components/conversion-input";
import ConversionLayout from "@/components/conversion-layout";
import JSXson from "@/components/jsxson/JSXToJSON";
import { Separator } from "@/components/ui/separator";
import ShowHide from "@/components/ui/show-hide";
import { sampleJupyterNotebook } from '@/data/sampleJupyterNotebook';
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

    const clear = () => {
        setFromContents('')
        setEditMode('none')

        const inputEl = inputRef.current
        if (inputEl) {
            inputEl.value = ''
        }
    }

    const inputSection = (
        <ConversionInput
            ref={inputRef}
            onFromContentsChange={handleFromContentsChange}
            acceptableFileExtensions={' .json, .tsx or .jsx'}
        />
    )

    return (
        <ConversionLayout
            title={`JSX <--> JSON`}
            description="A converter between JSX Props and a JSON object whose keys are the same as the JSX Props."
            collapsed={showSecondEditor}
            secondEditor={<JSXson value={toContents} />}
            inputSection={inputSection}
        >
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
        </ConversionLayout>
    );
}