"use client";

import pythonToJupyter from "@/utils/jupyter";
import {
  IpynbRenderer,
  type Props as IpynbRendererProps,
} from "react-ipynb-renderer";
// Jupyter theme
// import "react-ipynb-renderer/dist/styles/oceans16.css";
import "@/styles/jupyter-notebook.css";

type Notebook = IpynbRendererProps["ipynb"];

type JupyterNotebookViewerProps = {
  pythonCode: string;
};
const PythonToJupyter = ({
  pythonCode,
  ...props
}: JupyterNotebookViewerProps) => {
  const notebook = pythonToJupyter(pythonCode) as unknown as Notebook

  // useEffect(() => {
  //   console.log(pythonCode)
  //   console.log(notebook)
  // }, [pythonCode])

  return <IpynbRenderer ipynb={notebook} />;
};

export default PythonToJupyter;
