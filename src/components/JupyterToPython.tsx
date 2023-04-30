/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import duoToneSea from "@/styles/markdown-styles/duoToneSea";
import duoToneSeaLight from "@/styles/markdown-styles/duoToneSeaLight";
import { jupyterToPython } from "@/utils/jupyter";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Card } from "./ui/card";

type JupyterToPythonProps = {
  ipynbJson: string;
};

const JupyterToPython = ({ ipynbJson, ...props }: JupyterToPythonProps) => {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  const contents = useMemo(() => {
    try {
      const parsedPython = jupyterToPython(ipynbJson);
      if (parsedPython) {
        return '```python\n' + parsedPython + '\n```';
      }
    } catch (error) {
      console.error(error)
    }
    return null
  }, [ipynbJson])

  // console.log(contents)
  console.log(isDarkMode)
  return (
    <Card className="">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                style={isDarkMode ? duoToneSea : duoToneSeaLight}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            )
          }
        }}
      >
        {/* hi */}
        {contents === null ? "Nothing... Nada... No tengo" : contents}
      </ReactMarkdown>
    </Card>
  )
  // return (
  //   <Textarea
  //     readOnly
  //     value={contents === null ? "Nothing... Nada... No tengo" : contents}
  //     className={cn("h-full resize-none")}
  //     placeholder="Drag and drop or Paste in the contents of a .ipynb or .py file here"
  //   />
  // );
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
