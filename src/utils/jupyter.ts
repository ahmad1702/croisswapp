/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Cell, Notebook } from "@/types/jupyter";

function isFunctionDeclaration(line: string): boolean {
  return /^\s*(async\s+)?(function\s+\w+\(|\w+\s*=\s*(async\s+)?function\(|\()/.test(
    line
  );
}
const DEFAULT_METADATA: Notebook["metadata"] = {
  kernelspec: undefined,
  language_info: undefined,
  orig_nbformat: undefined,
  title: undefined,
  authors: undefined,
};

const currCell: Cell = {
  cell_type: "code",
  metadata: {},
  source: [],
  outputs: [],
  execution_count: null,
};

export default function pythonToJupyter(
  pythonFileContents: string,
  metadata: Notebook["metadata"] = DEFAULT_METADATA
): Notebook {
  const cells: Cell[] = [];

  const lines: string[] = pythonFileContents.split("\n");
  let accumLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nextLine = lines[i + 1];
    if (line === undefined) continue; // skip empty lines (shouldn't happen)

    //  comment line, add to current cell
    accumLines.push(line + "\n");

    const nextNextLine = lines[i + 2];
    const nextNextLineIsComment =
      nextNextLine !== undefined ? nextNextLine.trim().startsWith("#") : false;
    if (
      (nextLine !== undefined &&
        nextNextLine !== undefined &&
        nextLine.length === 0 &&
        (nextNextLine.length === 0 || nextNextLineIsComment)) ||
      i === lines.length - 1
    ) {
      cells.push({
        ...currCell,
        source: accumLines,
      });
      accumLines = [];
      if (nextNextLineIsComment) {
        i++;
      }
    }
  }

  const notebook: Notebook = {
    metadata,
    nbformat_minor: 0,
    nbformat: 4,
    cells: cells,
  };

  return notebook;
}
// export default function pythonToJupyter(pythonFileContents: string): Notebook {
//   const cells: Cell[] = [];
//   const lines: string[] = pythonFileContents.split('\n');

//   let currentCell: CodeCell = {
//     cell_type: 'code',
//     metadata: {},
//     source: [],
//     outputs: [],
//     execution_count: null
//   };

//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i];
//     const nextLine = lines[i + 1]
//     if (line === undefined) continue; // skip empty lines (shouldn't happen

//     if (line.trim().startsWith('#')) {
//       // comment line, add to current cell
//       if (typeof currentCell.source === 'string') {
//         currentCell.source += '\n' + line;
//       } else {
//         currentCell.source.push(line);
//       }
//     } else if (line.trim() === '' && i < lines.length - 1 && nextLine && nextLine.trim() === '') {
//       // empty line followed by another empty line, split cell
//       cells.push(currentCell);
//       currentCell = {
//         cell_type: 'code',
//         metadata: {},
//         source: [],
//         outputs: [],
//         execution_count: null
//       };
//     } else if (isFunctionDeclaration(line)) {
//       // function declaration, split cell
//       cells.push(currentCell);
//       currentCell = {
//         cell_type: 'code',
//         metadata: {},
//         source: [line],
//         outputs: [],
//         execution_count: null
//       };

//       // find the end of the function
//       let braceCount = 1;
//       while (braceCount > 0 && i < lines.length - 1) {
//         i++;
//         const currLine = lines[i];
//         if (currLine === undefined) continue; // skip empty lines (shouldn't happen
//         if (typeof currentCell.source === 'string') {
//           currentCell.source += '\n' + currLine;
//         } else {
//           currentCell.source.push(currLine);
//         }

//         braceCount += (currLine.match(/\(/g) || []).length;
//         braceCount -= (currLine.match(/\)/g) || []).length;
//       }
//     } else {
//       // regular line, add to current cell
//         if (typeof currentCell.source === 'string') {
//           currentCell.source += '\n' + line;
//         } else {
//           currentCell.source.push(line);
//         }
//     }
//   }

//   // add final cell
//   cells.push(currentCell);

//   return {
//     cells,
//     metadata: {},
//     nbformat: 4,
//     nbformat_minor: 2,
//   };
// }

export function jupyterToPython(jsonStr: string): string | null {
  const notebook = JSON.parse(jsonStr) as unknown as Notebook;

  const pythonCode: string[] = [];

  for (const cell of notebook.cells) {
    if (cell.cell_type === "code") {
      if (typeof cell.source === "string") {
        pythonCode.push(cell.source);
      } else {
        pythonCode.push(cell.source.join("\n"));
      }
      pythonCode.push("");
    } else if (cell.cell_type === "markdown") {
      let markdown: string;
      if (typeof cell.source === "string") {
        markdown = cell.source;
      } else {
        markdown = cell.source.join("\n");
      }
      pythonCode.push(`'''\n${markdown}\n'''`);
      pythonCode.push("");
    }
  }

  const pythonFileContent = pythonCode.join("\n");
  return pythonFileContent || null;
}
