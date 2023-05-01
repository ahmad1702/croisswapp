"use client";

import {
  IpynbRenderer,
  type Props as IpynbRendererProps
} from "react-ipynb-renderer";
// Jupyter theme
// import "react-ipynb-renderer/dist/styles/oceans16.css";
import "@/styles/jupyter-notebook.css";
import { Notebook } from "@/types/jupyter";

type NotebookWierd = IpynbRendererProps["ipynb"];

type JupyterNotebookViewerProps = {
  // pythonCode: string;
  value: Notebook;
  // onChange: (value: string | null) => void;
};
const PythonToJupyter = ({
  value,
  ...props
}: JupyterNotebookViewerProps) => {
  // const notebook: Notebook = useMemo(() => {
  //   const res = pythonToJupyter(pythonCode) as unknown as Notebook
  //   onChange(JSON.stringify(res, null, 2))
  //   return res
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pythonCode]);
  return (
    <div className="h-full w-full relative rounded-xl overflow-hidden">
      <div className="ipynb-viewer absolute left-0 right-0 h-full w-full overflow-auto">
        <IpynbRenderer ipynb={value as unknown as NotebookWierd} />
      </div>
    </div>
  )
};

export default PythonToJupyter;
