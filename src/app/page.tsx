"use client"
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Copy, X } from "lucide-react";
import { useMemo, useState } from "react";
import Balancer from "react-wrap-balancer";

import { siteConfig } from "@/app/site-config";
import ShowHide from "@/components/ui/show-hide";
import { Textarea } from "@/components/ui/text-area";
import { cn } from "@/utils/cn";
import pythonToJupyter from "@/utils/pythonToJupyter";

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
                        navigator.clipboard.writeText(fromContents)
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
                        navigator.clipboard.writeText(toContents)
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

const EditorToolbar = ({
    error = 'This is an error. Please fix it.',
    editMode,
    setEditMode,
    fromContents,
    setFromContents,
    toContents,
}: {
    error: string | undefined;
    editMode: EditMode;
    setEditMode: React.Dispatch<React.SetStateAction<EditMode>>;
    fromContents: string;
    setFromContents: React.Dispatch<React.SetStateAction<string>>;
    toContents: string;
}) => {
    return (
        <div className="flex justify-between items-center border rounded-md w-full">
            <Menubar className="bg-none border-none">
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            New Window <MenubarShortcut>⌘N</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem disabled>New Incognito Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarSub>
                            <MenubarSubTrigger>Share</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Email link</MenubarItem>
                                <MenubarItem>Messages</MenubarItem>
                                <MenubarItem>Notes</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSeparator />
                        <MenubarItem>
                            Print... <MenubarShortcut>⌘P</MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarSub>
                            <MenubarSubTrigger>Find</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Search the web</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Find...</MenubarItem>
                                <MenubarItem>Find Next</MenubarItem>
                                <MenubarItem>Find Previous</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSeparator />
                        <MenubarItem>Cut</MenubarItem>
                        <MenubarItem>Copy</MenubarItem>
                        <MenubarItem>Paste</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                    <MenubarContent>
                        <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
                        <MenubarCheckboxItem checked>
                            Always Show Full URLs
                        </MenubarCheckboxItem>
                        <MenubarSeparator />
                        <MenubarItem inset>
                            Reload <MenubarShortcut>⌘R</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem disabled inset>
                            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem inset>Hide Sidebar</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Profiles</MenubarTrigger>
                    <MenubarContent>
                        <MenubarRadioGroup value="benoit">
                            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                        </MenubarRadioGroup>
                        <MenubarSeparator />
                        <MenubarItem inset>Edit...</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem inset>Add Profile...</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}

type EditMode = 'jupyter-to-py' | 'py-to-jupyter' | 'none'
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
            setEditMode('jupyter-to-py')
        }

        setFromContents(e.target.value)
    }
    const toContents: string | null = useMemo(() => {
        setError(undefined)
        try {
            if (editMode === 'jupyter-to-py') {
                return convertIpynbJsonToPythonFile(JSON.parse(fromContents))
            } else if (editMode === 'py-to-jupyter') {
                return JSON.stringify(pythonToJupyter(fromContents), null, 2)
            }
        } catch (error) {
            const errorStr = JSON.stringify(error)
            if (error && error !== '' && errorStr !== '{ }' && errorStr !== '[]' && errorStr !== '""' && errorStr !== 'null' && errorStr !== 'undefined' && !errorStr.includes('SyntaxError')) {
                setError(JSON.stringify(error))
            }
        }
        return null
    }, [editMode, fromContents])

    const showSecondEditor = useMemo(() => {
        return editMode !== 'none' && toContents !== null && toContents !== ''
    }, [editMode, toContents])

    console.log(showSecondEditor)

    return (
        <section
            className={cn(
                "overflow-hidden min-h-[calc(100vh-4rem)] flex items-center flex-col",
                showSecondEditor ? 'p-5 gap-4' : 'container gap-6 pb-8 pt-6 md:py-10',
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
                    toContents={toContents || ''}
                />
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
                        <Textarea
                            readOnly
                            value={toContents || ''}
                            className={cn("h-full resize-none", showSecondEditor ? 'opacity-100' : 'opacity-0')}
                            placeholder="Drag and drop or Paste in the contents of a .ipynb or .py file here"
                            onChange={handleFromContentsChange}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}