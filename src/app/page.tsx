/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import EditorToolbar from '@/components/EditorToolbar';
import { Copy, X } from "lucide-react";
import { useState } from "react";
import Balancer from "react-wrap-balancer";

import { siteConfig } from "@/app/site-config";
import JupyterToPython from "@/components/JupyterToPython";
import PythonToJupyter from '@/components/PythonToJupyter';
import ShowHide from "@/components/ui/show-hide";
import { Textarea } from "@/components/ui/text-area";
import { cn } from "@/utils/cn";

const PyHeader = () => {
  return (
    <div className={cn("max-w-5xl  mx-auto")}>
      <h1
        className="font-cal animate-fade-up bg-gradient-to-br from-yellow-500 to-orange-500 bg-clip-text text-center text-5xl/[3rem] font-bold text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
        style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
      >
        <Balancer>
          <div className='flex items-end'>
            <div className='inline-block '>
              <div className='flex flex-col'>
                <img height={50} width={50} src="/img/jupyter-logo.png" alt="" className='inline-block dark:hidden' />
                <img height={50} width={50} src="/img/jupyter-logo-dark.png" alt="" className='hidden dark:inline-block' />
                <div className='inline-block'>Ju</div>
              </div>
            </div>
            <div className='inline-block'>
              <div className='flex flex-col items-center'>
                <div className='inline-block'>Py</div>
                <img height={40} width={40} src="/img/python-logo.png" alt="" className='inline-block dark:hidden' />
                <img height={40} width={40} src="/img/python-logo-dark.png" alt="" className='hidden dark:inline-block' />
              </div>
            </div>
            {" "}
            ter
            Notebooks? {" "}
          </div>
          never
          heard of her
        </Balancer>
      </h1>
      <p
        className="animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
        style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
      >
        <Balancer>{siteConfig.description}</Balancer>
      </p>
    </div >
  )
}

const JupyterNotebookEditorToolbar = ({
  editMode,
  setEditMode,
  fromContents,
  setFromContents,
  toContents,
}: {
  editMode: EditMode;
  setEditMode: React.Dispatch<React.SetStateAction<EditMode>>;
  fromContents: string;
  setFromContents: React.Dispatch<React.SetStateAction<string>>;
  toContents: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          className={cn(
            "flex items-center gap-2",
            "text-sm font-medium text-gray-500 hover:text-gray-600",
            "transition-colors duration-200",
            "focus:outline-none focus-visible:ring focus-visible:ring-accent-foreground focus-visible:ring-opacity-50",
          )}
          onClick={() => {
            void navigator.clipboard.writeText(fromContents)
          }}
        >
          <Copy className="h-4 w-4" />
          Copy
        </button>
        <button
          className={cn(
            "flex items-center gap-2",
            "text-sm font-medium text-gray-500 hover:text-gray-600",
            "transition-colors duration-200",
            "focus:outline-none focus-visible:ring focus-visible:ring-accent-foreground focus-visible:ring-opacity-50",
          )}
          onClick={() => {
            void navigator.clipboard.writeText(toContents)
          }}
        >
          <Copy className="h-4 w-4" />
          Copy
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button
          className={cn(
            "flex items-center gap-2",
            "text-sm font-medium text-gray-500 hover:text-gray-600",
            "transition-colors duration-200",
            "focus:outline-none focus-visible:ring focus-visible:ring-accent-foreground focus-visible:ring-opacity-50",
          )}
          onClick={() => {
            setEditMode('none')
            setFromContents('')
          }}
        >
          <X className="h-4 w-4" />
          Clear
        </button>
      </div>
    </div>
  )
}

const convertIpynbJsonToPythonFile = (json: any) => {
  const cells = json.cells
  const codeCells = cells.filter((cell: any) => cell.cell_type === 'code')
  const code = codeCells.map((cell: any) => cell.source).join('\n\n')
  return code
}


export type EditMode = 'jupyter-to-py' | 'py-to-jupyter' | 'none'
export default function IndexPage() {
  const [error, setError] = useState<string | undefined>(undefined)
  const [editMode, setEditMode] = useState<EditMode>('none')
  const [fromContents, setFromContents] = useState('')


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

  return (
    <section
      className={cn(
        "overflow-hidden min-h-[calc(100vh-4rem)] flex items-center flex-col container",
        showSecondEditor ? 'p-5 gap-4' : 'gap-6 pb-8 pt-6 md:py-10',
      )}
    >
      <ShowHide show={!showSecondEditor}>
        <PyHeader />
      </ShowHide>
      <ShowHide show={showSecondEditor} className="w-full">
        <EditorToolbar
          error={error}
          editMode={editMode}
          setEditMode={setEditMode}
          fromContents={fromContents}
          setFromContents={setFromContents}
        />
      </ShowHide>
      <div>{editMode}</div>
      <div className="w-full flex-1 flex flex-col items-center justify-center gap-2">
        <div className={cn("flex flex-1 w-full", showSecondEditor && 'gap-2')}>
          <div
            className={cn(
              "duration-500",
              showSecondEditor ? 'w-1/2' : 'w-full',
            )}
          >
            <Textarea
              className="h-full resize-none"
              placeholder="Drag and drop or Paste in the contents of a .ipynb or .py file here"
              onChange={handleFromContentsChange}
            />
          </div>
          <div
            className={cn(
              "duration-500",
              showSecondEditor ? 'w-1/2' : 'w-0'
            )}
          >
            {showSecondEditor && (
              editMode === 'py-to-jupyter' ? (
                <PythonToJupyter pythonCode={fromContents} />
              ) : (
                <JupyterToPython ipynbJson={fromContents} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
