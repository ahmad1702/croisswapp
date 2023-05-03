"use client";

import {
  type Props as IpynbRendererProps
} from "react-ipynb-renderer";
// Jupyter theme
// import "react-ipynb-renderer/dist/styles/oceans16.css";
import "@/styles/jupyter-notebook.css";
import { Notebook } from "@/types/jupyter";
import dynamic from "next/dynamic";

type NotebookWierd = IpynbRendererProps["ipynb"];

const IpynbRenderer = dynamic(() => import('react-ipynb-renderer').then((m) => m.IpynbRenderer), { ssr: false })

type JupyterNotebookViewerProps = {
  value: Notebook;
};
const PythonToJupyter = ({
  value,
}: JupyterNotebookViewerProps) => {
  return (
    <div className="h-full w-full relative rounded-xl overflow-hidden">
      <div className="ipynb-viewer absolute left-0 right-0 h-full w-full overflow-auto">
        <IpynbRenderer ipynb={value as unknown as NotebookWierd} />
      </div>
    </div>
  )
};

export default PythonToJupyter;
