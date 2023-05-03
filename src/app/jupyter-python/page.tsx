"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMemo, useRef, useState } from "react";

import EditorToolbar from '@/components/EditorToolbar';
import ConversionLayout from "@/components/conversion-layout";
import JupyterToPython from '@/components/jupyswapp/JupyterToPython';
import PythonToJupyter from '@/components/jupyswapp/PythonToJupyter';
import { Separator } from "@/components/ui/separator";
import ShowHide from "@/components/ui/show-hide";
import { sampleJupyterNotebook } from '@/data/sampleJupyterNotebook';
import { Notebook } from "@/types/jupyter";
import pythonToJupyter, { jupyterToPython } from '@/utils/jupyter';



export type JupySwapEditMode = 'jupyter-to-py' | 'py-to-jupyter' | 'none'
export default function JupyterPythonPage() {
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const [error, setError] = useState<string | undefined>(undefined)
    const [editMode, setEditMode] = useState<JupySwapEditMode>('none')
    const [fromContents, setFromContents] = useState(sampleJupyterNotebook)

    const handleFromContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length === 0) {
            setEditMode('none')
        } else if (e.target.value.startsWith('{')) {
            setEditMode('jupyter-to-py')
        } else if (e.target.value.startsWith('[')) {
            setEditMode('jupyter-to-py')
        } else if (e.target.value.startsWith('import')) {
            setEditMode('py-to-jupyter')
        } else {
            setEditMode('py-to-jupyter')
        }

        setFromContents(e.target.value)
    }

    const showSecondEditor = editMode !== 'none'

    const toContents = useMemo(() => {
        if (editMode === 'jupyter-to-py') {
            return jupyterToPython(fromContents)
        } else if (editMode === 'py-to-jupyter') {
            return pythonToJupyter(fromContents)
        } else {
            return null
        }
    }, [editMode, fromContents])

    const copy = async () => {
        if (typeof window === 'undefined') return
        if (toContents) {
            await navigator.clipboard.writeText(typeof toContents === 'string' ? toContents : JSON.stringify(toContents))
        }
    }

    const download = () => {
        if (typeof window === 'undefined') return
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(typeof toContents === 'string' ? toContents : JSON.stringify(toContents)));
        const fileName = 'jupyswapp' + (editMode === 'jupyter-to-py' ? '.py' : '.ipynb')
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
        <ConversionLayout
            ref={inputRef}
            title={"Jupyter ↔ Python"}
            description={"Convert Jupyter Notebooks to Python scripts and vice versa."}
            onFromContentsChange={handleFromContentsChange}
            collapsed={showSecondEditor}
            secondEditor={
                editMode === 'py-to-jupyter' ? (
                    <PythonToJupyter
                        value={toContents as Notebook}
                    />
                ) : (
                    <JupyterToPython
                        value={toContents as string | null}
                    />
                )
            }
        >
            <ShowHide show={showSecondEditor} className="w-full flex h-8">
                <div className="flex-1 font-bold text-xl flex justify-end">
                    {editMode === 'jupyter-to-py' && 'Jupyter Notebook'}
                    {editMode === 'py-to-jupyter' && 'Python'}
                </div>
                <Separator
                    orientation="vertical"
                    className="mx-3"
                />
                <div className="flex-1 font-bold text-xl flex items-center justify-between">
                    {editMode === 'jupyter-to-py' && 'Python'}
                    {editMode === 'py-to-jupyter' && 'Jupyter Notebook'}

                    <EditorToolbar
                        error={error}
                        copy={copy}
                        download={download}
                        clear={clear}
                    />
                </div>
            </ShowHide>
        </ConversionLayout>
    )
}
