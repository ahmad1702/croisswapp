'use client'

import { IpynbRenderer, Props as IpynbRendererProps } from 'react-ipynb-renderer'

type Notebook = IpynbRendererProps['ipynb']
type JupyterNotebookViewerProps = {
    pythonCode: string
}
const JupyterNotebookViewer = ({ pythonCode, ...props }: JupyterNotebookViewerProps) => {
    let content = null

    try {
        const parsedContent = JSON.parse(pythonCode)
        if (parsedContent) {
            content = parsedContent
        }
    } catch (e) {
        console.error(e)
    }


    if (!content) return <></>
    return (
        <IpynbRenderer ipynb={content} />
    )
}

export default JupyterNotebookViewer