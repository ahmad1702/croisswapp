/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Textarea } from "@/components/ui/text-area";
import { cn } from "@/utils/cn";
import { jupyterToPython } from "@/utils/jupyter";

type JupyterToPythonProps = {
  ipynbJson: string;
};

const JupyterToPython = ({ ipynbJson, ...props }: JupyterToPythonProps) => {
  let contents: string | null = null;

  try {
    const parsedPython = jupyterToPython(ipynbJson);
    if (parsedPython) {
      contents = parsedPython;
    }
  } catch (error) { }
  return (
    <Textarea
      readOnly
      value={contents === null ? "Nothing... Nada... No tengo" : contents}
      className={cn("h-full resize-none")}
      placeholder="Drag and drop or Paste in the contents of a .ipynb or .py file here"
    />
  );
};

export default JupyterToPython;

export interface Cell {
  cell_type: string;
  metadata: Record<string, any>;
  source: string[];
}

export interface Notebook {
  cells: Cell[];
  metadata: Record<string, any>;
  nbformat: number;
  nbformat_minor: number;
}
