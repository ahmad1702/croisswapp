/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Textarea } from '@/components/ui/text-area'
import { cn } from '@/utils/cn'

type PythonFromJupyterProps = {
    ipynbJson: string
}

const PythonFromJupyter = ({ ipynbJson, ...props }: PythonFromJupyterProps) => {
    let contents: string | null = null
    try {
        const parsedPython = convertNotebookToPython(ipynbJson)
        if (parsedPython) {
            contents = parsedPython
        }
    } catch (error) {
    }
    return (
        <Textarea
            readOnly
            value={contents === null ? 'Nothing... Nada... No tengo' : contents}
            className={cn("h-full resize-none")}
            placeholder="Drag and drop or Paste in the contents of a .ipynb or .py file here"
        />
    )
}

export default PythonFromJupyter

interface Cell {
    cell_type: string;
    metadata: Record<string, any>;
    source: string[];
}

interface Notebook {
    cells: Cell[];
    metadata: Record<string, any>;
    nbformat: number;
    nbformat_minor: number;
}

function convertNotebookToPython(jsonStr: string): string | null {
    const notebook: Notebook = JSON.parse(jsonStr);

    const pythonCode: string[] = [];

    for (const cell of notebook.cells) {
        if (cell.cell_type === 'code') {
            const sourceCode = cell.source.join('');
            pythonCode.push(sourceCode);
            pythonCode.push('');
        } else if (cell.cell_type === 'markdown') {
            const markdown = cell.source.join('\n');
            pythonCode.push(`'''\n${markdown}\n'''`);
            pythonCode.push('');
        }
    }

    const pythonFileContent = pythonCode.join('\n');
    return pythonFileContent || null
}
