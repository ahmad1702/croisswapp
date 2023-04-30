"use client";

import pythonToJupyter from "@/utils/jupyter";
import {
  IpynbRenderer,
  type Props as IpynbRendererProps
} from "react-ipynb-renderer";
// Jupyter theme
// import "react-ipynb-renderer/dist/styles/oceans16.css";
import "@/styles/jupyter-notebook.css";
import { useMemo } from "react";

type Notebook = IpynbRendererProps["ipynb"];

type JupyterNotebookViewerProps = {
  pythonCode: string;
};
const PythonToJupyter = ({
  pythonCode,
  ...props
}: JupyterNotebookViewerProps) => {
  const notebook: Notebook = useMemo(() => pythonToJupyter(pythonCode) as unknown as Notebook, [pythonCode]);
  return (
    <div className="h-full w-full relative rounded-xl overflow-hidden">
      <div className="ipynb-viewer absolute left-0 right-0 h-full w-full overflow-auto">
        <IpynbRenderer ipynb={notebook} />
      </div>
    </div>
  )
};

export default PythonToJupyter;
