/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import duoToneSea from "@/styles/markdown-styles/duoToneSea";
import duoToneSeaLight from "@/styles/markdown-styles/duoToneSeaLight";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Card } from "../ui/card";

type JupyterToPythonProps = {
  value: string | null;
};

const JupyterToPython = ({ value }: JupyterToPythonProps) => {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"
  const content: string | null = value === null ? null : "```python\n" + value + "\n```"
  return (
    <div className="h-full w-full relative rounded-lg overflow-hidden">
      <Card className="absolute left-0 right-0 h-full w-full overflow-auto">
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) {
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
          {content === null ? "Nothing... Nada... No tengo" : content}
        </ReactMarkdown>
      </Card>
    </div>
  )
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
