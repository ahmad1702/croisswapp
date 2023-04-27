interface Cell {
    cell_type: 'code' | 'markdown';
    metadata: Record<string, unknown>;
    source: string[];
}

interface Notebook {
    cells: Cell[];
    metadata: Record<string, unknown>;
    nbformat: number;
    nbformat_minor: number;
}

function isFunctionDeclaration(line: string): boolean {
    return /^\s*(async\s+)?(function\s+\w+\(|\w+\s*=\s*(async\s+)?function\(|\()/.test(line);
}

export default function pythonToJupyter(pythonFileContents: string): Notebook {
    const cells: Cell[] = [];
    const lines = pythonFileContents.split('\n');

    let currentCell: Cell = {
        cell_type: 'code',
        metadata: {},
        source: [],
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]!;

        if (line.trim().startsWith('#')) {
            // comment line, add to current cell
            currentCell.source.push(line);
        } else if (line.trim() === '' && i < lines.length - 1 && lines[i + 1]!.trim() === '') {
            // empty line followed by another empty line, split cell
            cells.push(currentCell);
            currentCell = {
                cell_type: 'code',
                metadata: {},
                source: [],
            };
        } else if (isFunctionDeclaration(line)) {
            // function declaration, split cell
            cells.push(currentCell);
            currentCell = {
                cell_type: 'code',
                metadata: {},
                source: [line],
            };

            // find the end of the function
            let braceCount = 1;
            while (braceCount > 0 && i < lines.length - 1) {
                i++;
                const nextLine = lines[i]!;
                currentCell.source.push(nextLine);
                braceCount += (nextLine.match(/\(/g) || []).length;
                braceCount -= (nextLine.match(/\)/g) || []).length;
            }
        } else {
            // regular line, add to current cell
            currentCell.source.push(line);
        }
    }

    // add final cell
    cells.push(currentCell);

    return {
        cells,
        metadata: {},
        nbformat: 4,
        nbformat_minor: 2,
    };
}