/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import { useMemo, useRef, useState } from "react";

import EditorToolbar from '@/components/EditorToolbar';
import JupyterPythonHeader from '@/components/jupyswapp/JupyterPythonHeader';
import JupyterToPython from '@/components/jupyswapp/JupyterToPython';
import PythonToJupyter from '@/components/jupyswapp/PythonToJupyter';
import { Separator } from "@/components/ui/separator";
import ShowHide from "@/components/ui/show-hide";
import { Textarea } from "@/components/ui/text-area";
import { sampleJupyterNotebook } from '@/data/sampleJupyterNotebook';
import { Notebook } from "@/types/jupyter";
import { cn } from "@/utils/cn";
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
        if (toContents) {
            await navigator.clipboard.writeText(typeof toContents === 'string' ? toContents : JSON.stringify(toContents))
        }
    }

    const download = () => {
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
        <section
            className={cn(
                "overflow-hidden h-[calc(100vh-4rem)] flex items-center flex-col container",
                showSecondEditor ? 'p-5 gap-4' : 'gap-6 pb-8 pt-6 md:py-10',
            )}
        >
            <ShowHide show={!showSecondEditor}>
                <JupyterPythonHeader />
            </ShowHide>
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
                            editMode === 'py-to-jupyter' ? (
                                <PythonToJupyter
                                    value={toContents as Notebook}
                                />
                            ) : (
                                <JupyterToPython
                                    value={toContents as string | null}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
